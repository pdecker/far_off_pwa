let session = {
active: false,
points: 0,
timer: null
};
const loginSection = document.getElementById('loginSection');
const signupSection = document.getElementById('signupSection');
const appSection = document.getElementById('appSection');
const userDisplay = document.getElementById('userDisplay');
const pointsDisplay = document.getElementById('points');
const startBtn = document.getElementById('startBtn');
const endBtn = document.getElementById('endBtn');
document.getElementById('showSignup').addEventListener('click', () => {
loginSection.style.display = 'none';
signupSection.style.display = 'block';
});
document.getElementById('showLogin').addEventListener('click', () => {
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
// Implement actual login logic here
showApp(username);
}
function signup() {
const username = document.getElementById('newUsername').value;
const email = document.getElementById('email').value;
const password = document.getElementById('newPassword').value;
// Implement actual signup logic here
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
session.points = 0;
pointsDisplay.textContent = '0';
if (session.timer) {
clearInterval(session.timer);
session.timer = null;
}
}
function startSession() {
session.active = true;
startBtn.style.display = 'none';
endBtn.style.display = 'inline';
session.timer = setInterval(() => {
session.points++;
pointsDisplay.textContent = session.points;
}, 60000); // Increase points every minute
}
function endSession() {
session.active = false;
startBtn.style.display = 'inline';
endBtn.style.display = 'none';
if (session.timer) {
clearInterval(session.timer);
session.timer = null;
}
// Here you would typically send the session data to a server
console.log(Session ended. Points earned: ${session.points});
session.points = 0;
pointsDisplay.textContent = '0';
}
// Service Worker Registration
if ('serviceWorker' in navigator) {
window.addEventListener('load', () => {
navigator.serviceWorker.register('/service-worker.js')
.then(reg => console.log('Service Worker registered'))
.catch(err => console.log('Service Worker registration failed:', err));
});
}