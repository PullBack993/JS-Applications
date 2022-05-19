import { html, getUserData } from '../lib.js'
import { memeDetails, deleteMeme } from '../api/data.js'


const detailsTemplate = (data,owner) => html`
<section id="meme-details">
        <h1>Meme Title: ${data.title}

        </h1>
        <div class="meme-details">
        <div class="meme-img">
                <img alt="meme-alt" src="${data.imageUrl}">
        </div>
        <div class="meme-description">
                <h2>Meme Description</h2>
                <p>
                ${data.description}
                </p>
                ${owner ? html` <a class="button warning" href=${`/edit/${data._id}`}>Edit</a>
                <button @click=${onDelete} class="button danger">Delete</button>` : ''}
        </div>
        </div>
</section>`


let ctx = null
export async function detailsPage(ctxTarget) {
        ctx = ctxTarget
        const userData = getUserData()
        const data = await memeDetails(ctx.params.id)
        const owner = userData && userData.id == data._ownerId
        ctx.render(detailsTemplate(data,owner));
}

async function onDelete(event) {
        deleteMeme(ctx.params.id)
        ctx.page.redirect('/memes')
        
}