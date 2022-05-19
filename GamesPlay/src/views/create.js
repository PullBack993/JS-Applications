import { html } from '../lib.js';
import { createGame } from '../api/data.js';

const createTemplate = () => html`
  <section id="create-page" class="auth">
    <form @submit=${onSubmit} id="create">
        <div class="container">

            <h1>Create Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" placeholder="Enter game title...">

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" placeholder="Enter game category...">

            <label for="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1">

            <label for="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo...">

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary"></textarea>
            <input class="btn submit" type="submit" value="Create Game">
        </div>
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
    const result = await createGame(data);
    event.target.reset()
    ctx.page.redirect("/details/" + result._id);

}

