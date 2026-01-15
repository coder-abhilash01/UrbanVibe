 const adminMiddleware = async(req,res,next)=> {
    if(!req.user || req.user.role != "admin"){
        return res.status(403).json({
            success : false,
            message : "You are not authorized for this action!"
        })
    }
    next()
 }

 module.exports = adminMiddleware