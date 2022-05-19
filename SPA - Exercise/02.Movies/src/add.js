import { showView } from "./dom.js";
import {showHome} from "./home.js"
const userData = JSON.parse(sessionStorage.getItem("userData"));

const dataForm = document.querySelector("form");
export const add = document.getElementById("add-movie");
add.remove();

export function showAdd() {
  showView(add);
}

export function addMovie(e) {
    const userData = JSON.parse(sessionStorage.getItem("userData"));

  if (userData == undefined) {
    return alert("Please login");
  }
  showAdd();
}

dataForm.addEventListener("submit", movieAdd);
async function movieAdd(ev) {
    const userData = JSON.parse(sessionStorage.getItem("userData"));

  ev.preventDefault();
  const formData = new FormData(dataForm);

  const title = formData.get("title");
  const description = formData.get("description");
  const img = formData.get("imageUrl");

  if (!title || !description || !img) {
    return alert("Please fill all fields");
  }

  const res = await fetch("http://localhost:3030/data/movies/", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": userData.token,
    },
    body: JSON.stringify({ title, description, img }),
  });
  console.log(res.ok)
  if (res.ok == true){
    showHome()
  }
};
