import * as api from "./api.js";
const KEY = "738d3175c8f1f62d99bafbd7d65b6527a7737303bdb55aaa349a73c62ac734e9";

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    coinInfo: (coin) => `https://min-api.cryptocompare.com/data/blockchain/mining/calculator?fsyms=${coin}&tsyms=USD`,
    coinDifficulty: `https://min-api.cryptocompare.com/data/blockchain/latest?fsym=ETH&api_key=${KEY}`,
    topCoins: "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD",
    fullData: (coin) => `https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=${coin}&tsym=USD`
}

export async function getCoinInfo(coin){
    return api.get(endpoints.coinInfo(coin));
}

export async function getDifficulty() {
    return api.get(endpoints.coinDifficulty);
}


export async function getTopCoins() {
    return api.get(endpoints.topCoins);
}

export async function getSearchedCoin(coin) {
    return api.get(endpoints.fullData(coin));
}