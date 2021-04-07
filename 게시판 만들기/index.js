const articles = document.querySelector(".articles");
const descriptionBox = document.querySelector(".description");

const url = `http://localhost:3000/`;

function contectDb() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const renderTable = data.map(({ id, name, created, author }) => {
        return `<tr><td class="ids">${id}</td><td><a href="#"class="name">${name}</a></td><td>${created}</td><td>${author}</td><td><button class="delete-btn">삭제</button></td><td><button class="update-btn">수정</button></td></tr>`;
      });
      const innerHTML = renderTable.join("");
      articles.innerHTML = innerHTML;

      const id = document.querySelectorAll(".ids");

      const title = document.querySelectorAll(".name");
      renderDescription(title, id);

      const deleteBtn = document.querySelectorAll(".delete-btn");
      deleteName(deleteBtn, id);

      const updateBtn = document.querySelectorAll(".update-btn");
      updateSomething(updateBtn, id);
    });
}

function updateSomething(btn, ids) {
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", () => {
      fetch(`${url}${ids[i].innerText}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const renderSomething = data.map(({ id, name, description }) => {
            return `<form><div class="id">${id}</div><div>NAME: <input type="text" value="${name}" class="updateName"></div><div>DESCRIPTION: <input type="text" value="${description}" class="updateDescription"></div><div><button class="confirm-btn">확인</button></div></form>`;
          });
          const renderText = renderSomething.join("");
          descriptionBox.innerHTML = renderText;

          const confirmBtn = document.querySelectorAll(".confirm-btn");
          confirmSomething(confirmBtn);
        });
    });
  }
}

function confirmSomething(btn) {
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", (e) => {
      e.preventDefault();
      const id = descriptionBox.querySelector(".id").innerText;
      const name = descriptionBox.querySelector(".updateName").value;
      const description = descriptionBox.querySelector(".updateDescription")
        .value;

      fetch(`${url}${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: description,
          created: new Date(),
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    });
  }
}

function deleteName(btn, ids) {
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", () => {
      fetch(`${url}${ids[i].innerText}`, {
        method: "DELETE",
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
          descriptionBox.innerHTML = data[0].description;
        });
    });
  }
}
function init() {
  contectDb();
}
init();
