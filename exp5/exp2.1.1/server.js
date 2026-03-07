const express = require("express");
const mongoose = require("mongoose");
const Product = require("./productModel");

const app = express();

app.use(express.json());


// LOCAL MongoDB connection (Compass / localhost)
mongoose.connect("mongodb://127.0.0.1:27017/productDB")
.then(() => {
    console.log("MongoDB Connected (Local)");
})
.catch((err) => {
    console.log("Connection error:", err);
});


// Test route
app.get("/", (req, res) => {
    res.send("Server is working");
});


// CREATE product
app.post("/product", async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.send(savedProduct);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// READ products
app.get("/product", async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// UPDATE product
app.put("/product/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.send(updatedProduct);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// DELETE product
app.delete("/product/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.send("Product deleted successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});