const express = require('express')
const { postProductReviews, fetchProductReviews, deleteProductReview } = require('../../controllers/shopping/review.product.controller')
const authMiddleware = require('../../middleware/auth.midlleware')

const router = express.Router()
router.post('/add', authMiddleware, postProductReviews)
router.get('/get/:productId', fetchProductReviews)
router.delete('/delete/:reviewId', authMiddleware,deleteProductReview )

module.exports = router