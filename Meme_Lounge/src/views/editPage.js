import { html,  } from '../lib.js'
import { memeDetails, edinMeme } from '../api/data.js'
import { notify } from './notify.js';


const editTamplat = (currentData) => html`
<section id="edit-meme">
    <form  @submit=${onEdit} id="edit-form">
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" value=${currentData.title} name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description">
                  ${currentData.description}
                </textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" value=${currentData.imageUrl} name="imageUrl">
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>`

let ctx = null
export async function editPage(ctxTarget) {
    ctx = ctxTarget
    const currentId = ctx.params.id
    
    const currentData = await memeDetails(currentId)


    ctx.render(editTamplat(currentData));

}

async function onEdit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)

    const title = formData.get('title')
    const description = formData.get('description')
    const imageUrl = formData.get('imageUrl')

    if (!title || !description || !imageUrl) {
        return notify('All fields are required');
    };
    await edinMeme(ctx.params.id, { title, description, imageUrl });
    ctx.page.redirect(`/details/${ctx.params.id}`)
}