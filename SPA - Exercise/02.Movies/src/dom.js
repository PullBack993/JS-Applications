import { movieId, showDetail } from "./details.js";
import { showEdit } from "./edit.js";
import { showHome } from "./home.js";

const main = document.querySelector("main");

export function showView(section) {
  main.replaceChildren(section);
}
let movieInfo = "";

export function detailMovie(movieData, likes, hasLiked) {
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  movieInfo = movieData;
  const section = document.createElement("section");
  section.id = "movie-example";

  const div = document.createElement("div");
  div.className = "container";
  const divRow = document.createElement("div");
  divRow.className = "row bg-light text-dark";
  const h1 = document.createElement("h1");
  h1.textContent = movieData.title;
  const divCol = document.createElement("div");
  divCol.className = "col-md-8";
  const img = document.createElement("img");
  img.className = "img-thumbnail";
  img.src = `${movieData.img}`;
  img.alt = "Movie";
  const divColMd = document.createElement("div");
  divColMd.className = "col-md-4 text-center";
  const h3 = document.createElement("h3");
  h3.textContent = "Movie Description";
  const p = document.createElement("p");
  p.textContent = movieData.description;

  const deleteBtn = document.createElement("a");
  deleteBtn.className = "btn btn-danger";
  deleteBtn.href = "#";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", onDelete);

  const editBtn = document.createElement("a");
  editBtn.className = "btn btn-warning";
  editBtn.href = "#";
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", onEdit);

  const likeBtn = document.createElement("a");

  likeBtn.className = "btn btn-primary";
  likeBtn.href = "#";
  likeBtn.textContent = `Like`;
  likeBtn.addEventListener("click", onLike);

  const span = document.createElement("span");
  span.className = "enrolled-span";
  span.textContent = `Like ${likes}`;
  divCol.appendChild(img);
  divColMd.appendChild(h3);
  divColMd.appendChild(p);

  if (userData != null) {
    if (userData.id == movieData._ownerId) {
      divColMd.appendChild(deleteBtn);
      divColMd.appendChild(editBtn);
    } else {
      if (hasLiked.length > 0) {
        const unlikedBtn = document.createElement("a");
        unlikedBtn.className = "btn btn-primary";
        unlikedBtn.href = "#";
        unlikedBtn.textContent = `Unlike`;
        unlikedBtn.addEventListener("click", unliked);
        divColMd.appendChild(unlikedBtn);
      } else {
        divColMd.appendChild(likeBtn);
      }
    }
  }
  divColMd.appendChild(span);
  h1.appendChild(divColMd);
  divRow.appendChild(h1);
  divRow.appendChild(divCol);
  divRow.appendChild(divColMd);
  div.appendChild(divRow);
  section.appendChild(div);

  showView(section);
  async function unliked() {
    const likeId = hasLiked[0]._id;
    await fetch(`http://localhost:3030/data/likes/${likeId}`, {
      method: "DELETE",
      headers: {
        "X-Authorization": userData.token,
      },
    });
    showDetail(movieId);
  }
  function onEdit(event) {
    showEdit();
    const title = movieInfo.title;
    const description = movieInfo.description;
    const img = movieInfo.img;
    document.getElementById("titl").value = title;
    document.getElementById("descript").value = description;
    document.getElementById("img").value = img;

    document.getElementById("submitBtn").addEventListener("click", edit);
    async function edit(event) {
      const userData = JSON.parse(sessionStorage.getItem("userData"));

      const titleField = document.getElementById("titl").value;
      const descriptionField = document.getElementById("descript").value;
      const imgField = document.getElementById("img").value;

      event.preventDefault();

      const res = await fetch(`http://localhost:3030/data/movies/${movieId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": userData.token,
        },
        body: JSON.stringify({
          title: titleField,
          description: descriptionField,
          img: imgField,
        }),
      });

      showHome();
    }
  }
  async function onLike() {
    await fetch("http://localhost:3030/data/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": userData.token,
      },
      body: JSON.stringify({
        movieId: movieId,
      }),
    });
    showDetail(movieId);
  }
  async function onDelete(event) {
    event.preventDefault()
    const res = await fetch(`http://localhost:3030/data/movies/${movieId}`, {
      method: 'delete',
      headers: {
          'X-Authorization': userData.token
      }
  });

  showHome();
  }
  
}
