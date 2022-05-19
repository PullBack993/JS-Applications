import { showView } from "./dom.js";

const edit = document.getElementById("edit-movie");
const movieExample = document.getElementById("movie-example");
movieExample.remove();
edit.remove();

export function showEdit() {
  showView(edit);
}


