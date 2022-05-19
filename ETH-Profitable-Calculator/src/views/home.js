import { html } from "../api/lib.js";
import { getCoinInfo, getDifficulty } from "../api/data.js";

const homePageTemplate = (result, totalPowerCoast, fee) => html`
 <h1 class="name-calculator">
    Ethereum mining calculator and return of investment
  </h1>

  <div id="calc-section">
    <form @submit=${get} id="calculate">
      <div >
        <div class="input-text" for="hashRate">Hashing Power:</div>
        <input class="input" maxlength="9" id="hash" name="hashRate" value=""/>

        <div class="input-text" for="fname">Power consumption (w):</div>
        <input class="input" maxlength="7" id="power" name="power" value="" />

        <div class="input-text" for="fname">Cost per KWh($):</div>
        <input class="input" maxlength="4" id="cost" name="cost" value="0.1" />

        <div class="input-text" for="fname">Pool Fee(%):</div>
        <input class="input" maxlength="4" id="poolFee" name="poolFee" value="1"/>

        <div class="input-text">Mining hardware($):</div>
        <input class="input" maxlength="4" name="roi" value="" />
      </div>
      <button type="submit" id="calc-btn">Calculate</button>
      
    </form>
    <div class="append-calc">
      ${profitabilityTemplate(result, totalPowerCoast, fee)}
    </div>
  </div>`;

const profitabilityTemplate = (reward, totalPowerCoast, fee) => html` 
<div class="profitability-container">
  <div>

    <div class="daily">
      <div class="day" id=${resultColorReward(reward)}>
        <div>Reward/Day:</div>
        <div class="profit">${reward > 0 ? reward : "0"}$</div>
      </div>

      <i class="minus"> &#x2212</i>

      <div class="power-day" id=${powerFeeCkecker(totalPowerCoast)}>
        <div>Power cost/Day:</div>
        <div class="power-cost"> ${
          totalPowerCoast > 0 ? totalPowerCoast : "0"
        }$ </div>
      </div>

      <i class="minus"> &#x2212</i>

      <div class="fee" id=${powerFeeCkecker(fee)}>
        <div>Fee/Day:</div>
        <div class="fee-cost">${fee > 0 ? fee : "0"}$</div>
      </div>

      <i class="equal">&#8773;</i>

      <div class="net-profit-day" id=${resultColor(
        reward,
        totalPowerCoast,
        fee
      )}>
        <div>Net Profit/Day:</div>
        <div class="net-profit"> ${
          reward ? (reward - totalPowerCoast - fee).toFixed(2) : "0"
        }$</div>
      </div>
    </div>
  </div>

  <div>
    <div class="weekly">
      <div class="week" id=${resultColorReward(reward)}>
        <div>Reward/Week:</div>
        <div class="profit">${reward > 0 ? (reward * 7).toFixed(2) : "0"}$</div>
      </div>

      <i class="minus">&#x2212</i>

      <div class="power-week" id=${powerFeeCkecker(totalPowerCoast)}>
        <div>Power const/Week:</div>
        <div class="power-cost">
          ${totalPowerCoast > 0 ? (totalPowerCoast * 7).toFixed(2) : "0"}$
        </div>
      </div>

      <i class="minus">&#x2212</i>

      <div class="fee" id=${powerFeeCkecker(fee)}>
        <div>Fee/Day:</div>
        <div class="fee-cost">${fee > 0 ? (fee * 7).toFixed(2) : "0"}$</div>
      </div>

      <i class="equal">&#8773;</i>

      <div
        class="net-profit-week"
        id=${resultColor(reward * 7, totalPowerCoast * 7, fee * 7)}>
        <div>Net Profit/Week:</div>
        <div class="net-profit">
          ${
            reward
              ? (reward * 7 - totalPowerCoast * 7 - fee * 7).toFixed(2)
              : "0"
          }$
        </div>
      </div>
    </div>
  </div>

  <div>
    <div class="monthly">
      <div class="month" id=${resultColorReward(reward)}>
        <div>Reward/Month:</div>
        <div class="profit">
          ${reward > 0 ? (reward * 30).toFixed(2) : "0"}$
        </div>
      </div>

      <i class="minus">&#x2212</i>

      <div class="power-month" id=${powerFeeCkecker(totalPowerCoast)}>
        <div>Power const/Month:</div>
        <div class="power-cost">
          ${totalPowerCoast > 0 ? (totalPowerCoast * 30).toFixed(2) : "0"}$
        </div>
      </div>

      <i class="minus"> &#x2212</i>

      <div class="fee" id=${powerFeeCkecker(fee)}>
        <div>Fee/Month:</div>
        <div class="fee-cost">${fee > 0 ? (fee * 30).toFixed(2) : "0"}$</div>
      </div>

      <i class="equal">&#8773;</i>

      <div
        class="net-profit-week"
        id=${resultColor(reward * 30, totalPowerCoast * 30, fee * 30)}>
        <div>Net Profit/Month:</div>
        <div class="net-profit">
          ${
            reward
              ? (reward * 30 - totalPowerCoast * 30 - fee * 30).toFixed(2)
              : "0"
          }$
        </div>
      </div>
    </div>
  </div>
</div>`;

const returnTime = (hardwCost, netReward, type, oprt) => html` <table class="rtp">
  <tr>
    <td class="positive">
      <div class="price">Current Price:</div>
      <div class="days">
        ${Math.round(hardwCost / netReward).toFixed(0)}Days
      </div>
    </td>

    <td class="positive" id=${type}>
      <div class="price">${oprt == "+" ? "+5%" : "-5%"}</div>
      <div class="days">
        ${oprt == "+"
          ? Math.round(hardwCost / (netReward * 0.05 + netReward)).toFixed(0)
          : Math.abs(Math.round(hardwCost / (netReward * 0.05 - netReward)).toFixed(0))}Days
      </div>
    </td>

    <td class="positive"  id=${type}>
      <div class="price">${oprt == "+" ? "+10%" : "-10%"}</div>
      <div class="days">
       ${oprt == "+"
          ? Math.round(hardwCost / (netReward * 0.1 + netReward)).toFixed(0)
          : Math.abs(Math.round(hardwCost / (netReward * 0.1 - netReward)).toFixed(0))}Days
      </div>
    </td>
    <td class="positive" id=${type}>
      <div class="price">${oprt == "+" ? "+15%" : "-15%"}</div>
      <div class="days">
        ${oprt == "+"
          ? Math.round(hardwCost / (netReward * 0.15 + netReward)).toFixed(0)
          : Math.abs(Math.round(hardwCost / (netReward * 0.15 - netReward)).toFixed(0))}Days
      </div>
    </td>

    <td class="positive" id=${type}>
      <div class="price">${oprt == "+" ? "+20%" : "-20%"}</div>
      <div class="days">
        ${oprt == "+"
          ? Math.round(hardwCost / (netReward * 0.2 + netReward)).toFixed(0)
          : Math.abs(Math.round(hardwCost / (netReward * 0.2 - netReward)).toFixed(0))}Days
      </div>
    </td>

    <td class="positive" id=${type}>
      <div class="price">${oprt == "+" ? "+30%" : "-30%"}</div>
      <div class="days">
       ${oprt == "+"
          ? Math.round(hardwCost / (netReward * 0.3 + netReward)).toFixed(0)
          : Math.abs(Math.round(hardwCost / (netReward * 0.3 - netReward)).toFixed(0))}Days
      </div>
    </td>

    <td class="positive"  id=${type}>
      <div class="price">${oprt == "+" ? "+40%" : "-40%"}</div>
      <div class="days">
        ${oprt == "+"
          ? Math.round(hardwCost / (netReward * 0.4 + netReward)).toFixed(0)
          : Math.abs(Math.round(hardwCost / (netReward * 0.4 - netReward)).toFixed(0))}Days
      </div>
    </td>

    <td class="positive"  id=${type}>
      <div class="price">${oprt == "+" ? "+50%" : "-50%"}</div>
      <div class="days">
         ${oprt == "+"
          ? Math.round(hardwCost / (netReward * 0.5 + netReward)).toFixed(0)
          : Math.abs(Math.round(hardwCost / (netReward * 0.5 - netReward)).toFixed(0))}Days
      </div>
    </td>

    <td class="positive"  id=${type}>
      <div class="price">${oprt == "+" ? "+60%" : "-60%"}</div>
      <div class="days">
         ${oprt == "+"
          ? Math.round(hardwCost / (netReward * 0.6 + netReward)).toFixed(0)
          : Math.abs(Math.round(hardwCost / (netReward * 0.6 - netReward)).toFixed(0))}Days
      </div>
    </td>
  </tr>
</table>`;


let ctx = null
export async function homePage(ctxTarget) {
  ctx = ctxTarget
  ctx.render(homePageTemplate());
}


async function get(event) {
  event.preventDefault();
  const hashRate = Number(event.target.hash.value);
  const power = Number(event.target.power.value);
  const cost = Number(event.target.cost.value);
  const poolFee = Number(event.target.poolFee.value);
  const hardwCost = Number(event.target.roi.value)

  const [coinInfo, difficulty] = await Promise.all([
    getCoinInfo("ETH"),
    getDifficulty(),
  ]);

  const data = coinInfo.Data.ETH.CoinInfo;
  const blockReward = Number(data.BlockReward);
  const price = Number(coinInfo.Data.ETH.Price.USD);
  const difi = (difficulty.Data.difficulty / 1000000000000000) * 10 ** 10;
  const reward = (((hashRate * blockReward * 86400 * 10) / difi) * price ).toFixed(2);
  const totalPowerCoast = ((power / 1000) * cost * 24).toFixed(2);
  const fee = ((reward * poolFee) / 100).toFixed(2);
  const netReward = reward - totalPowerCoast - fee
  const all = [homePageTemplate(reward, totalPowerCoast, fee),];

  if (hardwCost) {
    all.push(
      returnTime(hardwCost, netReward, "positive-value", "+"),
      returnTime(hardwCost, netReward, "negative-value", "-")
    );
  }

  ctx.render(all.map(x => x))
}

function resultColor(reward, powCost, feeCost) {
  const result = reward - powCost - feeCost;
  return result > 0 ? "positive-value" : result < 0 ? "negative-value" : "";
}

function resultColorReward(reward) {
  return reward > 0 ? "positive-value" : reward < 0 ? "negative-value" : "";
}

function powerFeeCkecker(value) {
  return value > 0 ? "negative-value" : "";
}


