require('dotenv').config();
const ccxt = require('ccxt');
const TelegramBot = require('node-telegram-bot-api');
const Data = require("./Data");
const Trade = require("./Trade");






async function main() {
    let bids = 'bids';
    let asks = 'asks';

    let symbol = "BTC-PERP";
    let type = "limit"
    let side = "buy";
    let amount = 0.0003; // -> $10 at 11/06/2022
    let reduceOnly = true // false: open order, true: close order

    price = await Data.getPrice(symbol, bids)
    console.log(`${symbol}: ${price}`)

    tx = await Trade.executeTransaction(symbol, type, side, amount, price, reduceOnly);
    console.log(`Order filled:
    -> market: ${tx.info.market}
    -> side: ${tx.side}
    -> type: ${tx.type}
    -> amount: ${tx.amount}
    -> @price ${tx.price}
    `)

} 

//main()

