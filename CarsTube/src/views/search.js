
import { html } from '../lib.js';
import { seacrh } from "../api/data.js"

const searchTemplate = (search) => html`
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
        <button @click=${onSearch}class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">
        ${search
            ? search.map(carTemplate)
            : html`<p class="no-cars"> No results.</p>`}
    </div>
</section>`

const carTemplate = (car) => html`
<div class="listing">
    <div class="preview">
        <img src=${car.imageUrl}>
    </div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${car.year}</h3>
            <h3>Price: ${car.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${car._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>
`
let ctx = null
export function searchPage(ctxTarget) {
    ctx = ctxTarget
    ctx.render(searchTemplate());
    

    
}
async function onSearch(event) {
    event.preventDefault();
    const content = document.getElementById('search-input').value
    const data = await seacrh(content)
    ctx.render(searchTemplate(data));

    }