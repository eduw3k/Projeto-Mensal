document.addEventListener("DOMContentLoaded", () => {
  const board = document.querySelector(".board");
  const addListBtn = document.getElementById("add-list-btn");

  //pega o id do quadro atual da URL
  const urlParams = new URLSearchParams(window.location.search);
  const boardId = urlParams.get("boardId");

  //pegar os quadros do localStorage
  function getBoards() {
    const boards = localStorage.getItem("boards");
    return boards ? JSON.parse(boards) : [];
  }

  //salva os quadros no localStorage
  function saveBoards(boards) {
    localStorage.setItem("boards", JSON.stringify(boards));
  }

  //pega o quadro atual
  function getCurrentBoard() {
    const boards = getBoards();
    return boards.find(board => board.id == boardId);
  }

  //salva o quadro atual
  function saveCurrentBoard(updatedBoard) {
    const boards = getBoards();
    const boardIndex = boards.findIndex(board => board.id == boardId);
    if (boardIndex !== -1) {
      boards[boardIndex] = updatedBoard;
      saveBoards(boards);
    }
  }

  // criar uma nova lista
  function criarLista() {
    const currentBoard = getCurrentBoard();
    if (!currentBoard) return;

    const listId = Date.now();
    const list = {
      id: listId,
      name: "Nova Lista",
      cards: []
    };

    currentBoard.lists = currentBoard.lists || [];
    currentBoard.lists.push(list);
    saveCurrentBoard(currentBoard);
    renderLists();
  }

  // renderiza as listas do quadro atual
  function renderLists() {
    const currentBoard = getCurrentBoard();
    if (!currentBoard) return;

    board.innerHTML = ""; // Limpa as listas existentes

    currentBoard.lists.forEach(list => {
      const listElement = document.createElement("div");
      listElement.classList.add("list");

      const deleteListBtn = document.createElement("button");
      deleteListBtn.classList.add("delete-list");
      deleteListBtn.textContent = "🗑️";
      deleteListBtn.title = "Excluir lista";
      deleteListBtn.addEventListener("click", () => {
        currentBoard.lists = currentBoard.lists.filter(l => l.id !== list.id);
        saveCurrentBoard(currentBoard);
        renderLists();
      });

      const listTitle = document.createElement("h3");
      listTitle.classList.add("list-title");
      listTitle.textContent = list.name;
      listTitle.contentEditable = true;
      listTitle.addEventListener("blur", () => {
        list.name = listTitle.textContent.trim() || "Nova Lista";
        saveCurrentBoard(currentBoard);
      });

      listElement.appendChild(deleteListBtn);
      listElement.appendChild(listTitle);

      const addCardButton = document.createElement("button");
      addCardButton.classList.add("add-card");
      addCardButton.textContent = "Criar tarefa";

      addCardButton.addEventListener("click", () => {
        const cardContent = prompt("Digite o nome da tarefa:");
        if (cardContent) {
          list.cards.push(cardContent);
          saveCurrentBoard(currentBoard);
          renderLists();
        }
      });

      list.cards.forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");

        const cardContent = document.createElement("div");
        cardContent.classList.add("card-content");
        cardContent.textContent = card;

        const deleteCardBtn = document.createElement("button");
        deleteCardBtn.classList.add("delete-card");
        deleteCardBtn.textContent = "🗑️";
        deleteCardBtn.title = "Excluir tarefa";
        deleteCardBtn.addEventListener("click", () => {
          list.cards = list.cards.filter(c => c !== card);
          saveCurrentBoard(currentBoard);
          renderLists();
        });

        cardElement.appendChild(cardContent);
        cardElement.appendChild(deleteCardBtn);
        listElement.appendChild(cardElement);
      });

      listElement.appendChild(addCardButton);
      board.appendChild(listElement);
    });
  }

  addListBtn.addEventListener("click", () => {
    criarLista();
  });

  renderLists();
});

document.addEventListener("DOMContentLoaded", () => {
  const boardsDropdown = document.getElementById("boards-dropdown");
  const createBoardBtn = document.getElementById("create-board-btn");

  //pega os quadros do localStorage
  function getBoards() {
    const boards = localStorage.getItem("boards");
    return boards ? JSON.parse(boards) : [];
  }

  //salvar os quadros no localStorage
  function saveBoards(boards) {
    localStorage.setItem("boards", JSON.stringify(boards));
  }

  //renderiza os quadros no dropdown
function renderBoards() {
  const boards = getBoards();

  // Limpa os quadros existentes (exceto o botão de criar)
  boardsDropdown.innerHTML = `
    <li><button id="create-board-btn">+ Criar Novo Quadro</button></li>
  `;

  //coloca cada quadro ao dropdown
  boards.forEach(board => {
    const boardItem = document.createElement("li");
    boardItem.style.display = "flex";
    boardItem.style.alignItems = "center";
    boardItem.style.justifyContent = "space-between";

    const boardLink = document.createElement("a");
    boardLink.href = `telaPrincipal.html?boardId=${board.id}`;
    boardLink.textContent = board.name;
    boardLink.style.flexGrow = "1";

    const deleteBoardBtn = document.createElement("button");
    deleteBoardBtn.textContent = "🗑️";
    deleteBoardBtn.title = "Excluir quadro";
    deleteBoardBtn.style.background = "none";
    deleteBoardBtn.style.border = "none";
    deleteBoardBtn.style.cursor = "pointer";
    deleteBoardBtn.style.color = "white";
    deleteBoardBtn.addEventListener("click", () => {
      if (confirm(`Tem certeza que deseja excluir o quadro "${board.name}"?`)) {
        deleteBoard(board.id);
      }
    });

    boardItem.appendChild(boardLink);
    boardItem.appendChild(deleteBoardBtn);
    boardsDropdown.insertBefore(boardItem, boardsDropdown.firstChild);
  });

  // Reatribuir evento ao botão de criar quadro
  document.getElementById("create-board-btn").addEventListener("click", createBoard);
}

//excluir um quadro
function deleteBoard(boardId) {
  let boards = getBoards();
  boards = boards.filter(board => board.id !== boardId);
  saveBoards(boards);
  renderBoards();
}

  //criar um novo quadro
function createBoard() {
  const boardName = prompt("Digite o nome do novo quadro:");
  if (boardName) {
      const boards = getBoards();
      const newBoard = { id: Date.now(), name: boardName };
      boards.push(newBoard);
      saveBoards(boards); 
      renderBoards(); 
  }
}

renderBoards();
});