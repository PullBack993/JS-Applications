import { html,until,getUserData } from '../src/lib.js'
import { furnitureDetail,deleteById } from '../api/data.js'

const detailsTemplate = (dataPromise) => html`
<div class="container">
<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    ${until(dataPromise, html`<p>L oading...</p>`)}
</div>`

const itemTemplate = (isOwner, onDelete) => html`
<div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src=${item.img} />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${item.make}</span></p>
        <p>Model: <span>${item.model}</span></p>
        <p>Year: <span>${item.year}</span></p>
        <p>Description: <span>${item.description}</span></p>
        <p>Price: <span>${item.price}</span></p>
        <p>Material: <span>${item.material}</span></p>
        ${isOwner ? html `<div>  
            <a href=${`/edit/${item._id}`} class="btn btn-info">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="btn btn-red">Delete</a>
        </div>`: ''}
    </div>
</div>`

let ctx = null
export function detailsPage(ctxTarget) {
    ctx = ctxTarget
    ctx.render(detailsTemplate(loadItem(ctx.params.id)))
}


async function loadItem(id) {
    const item = await furnitureDetail(id)
    const userData = getUserData()
    const isOwner = userData.id == item._ownerId;

    return itemTemplate(item, isOwner,onDelete)
    
    async function onDelete() {
        const choise = confirm('Are you sure you want to delete this item?');
        if (choise) {
            await deleteById(ctx.params.id)
            ctx.page.redirect('/');
        }
    }
}