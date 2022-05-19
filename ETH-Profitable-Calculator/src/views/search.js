import { html} from "../api/lib.js";
import {URL} from "./common.js";
import { getSearchedCoin } from "../api/data.js";

const searchTemplate = (data, input, msg) => html`
<section id="searchPage">
<h1>Search by Coin Name</h1>

<div class="search">
    <input id="search-input" type="text" name="search" placeholder="Enter desired coin's name (BTC, ETH, RVN)">
    <button @click=${onSearch} class="search-btn">Search</button>
</div>

<h2 class="search-result">Results:</h2>
<div>
  ${Object.keys(data).length > 0
  ? findTemplate(data) : input.length > 0
    ? html`<p class="no-res">No coin found with name:<span class="search-input">${input}</span>.  Please make sure you are using the correct input form such as (BTC, ETH, RVN etc.)</p>`
    : html`<p class="no-res">${msg}</p>`}
</div>`

const findTemplate = (data) => html` <table class="find-table">
  <tr class="table-container">
    <td>
      <div class="spacing">Name</div>
      <div><img class="search-img" src="${URL}${data.img}" />${data.name}</div>
      <hr />
      <div class="spacing">Algorithm</div>
      <div>${data.algo}</div>
    </td>

    <td>
      <div class="spacing">Current Price</div>
      <div>${data.price.toFixed(2)}</div>
      <hr />
      <div class="spacing">Total Mined Coins</div>
      <div>${data.totalMined}</div>
    </td>

    <td>
      <div class="spacing">Open Price</div>
      <div>${data.open}</div>
      <hr />
      <div class="spacing">Block Number</div>
      <div>${data.blockNum}</div>
    </td>

    <td>
      <div class="spacing">High Day</div>
      <div>${data.high}</div>
      <hr />
      <div class="spacing">Reward/Block</div>
      <div>${data.blockRew}</div>
    </td>

    <td>
      <div class="spacing">Low Day</div>
      <div>${data.low}</div>
      <hr />
      <div class="spacing">Total Volume 24h</div>
      <div>${data.totalVol}</div>
    </td>
  </tr>
</table>`;

let ctx = null;
export function searchPage(ctxTarget) {
  ctx = ctxTarget;
  ctx.render(searchTemplate({}, []));
}


async function onSearch(event) {
  event.preventDefault();
  const data = {}
  const input = document.getElementById("search-input").value;
  if (!input) {
    const message = "Please enter a search!";
    return ctx.render(searchTemplate({}, input, message));
  }
  try {
      const info = await getSearchedCoin(input);
    const content = info.Data.CoinInfo
    const coinData = info.Data.AggregatedData;
    data.name = content.FullName 
    data.img = content.ImageUrl;
    data.algo = content.Algorithm;
    data.totalMined = content.TotalCoinsMined
    data.blockNum = content.BlockNumber;
    data.blockRew = content.BlockReward;
    data.totalVol = content.TotalVolume24H;
    data.price = coinData.PRICE
    data.open = coinData.OPENDAY;
    data.high = coinData.HIGHDAY
    data.low = coinData.LOWDAY
  } catch (err) {
  ctx.render(searchTemplate({}, input));
  }
  ctx.render(searchTemplate(data, input));



}

