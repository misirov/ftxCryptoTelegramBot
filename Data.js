var ccxt = require('ccxt');
require('dotenv').config();

// Instantiate exchange object. Can pass headers with extra information
const ftx = new ccxt.ftx({
    "apiKey": process.env.SUB_ACC_KEY,
    "secret":process.env.SUB_ACC_SECRET,
    "headers": {
        'FTX-SUBACCOUNT': 'bot_test_subaccount'
    }
})



async function getPrice(symbol, quote){
    let orderBook = await ftx.fetchOrderBook(symbol);
    return orderBook[quote][0][0];
}


// Returns the list of markets as an object indexed by symbol and caches it with the exchange instance
async function loadMarkets(){
    return await ftx.loadMarkets();
}


// Fetches a list of all available markets from an exchange and returns 
// an array of markets (objects with properties such as symbol, base, quote etc.).
async function getMarkets(){
    return await ftx.fetchMarkets();
}



/**
 * 
 * @NOTICE These funcitons require authentication 
 *
*/

// Fetch all orders in the account
async function getOrders(){
    return await ftx.fetchOrders()
}

// Fetch all orders in the account
async function getOpenOrders(){
    return await ftx.fetchOpenOrders()
}

    
// Get current account balance
async function getBalance(){
    return await ftx.fetchBalance();
}





module.exports = {
    getPrice,
    getMarkets,
    loadMarkets,
    getOrders,
    getOpenOrders,
    getBalance

}