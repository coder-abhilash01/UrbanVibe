const express = require("express");
const { getFiltteredProducts, getProductDetails, getRelatedProducts } = require("../../controllers/shopping/products.controller");
const router = express.Router()

router.get("/get-products", getFiltteredProducts);
router.get("/product-details/:id", getProductDetails);
router.get("/related-products/:id", getRelatedProducts);

module.exports = router;