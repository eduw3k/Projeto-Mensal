document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); 

        // recupera os dados do usuário do Local Storage
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            alert("Nenhum usuário cadastrado!");
            return;
        }

        // verifica se dados estao corretos
        if (
            (usernameInput.value === user.username || usernameInput.value === user.email) &&
            passwordInput.value === user.password
        ) {
            alert("Login realizado com sucesso!");
            window.location.href = "../telaPrincipal/tela.html";
        } else {
            alert("Nome de usuário ou senha incorretos!");
        }
    });
});