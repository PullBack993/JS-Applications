import { html } from '../lib.js';
import { getAll } from '../api/data.js';

const memeTemplate = (content) => html`
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
        ${content.length == 0 ? html`'<p class="no-memes">No memes in database.</p>` :  content.map(allMemsTemplate)}
        </div>
    </div>
</section>`


const allMemsTemplate = (meme) => html`
<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${meme.title}</p>
            <img class="meme-image" alt="meme-img" src="${meme.imageUrl}">
        </div>
        <div id="data-buttons">
            <a class="button" href="/details/${meme._id}">Details</a>
        </div>
    </div>
</div>`

export async function memesPage(ctx) {
    const content = await getAll()
    ctx.render(memeTemplate(content))
    ctx.updateNav()
    
}
