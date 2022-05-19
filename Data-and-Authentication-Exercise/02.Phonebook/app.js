function attachEvents() {
  document
    .getElementById("btnCreate")
    .addEventListener("click", addToPhoneBook);
  document.getElementById("btnLoad").addEventListener("click", loadPerson);
  document.getElementById("phonebook").addEventListener("click", deletePerson);
}

const phoneBook = document.getElementById("phonebook");
const url = "http://localhost:3030/jsonstore/phonebook";

attachEvents();

async function addToPhoneBook() {
  const person = document.getElementById("person").value;
  const phone = document.getElementById("phone").value;

  const options = {
    method: "POST",
    headers: {},
    body: JSON.stringify({ person, phone }),
  };
  const res = await fetch(url, options);
  const data = res.json();
  loadPerson();
}

async function loadPerson() {
  phoneBook.replaceChildren();
  const res = await fetch(url);
  const data = await res.json();

  const persons = Object.values(data);

  persons.forEach((p) => {
    const li = document.createElement("li");
    li.innerHTML = `${p.person}: ${p.phone} <button data-id="${p._id}">Delete</button>`;
    phoneBook.appendChild(li);
  });
}
async function deletePerson(e) {
  const id = e.target.dataset.id;

  if (id) {
    const res = await fetch("http://localhost:3030/jsonstore/phonebook/" + id, {
      method: "DELETE",
    });
    e.target.parentElement.remove();
  }
}
