import { html, render,until } from "../api/lib.js";
import { getCoinInfo } from "../api/data.js";
import { spiner,URL } from "./common.js";

const coins = ["BTC", "RVN", "ETC", "ZEC", "XMR", "CFX", "ETH", "ERG", "FLUX"];

const header = document.querySelector("#coins-container");
let allCoins = [];


export async function nav() {
  for (const coin in coins) {
    let coinName = coins[coin];
    html`${until(renderTemplate, render(spiner(),header))}`;
    const coinInfo = await getCoinInfo(coinName);
    allCoins.push(coinsTemplate(coinInfo.Data, coinName));
  }
  renderTemplate();
}

const coinsTemplate = (coin, name) => html` 
<div class="container">
    <img class="text-img" src="${URL}${coin[name].CoinInfo.ImageUrl}" />
    <a class="text"> ${coin[name].Price.USD.toFixed(3)}$ </a>
</div>`;

function renderTemplate() {
  render(allCoins, header)
  
}
