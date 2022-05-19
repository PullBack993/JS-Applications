import { showHomePage } from "./views/home.js";
import { showCatalogPage } from "./views/catalog.js";
import { showLoginPage } from "./views/login.js";
import { showRegisterPage } from "./views/register.js";
import { showCreatePage } from "./views/create.js";
import { showDetailsPage } from "./views/details.js";
import { showSection } from "./views/dom.js";
import { logout } from "./api/data.js";
// ????
const links = {
  homeLink: "home",
  getStartedLink: "home",
  catalogLink: "catalog",
  loginLink: "login",
  registerLink: "register",
  createLink: "create",
};

const views = {
  home: showHomePage,
  catalog: showCatalogPage,
  login: showLoginPage,
  register: showRegisterPage,
  create: showCreatePage,
  details: showDetailsPage,
};

const nav = document.querySelector("nav");
nav.addEventListener("click", onNavigate);

document.getElementById("logoutBtn").addEventListener("click", async (event) => {
  event.preventDefault();
  await logout();
  updateNav();
  goTo("home");
});

const ctx = {
  // attention
  goTo,
  showSection,
  updateNav,
};

//Start application in home view
updateNav();
goTo("home");

function onNavigate(event) {
  const name = links[event.target.id]; // finde name from links
  if (name) {
    event.preventDefault();
    goTo(name);
  }
}

function goTo(name, ...params) {
  const view = views[name];
  if (typeof view == "function") {
    view(ctx, ...params);
  }
}

function updateNav() {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  if (userData != null) {
    [...nav.querySelectorAll(".user")].forEach(
      (link) => (link.style.display = "block")
    );
    [...nav.querySelectorAll(".guest")].forEach(
      (link) => (link.style.display = "none")
    );
  } else {
    [...nav.querySelectorAll(".guest")].forEach(
      (link) => (link.style.display = "block")
    );
    [...nav.querySelectorAll(".user")].forEach(
      (link) => (link.style.display = "none")
    );
  }
}
