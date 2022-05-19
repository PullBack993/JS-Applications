const url = "http://localhost:3030/jsonstore/collections/students";
const table = document.getElementById("results");

function solve() {
  document.getElementById("submit").addEventListener("click", createStudent);
  loadStudents();
}

async function createStudent(e) {
  e.preventDefault();
  const value = new FormData(e.target.parentElement);
  const students = [...value.values()];

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.values(students)),
  });
  const data = await res.json();

  loadStudents();
  clearFields([
    ...document.querySelectorAll("#form > div.inputs > input[type=text]"),
  ]);
}

const clearFields = (arr) => arr.forEach((x) => (x.value = ""));

async function loadStudents() {
  results.innerHTML = "";

  const res = await fetch(url);
  const data = await res.json();
  console.log(data);

  Object.values(data).forEach((student) => {
    const tr = document.createElement("tr");

    Object.entries(student).forEach(([key, value]) => {
      const td = document.createElement("td");

      if (key !== "_id") {
        td.innerHTML = value;
        tr.appendChild(td);
      }
    });

    table.appendChild(tr);
  });
}
solve();
