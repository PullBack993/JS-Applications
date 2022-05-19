import { showHome } from "./home.js";
import { showLogin } from "./login.js";
import { addMovie } from "./add.js";
import { showSingUp } from "./register.js";

showHome();

const nav = document.querySelector("#container > nav");
document
  .querySelector("#container > nav > ul > li:nth-child(2) > a")
  .addEventListener("click", logOut);

nav.addEventListener("click", onLoad);
const views = {
  Movies: showHome,
  Login: showLogin,
  Register: showSingUp,
};

function onLoad(event) {
  const view = views[event.target.text];
  if (typeof view == "function") {
    event.preventDefault();
    view();
  }
}

export function updateNav() {
  const currentUser = JSON.parse(sessionStorage.getItem("userData"));
  if (currentUser != null) {
    [...nav.querySelectorAll(".user")].forEach(
      (e) => (e.style.display = "block")
    );
    [...nav.querySelectorAll(".guest")].forEach(
      (e) => (e.style.display = "none")
    );
    document.querySelector(
      "#container > nav > ul > li.nav-item.user > a"
    ).textContent = `Welcome ${currentUser.email}`;
  } else {
    [...nav.querySelectorAll(".user")].forEach(
      (e) => (e.style.display = "none")
    );
    [...nav.querySelectorAll(".guest")].forEach(
      (e) => (e.style.display = "block")
    );
  }
}

updateNav();
async function logOut(event) {
  alert("logout");
  event.preventDefault();
  event.stopImmediatePropagation();

  const { token } = JSON.parse(sessionStorage.getItem("userData"));

  await fetch("http://localhost:3030/users/logout", {
    headers: {
      "X-Authorization": token,
    },
  });
  sessionStorage.removeItem("userData");
  updateNav();
  showLogin();
}

document.querySelector("#add-movie-button > a").addEventListener("click", addMovie);
