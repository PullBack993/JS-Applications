function solve() {
  let departBtn = document.getElementById("depart");
  let arriveBtn = document.getElementById("arrive");
  let infoBox = document.querySelector("#info > span");
  let stop = {
    next: "depot",
  };

  async function depart() {
    try {
      let url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;
        departBtn.disabled = true;
        arriveBtn.disabled = false;

      const response = await fetch(url);
      if (response.ok == false) throw new Error();

      stop = await response.json();

      infoBox.textContent = `Next stop ${stop.name}`;
    } catch {
      infoBox.textContent = "Error";
      departBtn.disabled = false;
      arriveBtn.disabled = true;
    }
  }

  async function arrive() {
    departBtn.disabled = false;
    arriveBtn.disabled = true;
    infoBox.textContent = `Arriving at ${stop.name}`;
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
