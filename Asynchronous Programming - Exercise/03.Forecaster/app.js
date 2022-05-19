function attachEvents() {
  let inputValue = document.querySelector("#location");
  document
    .getElementById("submit")
    .addEventListener("click", () => getForecast(inputValue.value));
    
}

async function getForecast(locationName) {
  const locationCode = await getLocationCode(locationName);
  document.querySelector("#location").value = ''

  const [current, upcoming] = await Promise.all([
    getCurrentCondition(locationCode),
    getUpcoming(locationCode),
  ]);
  creatCurrentForecaster(current);
  upcomingForecaster(upcoming);
}
function upcomingForecaster(data) {
  const symbols = {
    'Sunny': "☀",
    'Partly sunny': "⛅", 
    'Overcast': "☁", 
    'Rain': "☂", 
    'Degrees': "°", 
  };
  const upcomingArea = document.getElementById("upcoming");
  upcomingArea.replaceChildren();

  const infoDiv = elementCreator("div", "forecast-info");

  upcomingArea.appendChild(infoDiv)

  for (const day of data.forecast) {
    const upcomingSpan = elementCreator("span", "upcoming");
    const symbol = elementCreator("span", "symbol", symbols[day.condition]);
    const spamTemp = elementCreator("span","forecast-data",`${day.low}${symbols["Degrees"]}/${day.high}${symbols["Degrees"]}`);
    const typeOfWeather = elementCreator("span","forecast-data",day.condition);

    upcomingSpan.appendChild(symbol)
    upcomingSpan.appendChild(spamTemp)
    upcomingSpan.appendChild(typeOfWeather)

    upcomingArea.appendChild(upcomingSpan)

  }
}
function creatCurrentForecaster(data) {
  const symbols = {
    'Sunny': "☀",
    'Partly sunny': "⛅", 
    'Overcast': "☁", 
    'Rain': "☂", 
    'Degrees': "°", 
  };
  document.getElementById("forecast").style = "body";
  const currentArea = document.getElementById("current");
  currentArea.replaceChildren();

  const infoDiv = elementCreator("div", "forecasts");
  const spanSymbol = elementCreator(
    "span",
    "condition symbol",
    symbols[data.forecast.condition]
  );
  const spanCondition = elementCreator("span", "condition");
  const spanName = elementCreator("span", "forecast-data", data.name);
  const spanTemp = elementCreator( "span","forecast-data",`${data.forecast.low}${symbols["Degrees"]}/${data.forecast.high}${symbols["Degrees"]}`);
  const condition = elementCreator("span","forecast-data",data.forecast.condition);

  spanCondition.appendChild(spanName);
  spanCondition.appendChild(spanTemp);
  spanCondition.appendChild(condition);

  infoDiv.appendChild(spanSymbol);
  infoDiv.appendChild(spanCondition);
  currentArea.appendChild(infoDiv);
}

function elementCreator(tagName, clsName, content) {
  let name = document.createElement(tagName);
  name.className = clsName;
  if (content) {
    name.textContent = content;
  }

  return name;
}

async function getCurrentCondition(locationCode) {
  const url = `http://localhost:3030/jsonstore/forecaster/today/${locationCode}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

async function getUpcoming(locationCode) {
  const url = `http://localhost:3030/jsonstore/forecaster/upcoming/${locationCode}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

async function getLocationCode(locationName) {
  try {
    const url = `http://localhost:3030/jsonstore/forecaster/locations`;

    const res = await fetch(url);
    if (res.ok == false) throw new Error();

    const data = await res.json();
    let findLocation = data.find(
      (location) => location.name.toLowerCase() === locationName.toLowerCase()
    );

    if (!findLocation) throw new Error();

    return findLocation.code;
  } catch {
    document.getElementById("forecast").style = "body";
    document.querySelector("#current > div").textContent = "Error";
    document.querySelector("#upcoming > div").style.display = "none";
    document.querySelector("#upcoming").replaceChildren()
  }
}

attachEvents();
