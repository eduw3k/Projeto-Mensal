document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".board");
    const createListLink = document.getElementById("create-list");
    const addListBtn = document.getElementById("add-list-btn");
  
    function criarLista() {
      const list = document.createElement("div");
      list.classList.add("list");
  
      const deleteListBtn = document.createElement("button");
      deleteListBtn.classList.add("delete-list");
      deleteListBtn.textContent = "🗑️";
      deleteListBtn.title = "Excluir lista";
      deleteListBtn.addEventListener("click", () => list.remove());
  
      const listTitle = document.createElement("h3");
      listTitle.classList.add("list-title");
      listTitle.textContent = "Nova Lista";
      listTitle.contentEditable = true;
      listTitle.addEventListener("blur", () => {
        if (listTitle.textContent.trim() === "") {
          listTitle.textContent = "Nova Lista";
        }
      });
  
      list.appendChild(deleteListBtn);
      list.appendChild(listTitle);
  
      const addCardButton = document.createElement("button");
      addCardButton.classList.add("add-card");
      addCardButton.textContent = "Criar tarefa";
  
      addCardButton.addEventListener("click", () => {
        const card = document.createElement("div");
        card.classList.add("card");
  
        const cardContent = document.createElement("div");
        cardContent.classList.add("card-content");
        cardContent.textContent = "Nova Tarefa";
        cardContent.contentEditable = true;
        cardContent.addEventListener("blur", () => {
          if (cardContent.textContent.trim() === "") {
            cardContent.textContent = "Nova Tarefa";
          }
        });
  
        const deleteCardBtn = document.createElement("button");
        deleteCardBtn.classList.add("delete-card");
        deleteCardBtn.textContent = "🗑️";
        deleteCardBtn.title = "Excluir tarefa";
        deleteCardBtn.addEventListener("click", () => card.remove());
  
        card.appendChild(cardContent);
        card.appendChild(deleteCardBtn);
  
        list.insertBefore(card, addCardButton);
      });
  
      list.appendChild(addCardButton);
      board.appendChild(list);
    }
  
    createListLink.addEventListener("click", (event) => {
      event.preventDefault();
      criarLista();
    });
  
    addListBtn.addEventListener("click", () => {
      criarLista();
    });
  });
  