import { html } from '../src/lib.js'
import { register } from '../api/data.js'



const registeTemplate = () => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Register New User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onRegister}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class="form-control" id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class="form-control" id="password" type="password" name="password">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="rePass">Repeat</label>
                <input class="form-control" id="rePass" type="password" name="rePass">
            </div>
            <input type="submit" class="btn btn-primary" value="Register" />
        </div>
    </div>
</form>`



let ctx = null
export function registerPage(ctxTarget) {
    ctx = ctxTarget
    ctx.render(registeTemplate())
}

async function onRegister(event) {
    event.preventDefault()
    const dataForm = new FormData(event.target)

    const email = dataForm.get('email').trim();
    const password = dataForm.get('password').trim();f
    const rePass = dataForm.get('rePass').trim();

    if (password !== rePass) {
        return alert('Pasword don\'t match');
    }
    if (!email || !password) {
        return alert('Please fill all fields');
    }


    await register(email, password);
    event.target.reset()

    ctx.page.redirect('/');
    ctx.updateNav();

   
}