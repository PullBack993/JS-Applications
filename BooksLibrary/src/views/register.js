import { html } from '../lib.js'
import { register } from '../api/data.js'

const registeTemplate = () => html`
<section id="register-page" class="register">
    <form @submit=${onRegister} id="register-form" action="" method="">
        <fieldset>
            <legend>Register Form</legend>
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
            <p class="field">
                <label for="repeat-pass">Repeat Password</label>
                <span class="input">
                    <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Register">
        </fieldset>
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
    const rePass = dataForm.get('confirm-pass').trim();

    if (password !== rePass) {
        return alert('Pasword don\'t match');
    }
    if (!email || !password) {
        return alert('Please fill all fields');
    }

    await register(email, password);
    document.getElementById('welcome').textContent = `Welcome, ${email}`

    event.target.reset()

    ctx.page.redirect('/');
    ctx.updateNav();

   
}