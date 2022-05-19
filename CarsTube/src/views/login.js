import { html } from '../lib.js'
import { login } from '../api/data.js'


const loginTemplate = () => html`
<section id="login">
    <div class="container">
        <form @submit=${onLogin} id="login-form" action="#" method="post">
            <h1>Login</h1>
            <p>Please enter your credentials.</p>
            <hr>

            <p>Username</p>
            <input placeholder="Enter Username" name="username" type="text">

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn" value="Login">
        </form>
        <div class="signin">
            <p>Dont have an account?
                <a href="/register">Sign up</a>.
            </p>
        </div>
    </div>
</section>`

let ctx = null
export function loginPage(ctxTarget) {
    ctx = ctxTarget
    ctx.render(loginTemplate())
}

async function onLogin(event) {
    event.preventDefault()
    const dataForm = new FormData(event.target)

    const username = dataForm.get('username')
    const password = dataForm.get('password')

    if (!username || !password) {
        return alert('All fields are required!')
    } 

    await login(username, password)
    document.getElementById('welcome').textContent = `Welcome ${username}`
    event.target.reset()

    ctx.page.redirect('/');
    ctx.updateNav()

   
}