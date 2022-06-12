require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const ccxt = require('ccxt');
const Data = require("./Data");
const Trade = require("./Trade");

const token = process.env.TG_TOKEN;
const bot = new TelegramBot(token, {polling:true});

order = {
    symbol: "",
    type: "",
    side: "",
    amount: "",
    price: "",
    reduce: ""

}

console.log('Starting bot...')

bot.onText(/\/symbol (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    const chatId = msg.chat.id;
    const symbol = match[1]; // captured user input 
    order.symbol = symbol
});


bot.onText(/\/type (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const type = match[1];
    order.type = type;
});


bot.onText(/\/side (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const side = match[1];
    order.side = side;
});


bot.onText(/\/amount (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const amount = match[1];
    order.amount = amount;
});


bot.onText(/\/price (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const price = match[1];
    order.price = price;
});


bot.onText(/\/reduce (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const reduce = match[1];
    order.reduce = reduce;
});




bot.on('message', (msg) => {
    if(msg.text.toString().toLowerCase() == '/help'){
        let help_message = `
        -> FTX Order Execution
    Send a message with the following 5 parameters to execute an order using the FTX API:
        1) symbol     ex: BTC-PERP
        2) type       ex: limit or market 
        3) side       ex: buy or sell
        4) amount     ex: 0.0003 ($10 -> 0.0003BTC)
        x) price      ex: ignored in market orders
        6) reduceOnly ex: true or false

        Ex: BTC-PERP,market,buy,0.0003,false

        --> print
        Use /print to print the current order
        `
        bot.sendMessage(msg.chat.id, help_message)
    }


    if(msg.text.toString().toLowerCase() == '/print'){
        console.log('Printing order...')
        symbol = `symbol: ${order.symbol}`
        type = `type: ${order.type}`
        side = `side: ${order.side}`
        amount = `amount: ${order.amount}`
        price = `price : ${order.price}`
        reduceOnly = `reduceOnly: ${order.reduceOnly}`

        bot.sendMessage(msg.chat.id, `----> Current order <-----`)
        bot.sendMessage(msg.chat.id, symbol)
        bot.sendMessage(msg.chat.id, type)
        bot.sendMessage(msg.chat.id, side)
        bot.sendMessage(msg.chat.id, amount)
        bot.sendMessage(msg.chat.id, price)
        bot.sendMessage(msg.chat.id, reduceOnly)
    }


    if(msg.text.includes('/execute')){
        symbol = order.symbol
        type = order.type
        side = order.side
        amount = order.amount
        price = order.price
        reduceOnly = order.reduceOnly

        bot.sendMessage(msg.chat.id, "Executing order...")
        
        executeOrder(symbol, type, side, amount, price, reduceOnly)    
    }

})



async function executeOrder(symbol, type, side, amount, price, reduceOnly) {
    tx = await Trade.executeTransaction(symbol, type, side, amount, price, reduceOnly);
    console.log(`Order filled:
    -> market: ${tx.info.market}
    -> side: ${tx.side}
    -> type: ${tx.type}
    -> amount: ${tx.amount}
    -> @price ${tx.price}
    `)

} 

