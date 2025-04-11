document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".board");
    const createListLink = document.getElementById("create-list");

    // função para criar uma nova lista
    createListLink.addEventListener("click", (event) => {
        event.preventDefault();

        // cria o contêiner da nova lista
        const list = document.createElement("div");
        list.classList.add("list");

        // botão de deletar lista
        const deleteListBtn = document.createElement("button");
        deleteListBtn.classList.add("delete-list");
        deleteListBtn.textContent = "🗑️";
        deleteListBtn.title = "Excluir lista";
        deleteListBtn.addEventListener("click", () => {
            list.remove();
        });

        // adiciona o título da lista
        const listTitle = document.createElement("h3");
        listTitle.classList.add("list-title");
        listTitle.textContent = "Nova Lista";
        listTitle.contentEditable = true; //editar o título
        listTitle.addEventListener("blur", () => {
            if (listTitle.textContent.trim() === "") {
                listTitle.textContent = "Nova Lista"; 
            }
        });
        list.appendChild(listTitle);

        // adiciona o botão e título à lista
        list.appendChild(deleteListBtn);
        list.appendChild(listTitle);

        // botão para criar cards
        const addCardButton = document.createElement("button");
        addCardButton.classList.add("add-card");
        addCardButton.textContent = "Criar tarefa";
        list.appendChild(addCardButton);

        // criar cards
        addCardButton.addEventListener("click", () => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.textContent = "Nova Tarefa";
            card.contentEditable = true; //editar o nome do card
            card.addEventListener("blur", () => {
                if (card.textContent.trim() === "") {
                    card.textContent = "Nova Tarefa"; 
                }
            });
            list.insertBefore(card, addCardButton);

            // conteúdo editável do card
            const cardContent = document.createElement("div");
            cardContent.classList.add("card-content");
            cardContent.contentEditable = true;
            cardContent.addEventListener("blur", () => {
                if (cardContent.textContent.trim() === "") {
                    cardContent.textContent = "Nova Tarefa"; 
                }
            });

            // botão de deletar card
            const deleteCardBtn = document.createElement("button");
            deleteCardBtn.classList.add("delete-card");
            deleteCardBtn.textContent = "🗑️";
            deleteCardBtn.title = "Excluir tarefa";
            deleteCardBtn.addEventListener("click", () => {
                card.remove();
            });

            // adicionar conteúdo e botão ao card
            card.appendChild(cardContent);
            card.appendChild(deleteCardBtn);

            // inserir o card antes do botão de adicionar card
            list.insertBefore(card, addCardButton);
        });

        // adiciona a nova lista ao quadro
        board.appendChild(list);
    });
});