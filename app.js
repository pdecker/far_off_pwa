document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('loginSection');
    const signupSection = document.getElementById('signupSection');
    const appSection = document.getElementById('appSection');
    const userDisplay = document.getElementById('userDisplay');
    const pointsDisplay = document.getElementById('points');
    const startBtn = document.getElementById('startBtn');
    const endBtn = document.getElementById('endBtn');

    let session = {
        active: false,
        points: 0,
        timer: null
    let deferredPrompt;
const installPrompt = document.getElementById('installPrompt');
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    installPrompt.style.display = 'block';
});

installBtn.addEventListener('click', (e) => {
    // Hide our user interface that shows our A2HS button
    installPrompt.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
        } else {
            console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
    });
});

// Check if the app is already installed
window.addEventListener('appinstalled', (evt) => {
    installPrompt.style.display = 'none';
    console.log('App was installed');
});
    };

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
        updatePointsDisplay();
    }

    function logout() {
        appSection.style.display = 'none';
        loginSection.style.display = 'block';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        endSession();
    }

    function startSession() {
        if (!session.active) {
            session.active = true;
            startBtn.style.display = 'none';
            endBtn.style.display = 'inline';
            session.timer = setInterval(() => {
                session.points++;
                updatePointsDisplay();
            }, 60000); // Increase points every minute
            console.log('Session started');
        }
    }

    function endSession() {
        if (session.active) {
            session.active = false;
            startBtn.style.display = 'inline';
            endBtn.style.display = 'none';
            clearInterval(session.timer);
            console.log(`Session ended. Points earned: ${session.points}`);
            // Here you would typically send the session data to your server
            session.points = 0;
            updatePointsDisplay();
        }
    }

    function updatePointsDisplay() {
        pointsDisplay.textContent = session.points;
    }
});
