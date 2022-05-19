import { showView } from "./dom.js";
import { showDetail } from "./details.js";
let allMovies = null
const home = document.getElementById("home-page");
const movies = document.querySelector(
  ".card-deck.d-flex.justify-content-center"
);
movies.addEventListener("click", details);

home.remove();

export function showHome() {
  showView(home);
  getMovies();
}

async function getMovies() {
  const res = await fetch("http://localhost:3030/data/movies/");
  const data = await res.json();

  movies.replaceChildren(...data.map(creatMovie));
}

function creatMovie(movie) {
  const div = document.createElement("div");
  div.className = "card mb-4";
  div.innerHTML = `<img class="card-img-top" src="${movie.img}"
        alt="Card image cap" width="400">
    <div class="card-body">
        <h4 class="card-title">${movie.title}</h4>
    </div>
    <div class="card-footer">
        <a id=${movie._id} href="#">
            <button type="button" class="btn btn-info">Details</button>
        </a>
    </div>`;

  return div;
}

function details(event) {
  let target = event.target;

  if (target.tagName == "BUTTON") {
    target = target.parentElement;
  }
  if (target.tagName == "A") {
    const id = target.id;
    showDetail(id);
  }
}
