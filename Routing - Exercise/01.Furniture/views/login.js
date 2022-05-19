import { html } from '../src/lib.js'
import { login } from '../api/data.js'


const loginTemplate = () => html`
<div class="container">
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Login User</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${onLogin}>
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
                <input type="submit" class="btn btn-primary" value="Login" />
            </div>
        </div>
    </form>
</div>`

let ctx = null
export function loginPage(ctxTarget) {
    ctx = ctxTarget
    ctx.render(loginTemplate())
}

async function onLogin(event) {
    event.preventDefault()
    const dataForm = new FormData(event.target)

    const email = dataForm.get('email')
    const password = dataForm.get('password')

    await login(email, password)
    event.target.reset()

    ctx.page.redirect('/');
    ctx.updateNav()

   
}