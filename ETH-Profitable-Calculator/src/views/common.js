import { html } from "../api/lib.js";
export const URL = "https://www.cryptocompare.com";

export function updateNav() {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  if (userData) {
    document.getElementById("user").style.display = "flex";
    document.getElementById("guest").style.display = "none";
  } else {
    document.getElementById("user").style.display = "none";
    document.getElementById("guest").style.display = "flex";
  }
}

export const spiner = () => html` <p class="spiner">Loading ...</p>`;

export const errorMsg = (errors) => {
  if (errors) {
    return html`<div class="error-msg">
      <p class="error-text">${errors}</p>
    </div>`;
  } else {
    return null;
  }
};

export const err = (errors) => {
  if (errors) {
    return "is-invalid";
  } else {
    return "is-valid";
  }
};

export const iconType = (value) => {
  if (value) {
    return ["fas fa-sort-down", "negative"];
  } else {
    return ["fas fa-sort-up", "positive"];
  }
};
