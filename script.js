document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Проверка на уникальность имени пользователя
    const existingUser = JSON.parse(localStorage.getItem('users')) || [];
    
    if (existingUser.find(user => user.username === username)) {
        displayMessage("Пользователь с таким именем уже существует!", "error");
        return;
    }

    // Сохранение нового пользователя
    existingUser.push({ username, password });
    localStorage.setItem('users', JSON.stringify(existingUser));
    
    displayMessage(`Пользователь ${username} зарегистрирован!`, "success");
    
    // Очистка формы
    document.getElementById('registrationForm').reset();
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Проверка на существование пользователя
    if (users.find(user => user.username === username && user.password === password)) {
        displayMessage(`Добро пожаловать, ${username}!`, "success");
        // Здесь можно добавить логику для перехода на другую страницу или выполнения других действий.
        setTimeout(() => location.reload(), 2000); // Обновление страницы через 2 секунды
    } else {
        displayMessage("Неверное имя пользователя или пароль!", "error");
    }
});

// Функция для отображения сообщений
function displayMessage(message, type) {
    const messageDiv = document.getElementById('message');
    
    messageDiv.textContent = message;
    
    if (type === "success") {
        messageDiv.style.color = "green";
    } else {
        messageDiv.style.color = "red";
    }
}
