import { html, getUserData } from '../lib.js'
import { getById, deleteById} from '../api/data.js'

const detailsTemplate = (car, owner) => html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src="${car.imageUrl}">
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${car.brand}</li>
            <li><span>Model:</span>${car.model}</li>
            <li><span>Year:</span>${car.year}</li>
            <li><span>Price:</span>${car.price}$</li>
        </ul>

        <p class="description-para">${car.description}</p>

        ${owner
        ? html` <div class="listings-buttons">
            <a href="/edit/${car._id}" class="button-list">Edit</a>
            <a @click=${onDelete} class="button-list">Delete</a>
        </div>`
        : ''}
    </div>
</section>
`

let ctx = null
export async function detailsPage(ctxTarget) {
    ctx = ctxTarget
    const id = ctx.params.id
    const car = await getById(id)
    const userData = getUserData()
    let isOwner = null
    if (userData) {
        isOwner = userData.id == car._ownerId;
    }
    ctx.render(detailsTemplate(car, isOwner))
    
}

async function onDelete() {
        await deleteById(ctx.params.id)
        ctx.page.redirect('/');
}

