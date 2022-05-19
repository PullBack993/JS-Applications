import { html } from '../lib.js'
import { register } from '../api/data.js'

const registeTemplate = () => html`
<section id="register-page" class="content auth">
    <form @submit=${onRegister} id="register">
        <div class="container">
            <div class="brand-logo"></div>
            <h1>Register</h1>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="maria@email.com">

            <label for="pass">Password:</label>
            <input type="password" name="password" id="register-password">

            <label for="con-pass">Confirm Password:</label>
            <input type="password" name="confirm-password" id="confirm-password">

            <input class="btn submit" type="submit" value="Register">

            <p class="field">
                <span>If you already have profile click <a href="/login">here</a></span>
            </p>
        </div>
    </form>
</section>`



let ctx = null
export function registerPage(ctxTarget) {
    ctx = ctxTarget
    ctx.render(registeTemplate())
}

async function onRegister(event) {
    event.preventDefault()
    const dataForm = new FormData(event.target)

    const email = dataForm.get('email').trim();
    const password = dataForm.get('password').trim();
    const rePass = dataForm.get('confirm-password').trim();

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