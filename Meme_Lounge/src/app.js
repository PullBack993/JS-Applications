import { page, render, getUserData } from './lib.js';
import { logout } from './api/data.js';
import { memesPage } from './views/memesPage.js';
import { homePage } from './views/homePage.js';
import { loginPage } from './views/loginPage.js';
import { registerPage } from './views/registerPage.js';
import { detailsPage } from './views/detailsPage.js';
import { editPage } from './views/editPage.js';
import { createPage } from './views/createPage.js'
import { profilePage } from './views/profilePage.js'



document.getElementById('logout').addEventListener('click', onLogout)
const root = document.querySelector('main')

page(decorateContext);
page('/', homePage);
page('/memes', memesPage);
page('/login', loginPage);
page('/register', registerPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/create', createPage);
page('/profile', profilePage);




page.start('/');
updateNav()



function decorateContext(ctx, next){  
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;

    next();
}



function updateNav() {
    const userData = getUserData()
    if (userData) {
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
        document.getElementById('welcome').textContent = `Welcome, ${userData.email}`
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}


async function onLogout() {
    await logout()
    updateNav()
    page.redirect('/');

}