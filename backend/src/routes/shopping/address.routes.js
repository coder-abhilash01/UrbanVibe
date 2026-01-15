const express = require('express');
const { addAddress, fetchAddress, updateAddress, deleteAddress } = require('../../controllers/shopping/address.controller');
const authMiddleware = require('../../middleware/auth.midlleware');


const router = express.Router();

router.post('/add',authMiddleware, addAddress);

router.get('/get/:userId',authMiddleware, fetchAddress );

router.put('/update/:userId/:addressId',authMiddleware, updateAddress);

router.delete('/delete/:userId/:addressId',authMiddleware, deleteAddress);

module.exports = router;

