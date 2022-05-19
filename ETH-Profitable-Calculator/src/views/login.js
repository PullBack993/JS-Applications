import { html, until } from "../api/lib.js";
import { login } from "../api/data.js";
import { errorMsg, err } from "./common.js";

const loginTemplate = (data, error) => html`
  <section id="login">
    <div class="container-login">
      <form @submit=${onLogin} id="login-form" method="post">
        <h2 class="login-header">Login</h2>
        <p>Please enter your credentials.</p>
        <hr>
        ${errorMsg(error)}

        <p>Username</p>
        <input id="${error ? err(error) : undefined}" placeholder="Enter Username" name="username" type="text" id="b"/>

        <p>Password</p>
        <input  id="${error ? err(error) : undefined}" type="password" placeholder="Enter Password" name="password" />
        <button type="submit" class="registerbtn">
          ${data ? "Loading..." : "Login"}
        </button>
      </form>

      <div class="signin">
        <p>Dont have an account? <a href="/register">Register</a>.</p>
      </div>
    </div>
  </section>
`;

let ctx = null;
export function loginPage(ctxTarget) {
  ctx = ctxTarget;
  ctx.render(loginTemplate());
}

async function onLogin(event) {
  event.preventDefault();

  ctx.render(until(onLogin(), loginTemplate("wait", "")));


  const dataForm = new FormData(event.target);

  const username = dataForm.get("username");
  const password = dataForm.get("password");
  try {
    if (!username || !password) {
      return ctx.render(loginTemplate('', "All fields are required!"))
    }

    await login(username, password);
  } catch(err) {
    return ctx.render(loginTemplate("", err));
  }

  event.target.reset();

  ctx.page.redirect("/");
  ctx.updateNav();
}
