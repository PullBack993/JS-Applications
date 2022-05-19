import { html} from '../lib.js'
import { createMeme } from '../api/data.js'
import { notify } from './notify.js';


const createTemplat = () => html` <section id="create-meme">
            <form @submit=${onCreat} id="create-form">
                <div class="container">
                    <h1>Create Meme</h1>
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title">
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                    <label for="imageUrl">Meme Image</label>
                    <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                    <input type="submit" class="registerbtn button" value="Create Meme">
                </div>
            </form>
        </section>`

let ctx = null
export async function createPage(ctxTarget) {
    ctx = ctxTarget
    ctx.render(createTemplat());
}

async function onCreat(event) {
    event.preventDefault()
    const formData = [...new FormData(event.target).entries()];
    const data = formData.reduce((a, [k, v]) => Object.assign(a, { [k]: v.trim() }), {});
    const missing = formData.filter(([k, v]) => v.trim() == '')


    if (missing.length > 0) {
       return notify('All fields are required');
    };
    await createMeme(data);
    ctx.page.redirect(`/memes`)
}