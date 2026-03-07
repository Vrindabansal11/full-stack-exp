const express = require("express");
const mongoose = require("mongoose");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/", studentRoutes);

app.listen(3000, ()=>{
console.log("Server running on port 3000");
});