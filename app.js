document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('loginSection');
    const signupSection = document.getElementById('signupSection');
    const appSection = document.getElementById('appSection');
    const userDisplay = document.getElementById('userDisplay');
    const pointsDisplay = document.getElementById('points');
    const startBtn = document.getElementById('startBtn');
    const endBtn = document.getElementById('endBtn');

    document.getElementById('showSignup').addEventListener('click', (e) => {
        e.preventDefault();
        loginSection.style.display = 'none';
        signupSection.style.display = 'block';
    });

    document.getElementById('showLogin').addEventListener('click', (e) => {
        e.preventDefault();
        signupSection.style.display = 'none';
        loginSection.style.display = 'block';
    });

    document.getElementById('loginBtn').addEventListener('click', login);
    document.getElementById('signupBtn').addEventListener('click', signup);
    document.getElementById('logoutBtn').addEventListener('click', logout);
    startBtn.addEventListener('click', startSession);
    endBtn.addEventListener('click', endSession);

    function login() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        console.log('Login attempt:', username, password);
        // Here you would typically send this data to your server
        showApp(username);
    }

    function signup() {
        const username = document.getElementById('newUsername').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('newPassword').value;
        console.log('Signup attempt:', username, email, password);
        // Here you would typically send this data to your server
        showApp(username);
    }

    function showApp(username) {
        loginSection.style.display = 'none';
        signupSection.style.display = 'none';
        appSection.style.display = 'block';
        userDisplay.textContent = username;
    }

    function logout() {
        appSection.style.display = 'none';
        loginSection.style.display = 'block';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    }

    function startSession() {
        startBtn.style.display = 'none';
        endBtn.style.display = 'inline';
        // Start timer logic here
    }

    function endSession() {
        startBtn.style.display = 'inline';
        endBtn.style.display = 'none';
        // End timer and calculate points logic here
    }
});
