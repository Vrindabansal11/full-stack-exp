const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const User = require("./user");
const Transaction = require("./transaction");

// 🔗 MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/bankDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// 🔹 Create users (for testing)
app.post("/create", async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json(user);
});


// 🔹 Transfer money (Transaction + Rollback)
app.post("/transfer", async (req, res) => {
    const { from, to, amount } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const sender = await User.findOne({ name: from }).session(session);
        const receiver = await User.findOne({ name: to }).session(session);

        // ❌ If user not found
        if (!sender || !receiver) {
            throw new Error("User not found");
        }

        // ❌ Insufficient balance → rollback
        if (sender.balance < amount) {
            throw new Error("Insufficient balance");
        }

        // 💸 Deduct & Add
        sender.balance -= amount;
        receiver.balance += amount;

        await sender.save({ session });
        await receiver.save({ session });

        // 🧾 Log transaction
        await Transaction.create([{
            from,
            to,
            amount,
            status: "SUCCESS"
        }], { session });

        // ✅ Commit
        await session.commitTransaction();
        session.endSession();

        res.json({ message: "Transfer successful" });

    } catch (err) {
        // ❌ Rollback
        await session.abortTransaction();
        session.endSession();

        // 🧾 Log failed transaction
        await Transaction.create({
            from,
            to,
            amount,
            status: "FAILED"
        });

        res.status(400).json({ error: err.message });
    }
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});