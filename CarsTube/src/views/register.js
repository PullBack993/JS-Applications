import { html } from '../lib.js'
import { register } from '../api/data.js'

const registeTemplate = () => html`
<section id="register">
    <div class="container">
        <form @submit=${onRegister} id="register-form">
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr>

            <p>Username</p>
            <input type="text" placeholder="Enter Username" name="username" required>

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password" required>

            <p>Repeat Password</p>
            <input type="password" placeholder="Repeat Password" name="repeatPass" required>
            <hr>

            <input type="submit" class="registerbtn" value="Register">
        </form>
        <div class="signin">
            <p>Already have an account?
                <a href="/login">Sign in</a>.
            </p>
        </div>
    </div>
</section>`



let ctx = null
export function registerPage(ctxTarget) {
    ctx = ctxTarget
    ctx.render(registeTemplate())
}

async function onRegister(event) {
    event.preventDefault()
    const dataForm = new FormData(event.target)

    const username = dataForm.get('username').trim();
    const password = dataForm.get('password').trim();
    const rePass = dataForm.get('repeatPass').trim();

    if (password !== rePass) {
        return alert('Pasword don\'t match');
    }
    if (!username || !password) {
        return alert('Please fill all fields');
    }

    await register(username, password);
    document.getElementById('welcome').textContent = `Welcome ${username}`

    event.target.reset()

    ctx.page.redirect('/');
    ctx.updateNav();
}