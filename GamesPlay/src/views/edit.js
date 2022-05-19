import { html } from '../lib.js';
import { editGame,getById } from '../api/data.js';

const editTemplate = (data) => html`
  <section id="create-page" class="auth">
    <form @submit=${onSubmit} id="create">
        <div class="container">

            <h1>Create Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title"  placeholder="Enter game title" .value="${data.title}">

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" placeholder="Enter game category..." .value="${data.category}">

            <label for="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1" .value="${data.maxLevel}">

            <label for="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo..." .value="${data.imageUrl}">

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary" .value="${data.summary}"></textarea>
            <input class="btn submit" type="submit" value="Create Game">
        </div>
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
    ctx.page.redirect("/details/" + result._id);

}

