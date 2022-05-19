function attachEvents() {
  const submitBtn = document.getElementById("submit");
  const refreshBtn = document.getElementById("refresh");

  refreshBtn.addEventListener("click", getMessages);
  submitBtn.addEventListener("click", setMessage);
}
const url = "http://localhost:3030/jsonstore/messenger";
const authorInput = document.querySelector("[name=author]");
const messageInput = document.querySelector('[name="content"]');
const textArea = document.getElementById("messages");

async function getMessages() {
  const res = await fetch(url);
  const data = await res.json();

  textArea.value = Object.values(data)
    .map((m) => `${m.author}: ${m.content}`)
    .join("\n");
}

async function setMessage() {
  const author = authorInput.value;
  const content = messageInput.value;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ author, content }),
  };
  const res = await fetch(url, options);
  const data = await res.json();

  textArea.value += "\n" + `${author}: ${content}`;
  messageInput = "";
}

attachEvents();
