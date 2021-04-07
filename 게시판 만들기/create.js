const createBtn = document.querySelector(".create-btn");
const createUrl = `http://localhost:3000/create`;

function postCreate() {
  const NAME = document.querySelector(".name").value;
  const DESCRIPTION = document.querySelector(".description").value;
  const AUTHOR = document.querySelector(".author").value;

  fetch(createUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: NAME,
      description: DESCRIPTION,
      author: AUTHOR,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
}

function init() {
  createBtn.addEventListener("click", postCreate);
}

init();
