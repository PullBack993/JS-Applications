import { html, until, getUserData } from '../src/lib.js'
import { getAll, myFurniture } from '../api/data.js'

const catalogTemplate = (dataPromise, userPage) => html`
<div class="row space-top">
    <div class="col-md-12">
        ${userPage ? html` <h1>My Furniture</h1>
            <p>This is a list of your publications.</p>`:
        html` <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>`}
    </div>
</div>
<div class="row space-top">
   ${until(dataPromise, html`<p>L oading...</p>`)}
</div>`;

const itemTemplate = (data) => html`
 <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                    <img src=${data.img}/>
                    <p>${data.description}</p>
                    <footer>
                        <p>Price: <span>${data.price} $</span></p>
                    </footer>
                    <div>
                        <a href=${`/details/${data._id}`} class="btn btn-info">Details</a>
                    </div>
            </div>
        </div>
    </div>`

export function catalogPage(ctx){
    const userPage = ctx.pathname == '/my-furniture';
    ctx.render(catalogTemplate(loadItems(userPage), userPage));
    ctx.updateNav()
}

async function loadItems(userPage) {
    let items = [];
    if (userPage) {
        const userData = getUserData()
        items = await myFurniture(userData.id)
    } else {
        items = await getAll()
    }

    return items.map(itemTemplate)
}
