document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cadastro-form");
    const emailInput = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");
    const errorMessage = document.getElementById("error-message");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); 

        // verifica se o email é válido
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            alert("Por favor, insira um email válido.");
            return;
        }

        // verifica se as senhas são iguais
        if (password.value !== confirmPassword.value) {
            errorMessage.style.display = "block";
            return;
        } else {
            errorMessage.style.display = "none";
        }

        // salva dados localStorage
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;

        const user = {
            username: username,
            email: email,
            password: password.value,
        };

        localStorage.setItem("user", JSON.stringify(user));

        alert("Cadastro realizado com sucesso!");
        window.location.href = "../login/login.html";
    });
});