const express = require("express")
const authMiddleware = require("../../middleware/auth.midlleware")
const { createRazorpayOrder, verifyRazorpayPayment, paymentFailed, userSuccessOrders, getAllUserOrders } = require("../../controllers/shopping/order.controller")
const router = express.Router()

router.post("/create-order",authMiddleware, createRazorpayOrder )
router.post("/verify-payment", verifyRazorpayPayment )
router.get("/order-success/:orderId",authMiddleware, userSuccessOrders )
router.post("/order-failed",authMiddleware, paymentFailed)
router.get("/get",authMiddleware, getAllUserOrders)

module.exports = router