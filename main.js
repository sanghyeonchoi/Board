const tableBody = document.querySelector(".table-body");
const detailText = document.querySelector(".description");

const url = `http://localhost:3001/`;

function getServer() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const results = data;

      const renderResults = results.map(
        ({ id, name, description, created, author }) => {
          return `<tr><td class="ids">${id}</td><td><a href="#"class="name">${name}</a></td><td>${created}</td><td>${author}</td><td><button class="delete-btn">삭제</button></td></tr>`;
        }
      );

      const innerHTML = renderResults.join("");
      tableBody.innerHTML = innerHTML;
      const title = document.querySelectorAll(".name");
      const id = document.querySelectorAll(".ids");
      renderDescription(title, id);
      const deleteBtn = document.querySelectorAll(".delete-btn");
      console.log(deleteBtn);
      deleteName(deleteBtn, id);
    });
}

function deleteName(btn, ids) {
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", () => {
      console.log(ids[i].innerText);

      console.log("delete");
      fetch(`${url}${ids[i].innerText}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
    });
  }
}

function renderDescription(text, ids) {
  for (let i = 0; i < text.length; i++) {
    text[i].addEventListener("click", () => {
      console.log(`${url}${ids[i].innerText}`);
      fetch(`${url}${ids[i].innerText}`)
        .then((res) => res.json())
        .then((data) => {
          const detail = data;
          console.log(detail);
          const render = detail[0].description;
          detailText.innerHTML = render;
        });
    });
  }
}
function init() {
  getServer();
}

init();
