import { html } from '../lib.js';
import { editGame,getById } from '../api/data.js';

const editTemplate = (data) => html`
<section id="edit-page" class="edit">
    <form @submit=${onSubmit} id="edit-form" action="#" method="">
        <fieldset>
            <legend>Edit my Book</legend>
            <p class="field">
                <label for="title">Title</label>
                <span class="input">
                    <input type="text" name="title" id="title" .value=${data.title}>
                </span>
            </p>
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <textarea name="description"
                        id="description">${data.description}</textarea>
                </span>
            </p>
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                    <input type="text" name="imageUrl" id="image" .value=${data.imageUrl}>
                </span>
            </p>
            <p class="field">
                <label for="type">Type</label>
                <span class="input">
                    <select id="type" name="type" .value=${data.type}>
                        <option value="Fiction" selected>Fiction</option>
                        <option value="Romance">Romance</option>
                        <option value="Mistery">Mistery</option>
                        <option value="Classic">Clasic</option>
                        <option value="Other">Other</option>
                    </select>
                </span>
            </p>
            <input class="button submit" type="submit" value="Save">
        </fieldset>
    </form>
</section>`

let ctx = null
export async function editPage(ctxTarget) {
    ctx = ctxTarget
    const id = ctx.params.id
    const data = await getById(id)
    ctx.render(editTemplate(data))

}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, { [k]: v.trim() }), {});
    const emptyField = Object.values(data).some(a => a == '');
    if (emptyField) {
        return alert('All fields are required!');

    }
    const result = await editGame(ctx.params.id, data);
    event.target.reset()
    ctx.updateNav()

    ctx.page.redirect("/details/" + result._id);

}

