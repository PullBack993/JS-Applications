import {html,updateBook} from './utility.js'


const updateTemplate = () =>  html`
<form @submit=${onSubmit} id="edit-form">
    <input type="hidden" name="id" .value=${ctx.book._id}>
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title..." .value=${ctx.book.title}>
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author..." .value=${ctx.book.author}>
    <input type="submit" value="Save">
</form>`

let ctx = null
export function showUpdate(ctxTarget){
    ctx = ctxTarget
    if (ctx.book == undefined){
        return null
    }else{
        return updateTemplate();

    }
}

async function onSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.target);


    const id = formData.get('id')
    const title = formData.get('title').trim();
    const author = formData.get('author').trim();


    const res = await updateBook(id,{ title, author });

    event.target.reset();
    delete ctx.book;
    ctx.update()
}