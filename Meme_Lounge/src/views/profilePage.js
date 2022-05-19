import { html, getUserData } from '../lib.js'
import { getUserProfil } from '../api/data.js'

const profilTemplate = (user, data) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/${user.gender}.png">
        <div class="user-content">
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <p>My memes count: ${data.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        ${data.length == 0
        ? html`<p class="no-memes">No memes in database.</p>`
        : data.map(memeCards)}
    </div>
</section>`

const memeCards = (meme) => html`
<div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
    <a class="button" href="/details/${meme._id}">Details</a>
</div>`

let ctx = null
export async function profilePage(ctxTarget) {
    ctx = ctxTarget
    const userData = getUserData()
    const data = await getUserProfil(userData.id)
    ctx.render(profilTemplate(userData, data));
}

// async function onCreat(event) {
//     event.preventDefault()
//     const formData = [...new FormData(event.target).entries()];
//     const data = formData.reduce((a, [k, v]) => Object.assign(a, { [k]: v.trim() }), {});
//     const missing = formData.filter(([k, v]) => v.trim() == '')


//     if (missing.length > 0) {
//         return alert('All fields are required');
//     };
//     await createMeme(data);
//     ctx.page.redirect(`/memes`)
// }