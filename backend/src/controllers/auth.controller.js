const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


const registerController = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    
   const nameRegex = /^[A-Za-z ]{2,30}$/;

    if (!nameRegex.test(userName)) {
      return res.status(400).json({
        success: false,
        message: "Username must contain only letters",
      });
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const isUserExists = await userModel.findOne({ email });
    if (isUserExists) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      userName,
      email,
      password: hashPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful",
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};



const loginController = async (req, res) => {
    const { email, password } = req.body;
    try{
    if (!email || !password) {
  return res.status(400).json({
    success: false,
    message: "All fields are required",
  });
}

     const user = await userModel.findOne({email});
     if(!user){return res.status(400).json({
        success: false,
        message : "Invalid email or password "
     })}

     const matchedPassword = await bcrypt.compare(password,user.password)
    if(!matchedPassword){return res.status(400).json({
        success:false,
        message:"Invalid email or password!"
    })}
     const token = jwt.sign({id:user._id, role:user.role, email:user.email, username:user.userName},process.env.JWT_SECRET, {expiresIn:"60m"});
     res.cookie("token", token , {
        httpOnly:true,
        secure: true, 
  sameSite: "none",

     })

     return res.status(200).json({
        success:true,
        message: "login successful",
        user:{
            username:user.userName,
            email:user.email,
            role: user.role,
            id: user._id
        }
     })

    }catch(err){ console.log(err)
        res.status(500).json({
            success :false,
            message : "Some error occured"
        })
    }

}

const logoutController = async(req,res)=>{
    res.clearCookie("token", {
        httpOnly:true,
        secure: true, 
        sameSite: "none",
    });
    return res.status(200).json({
        success : true,
        message: "Logged out successful!"
    })
}

module.exports = {registerController, loginController, logoutController}