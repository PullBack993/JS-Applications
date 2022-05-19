import { html } from '../lib.js';
import { edit,getById } from '../api/data.js';

const editTemplate = (car) => html`
<section id="edit-listing">
    <div class="container">

        <form @submit=${onEdit}id="edit-form">
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" value="${car.brand}">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" value="${car.model}">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" value="${car.description}">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" value="${car.year}">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" value="${car.imageUrl}">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" value="${car.price}">

            <hr>
            <input type="submit" class="registerbtn" value="Edit Listing">
        </form>
    </div>
</section>`

let ctx = null
export async function editPage(ctxTarget) {
    ctx = ctxTarget
    const id = ctx.params.id
    const data = await getById(id)
    ctx.render(editTemplate(data))

}

async function onEdit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    
    const brand = formData.get('brand');
    const model = formData.get('model');
    const description = formData.get('description');
    const year = Number(formData.get('year'));
    const imageUrl = formData.get('imageUrl');
    const price = Number(formData.get('price'));

    const checker = {brand,model,description,year,imageUrl,price}
    const emptyField = Object.values(checker).some(a => a == '');
    if (emptyField) {
        return alert('All fields are required!');

    }
    const result = await edit(ctx.params.id, checker);
    event.target.reset()
    ctx.page.redirect("/details/" + result._id);

}

