import { createIdea } from '../api/data.js'

const section = document.getElementById("createPage");
section.remove();
const form = section.querySelector("form");
form.addEventListener("submit", onSubmit);

let ctx = "";

export async function showCreatePage(ctxTarget) {
  ctx = ctxTarget;
  ctx.showSection(section);
}

async function onSubmit(event) {
  event.preventDefault();
  const formData = new FormData(form);

  const title = formData.get("title").trim();
  const description = formData.get("description").trim();
  const img = formData.get("imageURL").trim();

  if (title.length < 6) {
    return alert("Title must be at least 6 charecters long");
  }
  if (description.length < 10) {
    return alert("Description must be at least 10 charecters long");
  }
  if (img.length < 5) {
    return alert("Imgae URL must be at least 5 charecters long");
  }

  createIdea({ title, description, img });
  form.reset()
  ctx.goTo("catalog");
}
