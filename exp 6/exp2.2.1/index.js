const express = require("express");
const app = express();

app.use(express.json());

// 🔹 Logging Middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
};

app.use(logger);

// 🔹 Auth Middleware
const auth = (req, res, next) => {
    const token = req.headers.authorization;

    if (token === "mysecrettoken") {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};

// 🔹 Routes
app.get("/", (req, res) => {
    res.send("Public Route");
});

app.get("/protected", auth, (req, res) => {
    res.send("Protected Route Accessed");
});

// 🔹 Error Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong" });
});

// 🔹 Server Start
app.listen(3000, () => {
    console.log("Server running on port 3000");
});