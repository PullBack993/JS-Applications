import { showView } from './dom.js'
import {showHome} from './home.js'
import { updateNav } from './app.js'



const login = document.getElementById('form-login')
const form = login.querySelector('form')
form.addEventListener('submit', onLogin)
login.remove()

export function showLogin(){
    showView(login)
}

async function onLogin(event) {
    event.preventDefault()
    const formData = new FormData(form)

    const email = formData.get('email').trim()
    const password = formData.get('password').trim()
    
    try{
        const res = await fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        if (res.ok == false){
            const error = await res.json()
            throw new Error()
        }

        const data = await res.json()
        sessionStorage.setItem('userData', JSON.stringify({
            email: data.email,
            id: data._id,
            token: data.accessToken,
        }));
        form.reset()
        updateNav()
        showHome()

    }catch(error){
        alert('Email or password don\'t match')
    }
}