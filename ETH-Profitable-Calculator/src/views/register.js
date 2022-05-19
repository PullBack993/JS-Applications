import { html, until } from "../api/lib.js";
import { errorMsg,err } from "./common.js";
import { register } from "../api/data.js";

const registerTemplate = (data, msg) => html` <section id="login">
  <div class="container-login">
    <form @submit=${onRegister} id="login-form" method="post">
      <h2>Register</h2>
      <p>Please fill in this form to create an account.</p>
      <hr />
      ${msg ? errorMsg(msg.message) : undefined}

      <p>Username</p>
      <input
        placeholder="Enter Username"
        name="username"
        type="text"
        id=${msg ? err(msg.username) : undefined}
      />

      <p>E-Mail</p>
      <input
        id=${msg ? err(msg.email) : undefined}
        placeholder="Enter E-Mail"
        name="email"
        type="text"
      />

      <p>Password</p>
      <input
        id=${msg ? err(msg.password) : undefined}
        type="password"
        placeholder="Enter Password"
        name="password"
      />

      <p>Repeat Password</p>
      <input
        type="password"
        placeholder="Repeat Password"
        name="repeatPass"
        required
        id=${msg ? err(msg.rePass) : undefined}
      />
      <hr />

      <button type="submit" class="registerbtn">
        ${data ? "Loading..." : "Register"}
      </button>
    </form>
    <div class="signin">
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  </div>
</section>`;

let ctx = null;

export function registerPage(ctxTarget) {
  ctx = ctxTarget;
  renderTemplate();
}
async function onRegister(event) {
  event.preventDefault();
  ctx.render(until(onRegister(), registerTemplate("wait")));
  const dataForm = new FormData(event.target);

  const username = dataForm.get("username").trim();
  const email = dataForm.get("email").trim();
  const password = dataForm.get("password").trim();
  const rePass = dataForm.get("repeatPass").trim();

  let missing = {};

  try {
    if (!username) {
      missing.username = true;
      missing.message = "Please fill all fields";
    }
    if (!email) {
      missing.email = true;
      missing.message = "Please fill all fields";
    }
    if (password != rePass) {
      missing.password = true;
      missing.rePass = true;
      missing.message = "Pasword don't match";
    }

    if (Object.keys(missing).length > 0) {
      return renderTemplate("", missing);
    }
    await register(username, email, password);

  } catch(err) {
    missing.message = err
    if (err == "Account already exists for this username.") {
      missing.username = true;
      
    } if (
      err == "Account already exists for this email address." ||
      err == "Email address format is invalid."
    ) {
      missing.email = true;
    }
      return renderTemplate("", missing);

  }

  ctx.page.redirect("/");
  ctx.updateNav();
}

function renderTemplate(data, erra) {
  ctx.render(registerTemplate(data, erra));
}

let a = "Account already exists for this username.";
let asd = "Account already exists for this email address.";