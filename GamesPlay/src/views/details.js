import { html, getUserData } from '../lib.js'
import { getById, deleteById, getComments, creatComment } from '../api/data.js';

const detailsTemplate = (game,owner,comments,user) => html`
<section id="game-details">
        <h1>Game Details</h1>
        <div class="info-section">

            <div class="game-header">
                <img class="game-img" src="${game.imageUrl}" />
                <h1>${game.title}</h1>
                <span class="levels">MaxLevel: ${game.maxLevel}</span>
                <p class="type">${game.category}</p>
            </div>

            <p class="text">
               ${game.summary}
            </p>

            <!-- Bonus ( for Guests and Users ) -->
            <div class="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        ${comments.length > 0 ? comments.map(commentsTemplate) :  html`<p class="no-comment">No comments.</p>`}
                    </ul>
                </div>

           
            <div class="buttons">
                ${owner
                ? html` <a href="/edit/${game._id}" class="button">Edit</a>
                <a @click=${onDelete} class="button">Delete</a>`
                : ''}
            </div>
        </div>
        ${!owner && user ? html`
        <article class="create-comment">
            <label>Add new comment:</label>
            <form @submit=${onAdd} class="form">
                <textarea name="comment" placeholder="Comment......"></textarea>
                <input class="btn submit" type="submit" value="Add Comment">
            </form>
        </article>` : null}
         
</section>`

const commentsTemplate = (data) => html`
<li class="comment">
    <p>Content: ${data.comment}.</p>
</li>
`

let ctx = null
export async function detailsPage(ctxTarget) {
    ctx = ctxTarget
    const gameId = ctx.params.id
    
    const [comments, game] = await Promise.all([
        getComments(gameId),
        getById(gameId)
    ]);

    const userData = getUserData()
    let isOwner = null
    if (userData) {
        isOwner = userData.id == game._ownerId;
    }


    ctx.render(detailsTemplate(game, isOwner,comments,userData))
    
}

async function onDelete() {
        await deleteById(ctx.params.id)
        ctx.page.redirect('/');
}

async function onAdd(event) {
    event.preventDefault()
    const formData = new FormData(event.target)

    const comment = formData.get('comment')
    const gameId = ctx.params.id
    if (!comment) {
        return alert('Can\'t submit empty comment!')
    }
    const data = {
          gameId: gameId,
        comment: comment
    }
    // try {   
    //     const result = await creatComment(data)
        
    // } catch(error) {
    //     alert(error.message)
    // }
    event.target.reset()
    ctx.page.redirect('/details/' + gameId);
    
}
