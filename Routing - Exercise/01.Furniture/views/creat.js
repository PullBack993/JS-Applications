import { html } from '../src/lib.js';
import { createFurniture } from '../api/data.js';

const createTemplate = (errorMsg) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Create New Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <!-- ${errorMsg ? html`<div class="form-group error">${errorMsg}</div>`: null} -->
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class=${"form-control" + (errorMsg.make ? ' is-invalid' : ' is-valid')} id="new-make" type="text" name="make">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class=${'form-control' + (errorMsg.model ? ' is-invalid' : ' is-valid')} id="new-model" type="text" name="model">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class=${"form-control" + (errorMsg.year ? ' is-invalid' : ' is-valid')} id="new-year" type="number" name="year">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class=${"form-control" + (errorMsg.description ? ' is-invalid' : ' is-valid')} id="new-description" type="text" name="description">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class=${"form-control" + (errorMsg.price ? ' is-invalid' : ' is-valid')} id="new-price" type="number" name="price">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class=${"form-control" + (errorMsg.img ? ' is-invalid' : ' is-valid')} id="new-image" type="text" name="img">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material">
            </div>
            <input type="submit" class="btn btn-primary" value="Create" />
        </div>
    </div>
</form>`

let ctx = null
export function creatPage(ctxTarget) {
    ctx = ctxTarget
    update({});

    function update(missing) {
        ctx.render(createTemplate(missing));
    }

}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, { [k]: v.trim() }), {})
    const missing = {}

    data.price = Number(data.price);
    data.year = Number(data.year);

    if (data.make.length < 4) {
        missing.make = true;
    }
    if (data.model.length < 4) {
        missing.model = true;
    }
    if (1950 > Number(data.year) || Number(data.year) > 2050) {
        missing.year = true;
    }
    if (data.description.length < 10) {
        missing.description = true
    }
    if (data.price <= 0) {
        missing.price = true;
    }
    if (data.img.length <= 0) {
        missing.img = true;
    }
    
    if (!missing && missing !== {}) {
        update(missing)
        return
        
    } else {
        const result = await createFurniture(data);
        event.target.reset()
        ctx.page.redirect("/details/" + result._id);
    }

}

