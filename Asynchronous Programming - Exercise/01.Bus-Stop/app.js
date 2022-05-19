async function getInfo() {
  const stopId = document.getElementById("stopId").value;
  const buses = document.getElementById("buses");
  const stopName = document.getElementById("stopName");
  try {
    const response = await fetch(
      `http://localhost:3030/jsonstore/bus/businfo/${stopId}`
    );
    if (response.ok == false) throw new Error();
    const data = await response.json();

    buses.replaceChildren();

    for (let repo of Object.entries(data.buses)) {
      let liElement = document.createElement("li");
      liElement.textContent = `Bus ${repo[0]} arrives in ${repo[1]} minutes`;
      buses.appendChild(liElement);
      stopName.textContent = data.name;
    }
  } catch (error) {
    buses.replaceChildren();

    stopName.textContent = "Error";
  }
}
