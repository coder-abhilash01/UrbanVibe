const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    image : String,
    title: String,
    description: String,
    category : String,
    price:Number,
    salePrice: Number,
    totalStock: Number,
    averageRating: {type: Number, default: 0},
    reviewCount: {type: Number, default: 0},
    tags:[String]
},{timestamps:true});

const productModel= mongoose.model("product", productSchema);

module.exports = productModel;