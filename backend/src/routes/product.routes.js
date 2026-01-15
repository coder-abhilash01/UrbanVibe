const express = require("express");
const router = express.Router();
const multer = require ("multer");
const productController = require("../controllers/admin/product.controller");
const authMiddleware = require("../middleware/auth.midlleware");
const adminMiddleware = require("../middleware/admin.middleware");

const storage = multer.memoryStorage();
const upload = multer({storage});
router.post("/create-product",authMiddleware,adminMiddleware, upload.single("image"), productController.createProduct);
router.get("/get",authMiddleware,adminMiddleware, productController.fetchAllProducts);
router.put("/edit/:id",authMiddleware,adminMiddleware, productController.editProduct);
router.delete("/delete/:id",authMiddleware,adminMiddleware, productController.deleteProduct);
module.exports = router ;