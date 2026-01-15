const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId,
                ref : "user",
                required:true}
,
    cartItems : [
        {
            productId: {type: mongoose.Schema.Types.ObjectId,
                ref : "product",
                required:true

            },
            title : String,
            image : String,
            price : Number,
            quantity : Number

        }
    ],
    selectedAddress : {
        addressId : String,
         address : String,
         city : String,
         state : String,
         country : String,
         pincode : String,
         notes : String,
         phone:Number
    },
    customerInfo : {mail:String,name:String},
    orderStatus : String,
    paymentMethod : String,
    paymentStatus : String,
    totalAmount : Number,
}, {timestamps: true})

const orderModel = mongoose.model("order", schema)

module.exports = orderModel