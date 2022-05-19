import { html, render } from '../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs'

export {
    html,
    render,
    page,
}

export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}


export function createSubmitHandler(event, ...fieldNames) {
    event.preventDefault();
    const formData = new FormData(event.target)

    const result = {}
    for (let field of fieldNames[0]) {
        result[field] = formData.get(field).trim()
    }
    return result
}