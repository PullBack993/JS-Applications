function attachEvents() {
  document.getElementById("btnLoadPosts").addEventListener("click", getPosts);

  document.getElementById("btnViewPost").addEventListener("click", content);
}

attachEvents();

async function getPosts() {
  const postsField = document.getElementById("posts");

  postsField.replaceChildren();
  const url = "http://localhost:3030/jsonstore/blog/posts";

  const res = await fetch(url);
  const data = await res.json();
  Object.values(data).forEach((c) => {
    const optionElement = document.createElement("option");
    optionElement.value = c.id;
    optionElement.textContent = c.title;
    postsField.appendChild(optionElement);
  });
}

async function content() {
  const getId = document.getElementById("posts").value;
  const [comment, post] = await Promise.all([
    getComment(getId),
    getPost(getId),
  ]);

  const titleField = document.getElementById("post-title");
  const postBody = document.getElementById("post-body");

  titleField.textContent = post.title;
  postBody.textContent = post.body;
  comment.forEach((t) => creatHtmlContent(t.text));
}
function creatHtmlContent(text) {
  const commentField = document.getElementById("post-comments");
  commentField.replaceChildren();
  const liElement = document.createElement("li");
  liElement.textContent = text;
  commentField.appendChild(liElement);
}
async function getComment(id) {
  const url = `http://localhost:3030/jsonstore/blog/comments`;
  const res = await fetch(url);
  const data = await res.json();
  const comment = Object.values(data).filter((c) => c.postId == id);

  return comment;
}

async function getPost(id) {
  const url = `http://localhost:3030/jsonstore/blog/posts/` + id;
  const res = await fetch(url);
  const data = await res.json();

  return data;
}
