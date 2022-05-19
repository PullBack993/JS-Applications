import { html, } from '../lib.js';
import { register } from '../api/data.js';
import { notify } from './notify.js';

const loginTemplate = () => html`
<section id="register">
    <form @submit=${onRegister}id="register-form">
        <div class="container">
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username">
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" name="email">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
            <div class="gender">
                <input type="radio" name="gender" id="female" value="female">
                <label for="female">Female</label>
                <input type="radio" name="gender" id="male" value="male" checked>
                <label for="male">Male</label>
            </div>
            <input type="submit" class="registerbtn button" value="Register">
            <div class="container signin">
                <p>Already have an account?<a href="/login">Sign in</a>.</p>
            </div>
        </div>
    </form>
</section>`

let ctx = null
export function registerPage(ctxTarget) {
    ctx = ctxTarget
    ctx.render(loginTemplate())

}

async function onRegister(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const username = formData.get('username')
    const email = formData.get('email')
    const password = formData.get('password')
    const repeatPass = formData.get('repeatPass')
    const gender = formData.get('gender')


    if (email == '' || password == '' || repeatPass == '') {
       return notify('All fields are required!')
    }
    if (password != repeatPass) {
        return notify('Password don\'t match!')
    }
    await register(username, email, password, gender)
    ctx.updateNav()
    ctx.page.redirect('/memes')
}
