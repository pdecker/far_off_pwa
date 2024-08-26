const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/focuspoints', { useNewUrlParser: true, useUnifiedTopology: true });
// Define User model
const User = mongoose.model('User', {
username: String,
email: String,
password: String,
points: Number
});
// Define Session model
const Session = mongoose.model('Session', {
userId: String,
startTime: Date,
endTime: Date,
points: Number
});
app.post('/api/signup', async (req, res) => {
const { username, email, password } = req.body;
const user = new User({ username, email, password, points: 0 });
await user.save();
res.json({ success: true, userId: user.id });
});
app.post('/api/login', async (req, res) => {
const { username, password } = req.body;
const user = await User.findOne({ username, password });
if (user) {
res.json({ success: true, userId: user.id, points: user.points });
} else {
res.json({ success: false });
}
});
app.post('/api/session', async (req, res) => {
const { userId, startTime, endTime, points } = req.body;
const session = new Session({ userId, startTime, endTime, points });
await session.save();
await User.findByIdAndUpdate(userId, { $inc: { points } });
res.json({ success: true });
});
app.listen(PORT, () => console.log(Server running on port ${PORT}));