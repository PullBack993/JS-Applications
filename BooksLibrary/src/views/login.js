import { html } from '../lib.js'
import { login } from '../api/data.js'


const loginTemplate = () => html`
<section id="login-page" class="login">
    <form @submit=${onLogin} id="login-form" action="" method="">
        <fieldset>
            <legend>Login Form</legend>
            <p class="field">
                <label for="email">Email</label>
                <span class="input">
                    <input type="text" name="email" id="email" placeholder="Email">
                </span>
            </p>
            <p class="field">
                <label for="password">Password</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Login">
        </fieldset>
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
    document.getElementById('welcome').textContent = `Welcome, ${dataForm.get('email')}`
    event.target.reset()

    ctx.page.redirect('/');
    ctx.updateNav()

   
}