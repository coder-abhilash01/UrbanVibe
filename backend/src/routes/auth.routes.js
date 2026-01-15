const express = require("express");
const { registerController,loginController, logoutController } = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.midlleware");


const router = express.Router();

router.post("/register", registerController );
router.post("/login", loginController)
router.post("/logout", logoutController)
router.get("/check-auth", authMiddleware, (req,res)=>{
    const user = req.user;

    res.status(200).json({
        success: true,
        message: "Authenticated user",
        user,
        username: user.userName
    })
})


module.exports = router