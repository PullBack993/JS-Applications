import { showView } from './dom.js'
import {showHome} from './home.js'
import { updateNav } from './app.js'


const singUp = document.getElementById('form-sign-up')
const form = document.querySelector('form')
form.addEventListener('submit', register)
singUp.remove()

export function showSingUp(){
    showView(singUp)
}
    
async function register(event) {
    event.preventDefault()
    const formData = new FormData(form)

    const email = formData.get('email').trim()
    const password = formData.get('password').trim()
    const repeatPassword = formData.get('repeatPassword').trim()
    if (!email || !password || !repeatPassword){
        return alert('Please complete all fields')
    }

    if (password != repeatPassword) {
        return alert('password don\'t match')
    }
    
    try{
        const res = await fetch('http://localhost:3030/users/register/', {
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
        alert(error.message)
    }
}
