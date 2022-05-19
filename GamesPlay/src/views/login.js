import { html } from '../lib.js'
import { login } from '../api/data.js'


const loginTemplate = () => html`
<section id="login-page" class="auth">
    <form @submit=${onLogin} id="login">

        <div class="container">
            <div class="brand-logo"></div>
            <h1>Login</h1>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

            <label for="login-pass">Password:</label>
            <input type="password" id="login-password" name="password">
            <input type="submit" class="btn submit" value="Login">
            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </div>
    </form>
</section>`

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

    if (!email || !password) {
        return alert('All fields are required!')
    } 

    await login(email, password)
    event.target.reset()

    ctx.page.redirect('/');
    ctx.updateNav()

   
}