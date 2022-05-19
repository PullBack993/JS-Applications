import { html } from '../lib.js';
import { create } from '../api/data.js';

const createTemplate = () => html`
<section id="create-page" class="create">
    <form @submit=${onSubmit} id="create-form" action="" method="">
        <fieldset>
            <legend>Add new Book</legend>
            <p class="field">
                <label for="title">Title</label>
                <span class="input">
                    <input type="text" name="title" id="title" placeholder="Title">
                </span>
            </p>
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <textarea name="description" id="description" placeholder="Description"></textarea>
                </span>
            </p>
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                    <input type="text" name="imageUrl" id="image" placeholder="Image">
                </span>
            </p>
            <p class="field">
                <label for="type">Type</label>
                <span class="input">
                    <select id="type" name="type">
                        <option value="Fiction">Fiction</option>
                        <option value="Romance">Romance</option>
                        <option value="Mistery">Mistery</option>
                        <option value="Classic">Clasic</option>
                        <option value="Other">Other</option>
                    </select>
                </span>
            </p>
            <input class="button submit" type="submit" value="Add Book">
        </fieldset>
    </form>
</section>`

let ctx = null
export async function creatPage(ctxTarget) {
    ctx = ctxTarget
    ctx.render(createTemplate())

}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, { [k]: v.trim() }), {});
    const emptyField = Object.values(data).some(a => a == '');
    if (emptyField) {
        return alert('All fields are required!');

    }
    const result = await create(data);
    event.target.reset()
    ctx.updateNav()
    ctx.page.redirect("/details/" + result._id);

}

