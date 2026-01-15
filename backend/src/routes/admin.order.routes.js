const express = require("express")
const { getAllUserOrdersForAdmin, updateOrderStatus } = require("../controllers/admin/order.controller")
const authMiddleware = require("../middleware/auth.midlleware")
const adminMiddleware = require("../middleware/admin.middleware")

const router = express.Router()

router.get("/get",authMiddleware,adminMiddleware, getAllUserOrdersForAdmin)
router.put("/update/:id",authMiddleware,adminMiddleware, updateOrderStatus)

module.exports = router