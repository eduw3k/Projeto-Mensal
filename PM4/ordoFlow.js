const apiUrl = 'https://personal-ga2xwx9j.outsystemscloud.com/Trellospl/rest/Trello';

//formulário de boards
document.getElementById('board-form').addEventListener('submit', async e => {
  e.preventDefault();
  const payload = {
    Id: Number(document.getElementById('board-id').value) || Date.now(),
    Name: document.getElementById('board-name').value,
    Description: document.getElementById('board-description').value,
    HexadecimalColor: document.getElementById('board-color').value
  };
  try {
    const res = await fetch(`${apiUrl}/CreateOrUpdateBoard`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    showRaw(data);
    alert('Quadro salvo com sucesso!');
  } catch (err) {
    alert('Erro ao salvar quadro.');
    console.error(err);
  }
});

//exibir JSON bruto em #result
function showRaw(data) {
  document.getElementById('result').textContent = JSON.stringify(data, null, 2);
}

//obter todos os boards e popular dropdown
async function loadBoards() {
  const dropdown = document.getElementById('boards-dropdown');
  dropdown.innerHTML = '';

  try {
    const res = await fetch(`${apiUrl}/GetBoards`);
    const boards = await res.json();

    boards.forEach(board => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.textContent = board.Name;
      btn.onclick = () => renderBoard(board.Id);
      li.appendChild(btn);
      dropdown.appendChild(li);
    });

  } catch (err) {
    alert('Erro ao carregar quadros.');
    console.error('Erro ao carregar quadros:', err);
  }
}

//criar/atualizar coluna
document.getElementById('column-form').addEventListener('submit', async e => {
  e.preventDefault();
  const payload = {
    Id: Number(document.getElementById('column-id').value) || 0,
    BoardId: Number(document.getElementById('column-board-id').value),
    Title: document.getElementById('column-title').value
  };
  try {
    const res = await fetch(`${apiUrl}/CreateOrUpdateColumn`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    showRaw(data);
    alert('Coluna salva com sucesso!');
  } catch (err) {
    alert('Erro ao criar/atualizar coluna.');
    console.error('Erro ao criar/atualizar coluna:', err);
  }
});

//criar/atualizar tarefa
document.getElementById('task-form').addEventListener('submit', async e => {
  e.preventDefault();
  const payload = {
    Id: Number(document.getElementById('task-id').value) || 0,
    ColumnId: Number(document.getElementById('task-column-id').value),
    Title: document.getElementById('task-title').value,
    Description: document.getElementById('task-description').value
  };
  try {
    const res = await fetch(`${apiUrl}/CreateOrUpdateTask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    showRaw(data);
    alert('Tarefa salva com sucesso!');
  } catch (err) {
    alert('Erro ao criar/atualizar tarefa.');
    console.error('Erro ao criar/atualizar tarefa:', err);
  }
});

//deletar tarefa
document.getElementById('delete-task-form').addEventListener('submit', async e => {
  e.preventDefault();
  const id = document.getElementById('delete-task-id').value;
  try {
    const res = await fetch(`${apiUrl}/DeleteTask?TaskId=${id}`, { method: 'DELETE' });
    if (res.ok) {
      alert('Tarefa deletada com sucesso!');
      // opcional: limpar resultado anterior
      document.getElementById('result').textContent = '';
    } else {
      const errData = await res.json();
      showRaw(errData);
      alert('Erro ao deletar tarefa.');
    }
  } catch (err) {
    alert('Erro ao deletar tarefa.');
    console.error('Erro ao deletar tarefa:', err);
  }
});

//buscar board por ID
document.getElementById('get-board-form').addEventListener('submit', async e => {
  e.preventDefault();
  const id = document.getElementById('get-board-id').value;
  try {
    const res = await fetch(`${apiUrl}/GetBoardById?BoardId=${id}`);
    const data = await res.json();
    showRaw(data);
    alert('Quadro encontrado!');
  } catch (err) {
    alert('Erro ao buscar board.');
    console.error('Erro ao buscar board:', err);
  }
});

//buscar board completo
document.getElementById('get-complete-board-form').addEventListener('submit', async e => {
  e.preventDefault();
  const id = document.getElementById('get-complete-board-id').value;
  try {
    const res = await fetch(`${apiUrl}/GetCompleteBoard?BoardId=${id}`);
    const data = await res.json();
    showRaw(data);
    alert('Quadro completo carregado!');
  } catch (err) {
    alert('Erro ao buscar quadro completo.');
    console.error('Erro ao buscar board completo:', err);
  }
});

//renderizar board completo
async function renderBoard(boardId) {
  try {
    const res = await fetch(`${apiUrl}/GetCompleteBoard?BoardId=${boardId}`);
    const data = await res.json();
    const boardDiv = document.querySelector('.board');
    boardDiv.innerHTML = '';

    data.Columns.forEach(col => {
      const colEl = document.createElement('div');
      colEl.className = 'list';
      colEl.innerHTML = `<h3>${col.Title}</h3>`;

      col.Tasks.forEach(task => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          ${task.Title}
          <button onclick="deleteTask(${task.Id}, ${boardId})">🗑</button>
        `;
        colEl.appendChild(card);
      });

      colEl.innerHTML += `<button onclick="createTask(${col.Id}, ${boardId})">Criar tarefa</button>`;
      boardDiv.appendChild(colEl);
    });

  } catch (err) {
    alert('Erro ao renderizar board.');
    console.error('Erro ao renderizar board:', err);
  }
}

//auxiliar p criar/deletar a partir da renderização
async function createTask(columnId, boardId) {
  const title = prompt('Título da tarefa:');
  if (!title) return;
  try {
    await fetch(`${apiUrl}/CreateOrUpdateTask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Id: Date.now(), ColumnId: columnId, Title: title, Description: '' })
    });
    alert('Tarefa criada com sucesso!');
    renderBoard(boardId);
  } catch (err) {
    alert('Erro ao criar tarefa.');
    console.error('Erro ao criar tarefa:', err);
  }
}

async function deleteTask(taskId, boardId) {
  try {
    const res = await fetch(`${apiUrl}/DeleteTask?TaskId=${taskId}`, { method: 'DELETE' });
    if (res.ok) {
      alert('Tarefa deletada com sucesso!');
      renderBoard(boardId);
    } else {
      const errData = await res.json();
      showRaw(errData);
      alert('Erro ao deletar tarefa.');
    }
  } catch (err) {
    alert('Erro ao deletar tarefa.');
    console.error('Erro ao deletar tarefa:', err);
  }
}

//só carrega se clicar em "Listar Todos os Quadros"
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('get-all-boards').addEventListener('click', loadBoards);
});