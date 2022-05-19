import { page, render, getUserData } from './lib.js';
import { logout } from '../api/data.js';
import { catalogPage } from '../views/catalog.js';
import { detailsPage } from '../views/details.js';
import { creatPage } from '../views/creat.js';
import { loginPage } from '../views/login.js';
import { myFurniturePage } from '../views/myFurniture.js';
import { registerPage } from '../views/register.js';
import { editPage } from '../views/edit.js';


const root = document.querySelector('div.container')
document.querySelector('#logoutBtn').addEventListener('click', onLogout)

page(decorateContext); // middleware (below function will have the ctx from middleware function)
page('/', catalogPage);
page('/edit/:id', editPage)
page('/details/:id', detailsPage);
page('/create', creatPage);
page('/dashboard', catalogPage);
page('/login', loginPage);
page('/my-furniture', myFurniturePage);
page('/register', registerPage);

page.start();
updateNav()



//  to achieve separation of concerns.more modular, reusable, extensible and testable.
function decorateContext(ctx, next){   // dependency injection used by middleware to have content
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;

    next();
}

function updateNav() {
    const userData = getUserData()
    if (userData) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}


async function onLogout() {
    await logout()
    updateNav()
    page.redirect('/');

}