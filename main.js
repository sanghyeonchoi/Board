const tableBody = document.querySelector(".table-body");
const detailText = document.querySelector(".description");
const deleteBtn = document.querySelector(".delete-btn");
const url = `http://localhost:3001/`;

// function getIds(num) {
//   for (let i = 1; i < num.length + 1; i++) {
//     const getUrlId = `${url}${i}`;
//     return getUrlId;
//   }
// }

function getServer() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const results = data;

      const renderResults = results.map(
        ({ id, name, description, created, author }) => {
          return `<tr><td>${id}</td><td><a href="#"class="name">${name}</a></td><td>${created}</td><td>${author}</td></tr>`;
        }
      );

      const innerHTML = renderResults.join("");
      tableBody.innerHTML = innerHTML;
      const title = document.querySelectorAll(".name");
      renderDescription(title);
      // getIds(title);
    });
}
function renderDescription(text) {
  for (let i = 0; i < text.length; i++) {
    text[i].addEventListener("click", () => {
      console.log(`${url}${i + 1}`);
      fetch(`${url}${i + 1}`)
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
