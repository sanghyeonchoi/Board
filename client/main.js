const tableBody = document.querySelector(".table-body");
const descriptionBox = document.querySelector(".description");

const url = `http://localhost:3001/`;

function getServer() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const results = data;

      const renderResults = results.map(({ id, name, created, author }) => {
        return `<tr><td class="ids">${id}</td><td><a href="#"class="name">${name}</a></td><td>${created}</td><td>${author}</td><td><button class="delete-btn">삭제</button></td><td><button class="update-btn">수정</button></td></tr>`;
      });

      const innerHTML = renderResults.join("");
      tableBody.innerHTML = innerHTML;

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
      // 모든 이벤트리스너의 콜백은 이벤트 객체 (여기서는 'e') 를 매개변수로 전달받는데
      // 콜백함수 내에서 이벤트 객체의 preventDefault() 메서드를 호출하면
      // 기본적으로 설정되어있는 동작들을 방지할 수 있어
      // 이 경우에는 form 태그 안에 버튼을 눌렀을 때 발생하는 이벤트 객체에서 preventDefault 를 해서
      // 기본값이라고 했던 새로고침 동작을 방지!
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
      fetch(`${url}${ids[i].innerText}`)
        .then((res) => res.json())
        .then((data) => {
          descriptionBox.innerHTML = data[0].description;
        });
    });
  }
}
function init() {
  getServer();
}

init();
