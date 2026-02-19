const express = require("express");
const app = express();

app.use(express.json());

let cards = [
    { id: 1, suit: "hearts", value: "ace", collection: "classic" }
];

app.get("/api/cards", (req, res) => {
    res.json(cards);
});

app.post("/api/cards", (req, res) => {
    const { suit, value, collection } = req.body;

    const newCard = {
        id: Date.now(),
        suit,
        value,
        collection
    };

    cards.push(newCard);
    res.status(201).json(newCard);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
