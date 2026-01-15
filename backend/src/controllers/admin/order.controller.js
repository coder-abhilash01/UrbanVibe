const orderModel = require("../../model/order.model")

const getAllUserOrdersForAdmin = async (req, res) => {
    try {
        const orders = await orderModel.find({orderStatus: {$nin : "cancelled"}}).sort({createdAt : -1})

        if (!orders || !orders.length) {
            return res.status(404).json({
                success: false,
                message: "orders not found!"
            })
        }

        res.status(200).json({
            success: true,
            message: "Orders Fetched Successfully!",
           data : orders
        }

        )
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "some error occured"
        })
    }


}


const updateOrderStatus = async(req,res)=> {
    try{
     const {id} = req.params
     const {orderStatus} = req.body
    console.log(id,orderStatus, "hhhh")
 if(!id || !orderStatus){
     return res.status(400).json({
                success: false,
                
            })
 }


     const orders = await orderModel.findById(id)
      if (!orders) {
            return res.status(404).json({
                success: false,
                message: "orders not found!"
            })
        }
await orderModel.findByIdAndUpdate(id,{orderStatus})


 res.status(200).json({
            success: true,
            message: "Order status updated Successfully!",
           data : orders
        }

        )
    }catch(err){
        

return res.status(500).json({
            success: false,
            message: "some error occured"})


    }
}


module.exports = {getAllUserOrdersForAdmin, updateOrderStatus}