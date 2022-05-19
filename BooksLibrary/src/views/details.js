import { html, getUserData } from '../lib.js';
import { getById, deleteById, addLike, totalLikes, userLikes } from '../api/data.js';

const detailsTemplate = (book,owner,user,likes,ownLike) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <div class="actions">
            ${owner
                ? html` <a href="/edit/${book._id}" class="button">Edit</a>
                <a @click=${onDelete} class="button">Delete</a>`
                : ''}

            <!-- Bonus -->
            <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
            ${!owner && !ownLike && user ? html`<a @click=${onLike} class="button" href="javascript:void(0)">Like</a>` : ''}

            <!-- ( for Guests and Users )  -->
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${likes}</span>
            </div>
            <!-- Bonus -->
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>`



let ctx = null
export async function detailsPage(ctxTarget) {
    ctx = ctxTarget
    const bookId = ctx.params.id
    const userData = getUserData()


    const [book, likes, ownLike] = await Promise.all([
        getById(bookId),
        totalLikes(bookId),
        userData ? userLikes(bookId, userData.id) : 0
    ])

    let isOwner = 0
    if (userData) {
        isOwner = userData.id == book._ownerId;
    }
    ctx.render(detailsTemplate(book, isOwner,userData,likes,ownLike))
}

async function onDelete() {
    await deleteById(ctx.params.id)
    ctx.updateNav()
    ctx.page.redirect('/');
}

async function onLike() {
    const bookId = ctx.params.id 
    await addLike({ bookId })
    ctx.page.redirect('/details/' + ctx.params.id)
}