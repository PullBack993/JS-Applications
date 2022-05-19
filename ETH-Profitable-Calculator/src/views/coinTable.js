import { html, until } from "../api/lib.js";
import { getTopCoins } from "../api/data.js";
import { spiner, URL, iconType } from "./common.js";

const coinsTableTemplate = () => html` <table>
    <tr class="table-container">
      <td class="coin-position">
        <p>ID</p>
      </td>
      <td class="coin-name">
        <div>Name</div>
      </td>
      <td class="coin-price">
        <div>Price</div>
      </td>
      <td class="24-diff"><span>24h %</span></td>
      <td class="markcap">
        <p>market cap</p>
      </td>
      <td class="volume">
        <div>volume(24h)</div>
      </td>
      <td class="open-price">
        <div>Open (day)</div>
      </td>
      <td class="high-day-price">
        <div>High (day)</div>
      </td>
      <td class="high-day-price">
        <div>Low (day)</div>
      </td>
    </tr>
  </table>
  ${until(coins(), spiner())}`;

export function coinTablePage(ctx) {
  ctx.render(coinsTableTemplate());
}

async function coins() {
  const coinsTemplate = [];
  let id = 1;

  const coins = await getTopCoins();
  coins.Data.forEach((coin) => {
    const name = coin.CoinInfo.FullName;
    const img = coin.CoinInfo.ImageUrl;
    const price = coin.DISPLAY.USD.PRICE;
    const mrk = coin.DISPLAY.USD.MKTCAP;
    const volumeDay = coin.DISPLAY.USD.VOLUMEDAYTO;
    const openDay = coin.DISPLAY.USD.OPENDAY;
    const highDay = coin.DISPLAY.USD.HIGHDAY;
    const lowDay = coin.DISPLAY.USD.LOWDAY;
    const diff = coin.RAW.USD.PRICE - coin.RAW.USD.OPENDAY;
    const result = (diff / coin.RAW.USD.OPENDAY) * 100;
    const icon = Number(result) > 0 ? iconType(false) : result == 0 ? [] : iconType(true);

    const coinTemplate = html`
    <table class="coin-table">
        <tr class=table-container>
            <td class="coin-position">
                <p>${id++}</p>
            </td>
            <td class="coin-name">
                <div ><img class="text-img" src="${URL}${img}" /> ${name}</div>
            </td>
            <td  class="coin-price">
                <div>${price}</div>
            </td>
            <td  class="24-diff">
                <i class=${icon.length > 0
                    ? icon[0] : undefined} id=${icon.length > 0
                    ? icon[1] : undefined}>
                </i>
                <span id=${icon.length > 0 ? icon[1] : undefined}>
                ${result.toFixed(2)}%</span>
            </td>
            <td class="markcap" >
                <p >${mrk}</p>
            </td>
            <td  class="volume">
                <div>${volumeDay}</div>
            </td>
            <td class="open-price">
                <div >${openDay}</divc>
            </td>
            <td class="high-day-price">
                <div >${highDay}</div>
            </td>
            <td class="high-day-price">
                <div >${lowDay}</div>
            </td>
        </tr>
    </table>`;
    coinsTemplate.push(coinTemplate);
  });
  return coinsTemplate;
}
