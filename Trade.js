require('dotenv').config();
var ccxt = require('ccxt');

const ftx = new ccxt.ftx({
    "apiKey": process.env.SUB_ACC_KEY,
    "secret":process.env.SUB_ACC_SECRET,
    "headers": {
        'FTX-SUBACCOUNT': 'bot_test_subaccount'
    }
})

async function executeTransaction(symbol, type, side, amount, price, reduceOnly){
    /**
     * @name: Executing an order.
     * @docs https://docs.ccxt.com/en/latest/manual.html?highlight=fetch%20price#fetchorderbook-examples
     * @docs https://github.com/ccxt/ccxt/blob/master/js/ftx.js#L1596     
     * @param {str} symbol unified symbol of the market to create an order in
     * @param {str} type 'market' or 'limit'
     * @param {str} side 'buy' or 'sell'
     * @param {float} amount how much of currency you want to trade in units of base currency
     * @param {float} price the price at which the order is to be fullfilled, in units of the quote currency, ignored in market orders
     * @param {dict} params extra parameters specific to the ftx api endpoint. @bool `reduceOnly` can only close your positions.
     * @returns {dict} an [order structure]{@link https://docs.ccxt.com/en/latest/manual.html#order-structure}
    */

    

    console.log(`Executing ${type} ${side} order on ${symbol} for of amount:${amount} @${price}`)
    return await ftx.createOrder(symbol, type, side, amount, price, reduceOnly)

}

module.exports = {
    executeTransaction,
}