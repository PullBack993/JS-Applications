import { html } from '../lib.js';
import { createCar } from '../api/data.js';

const createTemplate = () => html`
<section id="create-listing">
    <div class="container">
        <form @submit=${onCreat}id="create-form">
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">

            <hr>
            <input type="submit" class="registerbtn" value="Create Listing">
        </form>
    </div>
</section>
`

let ctx = null
export async function creatPage(ctxTarget) {
    ctx = ctxTarget
    ctx.render(createTemplate())

}

async function onCreat(event) {
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
    const result = await createCar(checker);
    event.target.reset()
    ctx.page.redirect("/details/" + result._id);

}

