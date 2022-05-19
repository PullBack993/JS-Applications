import { page, render, getUserData } from './lib.js';
import { logout } from './api/data.js';
import { detailsPage } from './views/details.js';
import { creatPage } from './views/create.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js'
import { listingsPage } from './views/listings.js';
import { myListingsPage } from './views/myListings.js';
import { searchPage } from './views/search.js'

const root = document.querySelector('#site-content')
document.querySelector('#logout').addEventListener('click', onLogout)

page(decorateContext); 
page('/', homePage);
page('/listings', listingsPage);
page('/myListings', myListingsPage);
page('/edit/:id', editPage)
page('/details/:id', detailsPage);
page('/create', creatPage);
page('/login', loginPage);
page('/register', registerPage);
page('/search', searchPage)

page.start();
updateNav()

function decorateContext(ctx, next){  
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;

    next();
}

function updateNav() {
    const userData = getUserData()
    if (userData) {
        document.getElementById('profile').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}


async function onLogout() {
    await logout()
    updateNav()
    page.redirect('/');

}