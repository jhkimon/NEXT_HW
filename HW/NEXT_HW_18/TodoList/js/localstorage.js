const usernameInput = document.querySelector('.username');
const usernameWrapper = document.querySelector('.usernameWrapper');
const header = document.querySelector('#header');

function setUsername() {
    const username = usernameInput.value;
    window.localStorage.setItem('username', username);
    checkUsername();
}

function checkUsername() {
    const checkName = window.localStorage.getItem('username');
    if (checkName) {
        usernameWrapper.style.display = 'none';
        header.innerHTML = `<h1>${checkName} 의 TODO LIST</h1>
        <button onclick="resetUsername()">초기화</button>`;
    } else {
        header.innerHTML = '';
        usernameWrapper.style.display = 'flex';
        usernameInput.value = '';
    }
}

function resetUsername() {
    window.localStorage.removeItem('username');
    checkUsername();
}

checkUsername();
