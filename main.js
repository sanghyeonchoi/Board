const tableBody = document.querySelector(".table-body");
const url = `http://localhost:3001/`;

function getServer() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const results = data;
      console.log(results);
      const renderResults = results.map(
        ({ id, name, description, created, author }) => {
          return `<tr><td>${id}</td><td><a href="./detail.html" >${name}</a></td><td>${created}</td><td>${author}</td></tr>`;
        }
      );
      const innerHTML = renderResults.join("");
      tableBody.innerHTML = innerHTML;
    });
}

function init() {
  getServer();
}

init();
