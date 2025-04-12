async function criarQuadro(nomeQuadro) {
    const userId = localStorage.getItem('userId');
  
    const response = await fetch('/api/quadros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: nomeQuadro, userId }),
    });
  
    if (response.ok) {
      window.location.href = '/perfil.html'; 
    } else {
      alert('Erro ao criar quadro');
    }
  }

  async function carregarQuadrosDoUsuario() {
    const userId = localStorage.getItem('userId');
  
    const response = await fetch(`/api/quadros?userId=${userId}`);
    const quadros = await response.json();
  
    const container = document.getElementById('quadros');
    quadros.forEach(quadro => {
      const card = document.createElement('div');
      card.innerText = quadro.nome;
      card.classList.add('card');
      container.appendChild(card);
    });
  }
   
  app.get('/api/quadros', async (req, res) => {
    const { userId } = req.query;
    const quadros = await db.quadros.find({ userId });
    res.json(quadros);
  });
  