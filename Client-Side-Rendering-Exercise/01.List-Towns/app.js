import { html, render } from '../node_modules/lit-html/lit-html.js';

let root = document.getElementById("root");
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const towns = document
    .getElementById("towns")
    .value.split(",")
    .map((t) => t.trim());

    render(listTemplate(towns),root);

});


const listTemplate = (towns) => html` 
<ul>
  ${towns.map(town => html`<li>${town}</li>`)}
</ul>`;
