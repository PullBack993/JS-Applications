import { page, render, until } from "./api/lib.js";
import { spiner } from "./views/common.js"
import { logout } from "./api/data.js";

import { nav } from "./views/navCoins.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { updateNav } from "./views/common.js";
import { searchPage } from "./views/search.js";
import { registerPage } from "./views/register.js";
import { coinTablePage } from "./views/coinTable.js";

const root = document.querySelector("main");

page(decorateContent);
page("/", homePage);
page("/login", loginPage);
page("/register", registerPage);
page("/logout", onLogout);
page("/coins", coinTablePage);
page("/search", searchPage);
page.start(homePage,nav());
updateNav();

function decorateContent(ctx, next) {
  ctx.render = (content) => render(content, root);
  ctx.updateNav = updateNav;
  next();
}


async function onLogout() {
  render(spiner(), root)
  await logout();

  updateNav();
  page.redirect("/");
}
