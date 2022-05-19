import { html, render } from "../node_modules/lit-html/lit-html.js";
import { towns as allTown} from "./towns.js";

const town = document.getElementById("towns");
const towns = allTown.map(town => ({name: town, match: false}))
const inputField = document.getElementById("searchText");
const outputField = document.getElementById("result");
document.querySelector("button").addEventListener("click", onSearch);

const listTemplate = (towns) => html` <ul>
  ${towns.map((town) => html`<li class=${town.match ? 'active' : ''}>${town.name}</li>`)}
</ul>`;

function update() {
  render(listTemplate(towns), town);
}
update()

function onSearch(event) {
  const match = inputField.value.trim().toLocaleLowerCase();
   let result = find(towns, match)
  outputField.textContent = `${result} matches found`;
  update()
}

function find(towns,match){
   let counter = 0;
   for(let town of towns){
      if(match && town.name.toLocaleLowerCase().includes(match)){
         town.match = true;
         counter ++;
      }else{
         town.match = false;
      }
   }
   return counter
}