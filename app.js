document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('loginSection');
    const signupSection = document.getElementById('signupSection');
    const appSection = document.getElementById('appSection');
    const userDisplay = document.getElementById('userDisplay');
    const pointsStreamedDisplay = document.getElementById('pointsStreamed');
    const pointsEarnedDisplay = document.getElementById('pointsEarned');
    const totalPointsStreamedDisplay = document.getElementById('totalPointsStreamed');
    const totalPointsEarnedDisplay = document.getElementById('totalPointsEarned');
    const startBtn = document.getElementById('startBtn');
    const endBtn = document.getElementById('endBtn');

    let session = {
        active: false,
        pointsStreamed: 0,
        pointsEarned: 0,
        timer: null
    };

    let user = {
        username: '',
        totalPointsStreamed: 0,
        totalPointsEarned: 0
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
        // Here you would typically send this data to your server and get the user's total points
        // For now, we'll simulate this with local storage
        user.username = username;
        user.totalPointsStreamed = parseInt(localStorage.getItem(username + '_pointsStreamed') || 0);
        user.totalPointsEarned = parseInt(localStorage.getItem(username + '_pointsEarned') || 0);
        showApp(username);
    }

    function signup() {
        const username = document.getElementById('newUsername').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('newPassword').value;
        console.log('Signup attempt:', username, email, password);
        // Here you would typically send this data to your server
        user.username = username;
        user.totalPointsStreamed = 0;
        user.totalPointsEarned = 0;
        localStorage.setItem(username + '_pointsStreamed', '0');
        localStorage.setItem(username + '_pointsEarned', '0');
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
        user = { username: '', totalPointsStreamed: 0, totalPointsEarned: 0 };
    }

    function startSession() {
        if (!session.active) {
            session.active = true;
            startBtn.style.display = 'none';
            endBtn.style.display = 'inline';
            session.timer = setInterval(() => {
                session.pointsStreamed++;
                // Simulate DeviceActivity Framework API verification
                if (Math.random() > 0.2) { // 80% chance of earning points
                    session.pointsEarned++;
                }
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
            console.log(`Session ended. Points streamed: ${session.pointsStreamed}, Points earned: ${session.pointsEarned}`);
            // Update total points
            user.totalPointsStreamed += session.pointsStreamed;
            user.totalPointsEarned += session.pointsEarned;
            // Here you would typically send the session data to your server
            // For now, we'll use local storage
            localStorage.setItem(user.username + '_pointsStreamed', user.totalPointsStreamed.toString());
            localStorage.setItem(user.username + '_pointsEarned', user.totalPointsEarned.toString());
            session.pointsStreamed = 0;
            session.pointsEarned = 0;
            updatePointsDisplay();
        }
    }

    function updatePointsDisplay() {
        pointsStreamedDisplay.textContent = session.pointsStreamed;
        pointsEarnedDisplay.textContent = session.pointsEarned;
        totalPointsStreamedDisplay.textContent = user.totalPointsStreamed;
        totalPointsEarnedDisplay.textContent = user.totalPointsEarned;
    }

    // PWA installation code
    let deferredPrompt;
    const installPrompt = document.getElementById('installPrompt');
    const installBtn = document.getElementById('installBtn');

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installPrompt.style.display = 'block';
    });

    installBtn.addEventListener('click', (e) => {
        installPrompt.style.display = 'none';
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
    });

    window.addEventListener('appinstalled', (evt) => {
        installPrompt.style.display = 'none';
        console.log('App was installed');
    });
});
