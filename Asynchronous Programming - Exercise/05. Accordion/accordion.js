async function solution() {
  const url = "http://localhost:3030/jsonstore/advanced/articles/list";
  const res = await fetch(url);
  const content = await res.json();
  for (const id of content) {
    getContent(id);
  }
}

async function getContent(id) {
  const address = `http://localhost:3030/jsonstore/advanced/articles/details/${id._id}`;
  const response = await fetch(address);
  const data = await response.json();
  template(data);
}
function template(data) {
  const wrapperDiv = elementCreator("div", "accordion");

  const headDiv = elementCreator("div", "head");
  const titleSpan = elementCreator("span", "", "", data.title);
  const btn = elementCreator("button", "button", data._id, "More");
  btn.addEventListener("click", changeVisiable);

  const extraDiv = elementCreator("div", "extra");
  const contentP = elementCreator("p", "", "", data.content);

  extraDiv.appendChild(contentP);

  headDiv.appendChild(titleSpan);
  headDiv.appendChild(btn);

  wrapperDiv.appendChild(headDiv);
  wrapperDiv.appendChild(extraDiv);

  const main = document.getElementById("main");

  main.appendChild(wrapperDiv);
}

function elementCreator(tagName, clsName, currId, content) {
  let name = document.createElement(tagName);
  if (clsName) {
    name.className = clsName;
  }
  if (currId) {
    name.id = currId;
  }
  if (content) {
    name.textContent = content;
  }
  return name;
}

function changeVisiable(e) {
  const text = e.target;
  const visiable = e.target.parentElement.nextSibling;
  if (text.textContent == "More") {
    visiable.style.display = "inline";
    text.textContent = "Less";
  } else {
    visiable.style.display = "none";
    text.textContent = "More";
  }
}

solution();
