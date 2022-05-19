import {html, until, getBooks, deleteBook} from './utility.js'

const catalogTemplate = (booksPromise) => html`
<table>
    <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        ${until(booksPromise, html`<tr><td colSpan="3">Loading...</td></tr>`)}
        
    </tbody>
</table>`

const bookRow = (book) => html`<tr>
<td>${book.title}</td>
<td>${book.author}</td>
<td>
    <button @click=${() => onEdit(book)}>Edit</button>
    <button @click=${() => onDelete(book)}>Delete</button>
</td>
</tr>`

let ctx = null
export function showCatalog(ctxTarget){
    ctx = ctxTarget
    return catalogTemplate(loadBooks())
}

async function loadBooks(){
    const data = await getBooks();

    const books = Object.entries(data).map(([k,v]) => Object.assign(v, {_id: k}));
    return Object.values(books).map(bookRow);
}

function onEdit(book){
    ctx.book = book;
    ctx.update()
}

async function onDelete(book){
    await deleteBook(book._id)
    ctx.update()
    
}