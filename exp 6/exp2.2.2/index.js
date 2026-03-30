const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const User = require("./user");
const auth = require("./auth");

const SECRET = "mysecretkey";

// 🔗 MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/bankDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// 🔹 Register
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
        username,
        password: hashed
    });

    await user.save();

    res.json({ message: "User Registered" });
});


// 🔹 Login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1m" });

    res.json({ token });
});


// 🔹 Protected route
app.get("/balance", auth, async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json({ balance: user.balance });
});


// 🔹 Refresh token
app.post("/refresh", auth, (req, res) => {
    const newToken = jwt.sign({ id: req.user.id }, SECRET, { expiresIn: "1m" });
    res.json({ token: newToken });
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});