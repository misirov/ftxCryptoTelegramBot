require('dotenv').config();
const { arrayify } = require('ethers/lib/utils');
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TG_TOKEN;

const bot = new TelegramBot(token, {polling:true});

bot.on('message', (msg) => {

    var array = []

    if(msg.text.toString().toLowerCase() == '/help'){
        let help_message = `
        -> FTX Order Execution
    Send a message with the following 5 parameters followed by a comma to execute an order using the FTX API:
        1) symbol     ex: BTC-PER
        2) type       ex: limit or market 
        3) side       ex: buy or sell
        4) amount     ex: 0.0003 ($10 -> 0.0003BTC)
        x) price      ex: ignored in market orders
        6) reduceOnly ex: true or false

        Ex: BTC-PERP,market,buy,0.0003,false
        `
        bot.sendMessage(msg.chat.id, help_message)
    }


    if(msg.text.includes('/limit')){
        order_type = 'limit'
    } 
    else if(msg.text.includes('/market')){
        order_type = 'market'
    } 
    array.push(order_type)

    if(msg.text.includes('/buy')){
        order_side = 'buy'
    }
    else if(msg.text.includes('/sell')){
        order_side = 'sell'
    }
    array.push(order_side)

    
    for(i;i<array.length;i++){
        console.log(`INPUT: ${array[i]}`)
    }



    // if((msg.text.includes('limit') || msg.text.includes('market')) && (msg.text.includes('buy') || msg.text.includes('sell')) && (msg.text.includes('true') || msg.text.includes('false'))){
        
    // }
  

})