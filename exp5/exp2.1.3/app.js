const mongoose = require("mongoose");
const Product = require("./product");

mongoose.connect("mongodb://127.0.0.1:27017/ecommerceCatalog")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

async function run(){

// Insert Product

const product = new Product({

name: "Premium Headphones",

category: "Electronics",

variants: [
{
sku: "HP-BL-001",
color: "Black",
price: 199.99,
stock: 15
},

{
sku: "HP-WH-001",
color: "White",
price: 209.99,
stock: 8
}
],

reviews: [
{
userId: "65f4a8b7c1e6a8c1f4b8c7d1",
rating: 5,
comment: "Excellent sound quality"
}
],

avgRating: 5

});

await product.save();

console.log("Product Inserted");


// Aggregation – Category Rating

const ratings = await Product.aggregate([

{
$group:{
_id:"$category",
avgCategoryRating:{$avg:"$avgRating"}
}
}

]);

console.log("Category Ratings");
console.log(ratings);


// Aggregation – Low Stock

const lowStock = await Product.aggregate([

{$unwind:"$variants"},

{$match:{"variants.stock":{$lt:10}}},

{
$project:{
name:1,
"variants.sku":1,
"variants.stock":1
}
}

]);

console.log("Low Stock Products");
console.log(lowStock);

}

run();