const express = require('express')
const { getHomeProducts} = require('../../controllers/shopping/home.products.controller')

const router = express.Router()

router.get("/home-products/:tag",getHomeProducts)

module.exports = router