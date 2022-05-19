function profileTemplate(person) {
  const mainDiv = document.createElement("div");
  const personBtn = document.createElement("button");
  personBtn.innerText = "Show more";

  mainDiv.className = "profile";
  mainDiv.innerHTML = `<img src="./iconProfile2.png" class="userIcon" />
<label>Lock</label>
<input type="radio" name="user${person._id}Locked" value="lock" checked>
<label>Unlock</label>
<input type="radio" name="user${person._id}Locked" value="unlock"><br>
<hr>
<label>Username</label>
// <input type="text" name="user${person._id}Username" value=${person.username} disabled readonly/>
<div id="user${person._id}HiddenFields" style="display:none">
    <hr >
    <label>Email:</label>
    <input type="email" name="user${person._id}Email" value=${person.email} disabled readonly />
    <label>Age:</label>
    <input type="email" name="user${person._id}Age" value=${person.age} disabled readonly />
</div>`;

  personBtn.addEventListener("click", onClick);
  mainDiv.appendChild(personBtn);

  return mainDiv;
}

async function lockedProfile() {
  const data = await fetch(`http://localhost:3030/jsonstore/advanced/profiles`);
  const des = await data.json();

  const main = document.querySelector("main");
  main.innerHTML = "";

  Object.values(des).forEach((p) => main.appendChild(profileTemplate(p)));
}
function onClick(e) {
  const profile = e.target.parentElement;
  const isActive = profile.querySelector(
    'input[type="radio"][value="unlock"]'
  ).checked;

  if (isActive) {
    const infoDif = profile.querySelector("div");

    if (e.target.textContent == "Show more") {
      infoDif.style.display = "block";
      e.target.textContent = "Hide it";
    } else {
      infoDif.style = "display: none";
      e.target.textContent = "Show more";
    }
  }
}
