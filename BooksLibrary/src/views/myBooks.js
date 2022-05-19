import { html,getUserData } from '../lib.js'
import { getByUserId, } from '../api/data.js'


const myBooksTemplate = (books) => html`
<section id="my-books-page" class="my-books">
        <h1>My Books</h1>
        <ul class="my-books-list">
           
         ${books.length > 0 ? books.map(myBookTemplate) : html`<p class="no-books">No books in database!</p>`}
        </ul>
</section>`


const myBookTemplate = (book) => html`
<li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl}></p>
    <a class="button" href="/details/${book._id}">Details</a>
</li>`;

export async function myBookPage(ctx) {
    const user = getUserData()
    const books = await getByUserId(user.id);
    ctx.render(myBooksTemplate(books));
    ctx.updateNav();
}

