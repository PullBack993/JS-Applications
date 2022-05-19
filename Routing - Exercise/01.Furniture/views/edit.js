import { html,until } from '../src/lib.js'
import { furnitureDetail,editFurniture } from '../api/data.js'

const editTemplate = (dataPromise) => html`
<div class="container">
<div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
    ${until(dataPromise, html`<p>L oading...</p>`)}

</div>`



const formTemplate = (item, missing) => html`
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class=${"form-control" + (missing.make ? ' is-invalid' : ' is-valid')} id="new-make" type="text" name="make" .value="${item.make}">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class=${'form-control' + (missing.model ? ' is-invalid' : ' is-valid')} id="new-model" type="text" name="model" .value="${item.model}">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class=${"form-control" + (missing.year ? ' is-invalid' : ' is-valid')} id="new-year" type="number" name="year" .value="${item.year}">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class=${"form-control" + (missing.description ? ' is-invalid' : ' is-valid')} id="new-description" type="text" name="description" .value="${item.description}">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class=${"form-control" + (missing.price ? ' is-invalid' : ' is-valid')} id="new-price" type="number" name="price" .value="${item.price}">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class=${"form-control" + (missing.img ? ' is-invalid' : ' is-valid')} id="new-image" type="text" name="img" .value="${item.img}">
                
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material" .value="${item.material}">
            </div>
            <input type="submit" class="btn btn-info" value="Edit" />
        </div>
    </div>
</form>`


let ctx = null
export function editPage(ctxTarget) {
    ctx = ctxTarget
    ctx.render(editTemplate(onLoadItem()));
}

async function onLoadItem() {
    const item = await furnitureDetail(ctx.params.id)

    return formTemplate(item, {})

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
        ctx.render(editTemplate(formTemplate(data,missing)))
        return

        
    } else {
        const result = await editFurniture(ctx.params.id,data);
        event.target.reset()
        ctx.page.redirect("/details/" + result._id);
    }

}

