const razorpay = require("../../services/razorpay.service");
const productModel = require("../../model/product.model");
const cartModel = require("../../model/cart.model");
const orderModel = require("../../model/order.model");
const crypto = require("crypto");


const createRazorpayOrder = async (req, res) => {
    try {
        const { selectedAddress } = req.body;

        const userId = req.user.id;
        const user = req.user;


        if (!selectedAddress) {
            return res.status(400).json({ success: false, message: "Address is required" });
        }

        const cart = await cartModel.findOne({ userId })
        if (!cart || cart.items.length <= 0) {
            return res.status(400).json({
                success: false, message: "invail id or cart is empty"
            });
        }


        await orderModel.updateMany({
            userId,
            paymentStatus: "pending"
        }, {
            orderStatus: "cancelled",
            paymentStatus: "cancelled"
        })

        const productId = cart.items.map(item => item.productId)

        const cartProducts = await productModel.find({ _id: { $in: productId } })


        // ✅ calculate total securely
        const calculatedAmount = cart.items.reduce((total, item) => {

            const product = cartProducts.find(product => product._id.toString() == item.productId.toString())
            if (!product) return total
            return total + product.salePrice * item.quantity
        }, 0)

        if (calculatedAmount <= 0) {
            return res.status(400).json({ success: false, message: "Invalid amount" });
        }


        const orderItems = cart.items.map(item => {
            const product = cartProducts.find(p =>
                p._id.toString() === item.productId.toString()
            );

            if (!product) {
                throw new Error("Product not found for order");
            }

            return {
                productId: product._id,
                title: product.title,
                image: product.image,
                price: product.salePrice,
                quantity: item.quantity
            };
        });




        const newOrder = await orderModel.create({
            userId,
            cartItems: orderItems,
            selectedAddress,
            customerInfo: { mail: user.email, name: user.username },
            totalAmount: calculatedAmount,
            paymentStatus: "pending",
            orderStatus: "pending"
        });

        const options = {
            amount: calculatedAmount * 100,
            currency: "INR",
            receipt: `order_${newOrder._id}`
        };


        const razorpayOrder = await razorpay.orders.create(options);

        newOrder.razorpayOrderId = razorpayOrder.id;
        await newOrder.save();

        res.status(200).json({
            success: true,
            razorpayKey: process.env.RAZORPAY_API_KEY,
            orderId: newOrder._id,
            razorpayOrderId: razorpayOrder.id,
            amount: calculatedAmount
        });

    } catch (error) {
        console.log("Razorpay create error:", error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};



const verifyRazorpayPayment = async (req, res) => {

    try {

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
            return res.status(400).json({
                success: false
            })
        }
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed"
            })
        }

        const order = await orderModel.findById(orderId)
        if (!order) {
            return res.status(400).json({
                success: false,
                message: "Order not found!"
            })
        }

        if (order.paymentStatus === "paid") {
            return res.status(409).json({
                success: true,
                message: "payment already verified!"
            })
        }


        for (let item of order.cartItems) {
            const product = await productModel.findById(item.productId)


            if (!product) {
                return res.status(400).json({
                    success: false,
                    message: `Product ${item.title} not found!`,

                })
            }

            if (product.totalStock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Product ${product.title} has Insuficient Stock!`,
                    product: {
                        id: product._id,
                        title: product.title,
                        availalbleStock: product.totalStock,
                        requestedQuantity: item.quantity
                    }
                })
            }


        }

        for (const item of order.cartItems) {
            await productModel.findByIdAndUpdate(
                item.productId,
                { $inc: { totalStock: -item.quantity } }
            );
        }

        const cart = await cartModel.findOne({ userId: order.userId })
        if (cart) {
            cart.items = []
            await cart.save()
        }



        order.paymentStatus = "paid",
            order.orderStatus = "confirmed",
            order.paymentInfo = {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            }
        await order.save()

        return res.status(200).json({
            success: true,
            message: "Payment verification Successful",
            cart: []
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "some error occured!"
        })
    }
}


const userSuccessOrders = async (req, res) => {
    try {
        const { orderId } = req.params
        const userId = req.user.id
    

        if (!orderId) {
            return res.status(400).json({
                success: false,
                message: "orderId is not found"
            })
        }
        const orders = await orderModel.findOne({ _id : orderId, userId })
       

        if (!orders) {return res.status(403).json({
            success: false,
            message: "Unauthorized access"
        });}


        return res.status(200).json({
            success: true,
            data: orders
        })

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "some error occured"
        })
    }

}


const paymentFailed = async (req, res) => {
    try {
        
        const { orderId, reason, description } = req.body;

        await orderModel.findByIdAndUpdate(orderId, {
            paymentStatus: "failed",
            orderStatus: "cancelled",
            paymentInfo: {
                failedReason: reason,
                description
            }
        });

        res.status(200).json({
            success: true,
            message: "Payment marked as failed",
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error saving failed payment",
        });
    }
};


const getAllUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        

const skip = (page-1)*limit

    const totalOrders = await orderModel.countDocuments({ userId ,   orderStatus: { $nin: ["cancelled"] }})
    const totalPages = Math.ceil(totalOrders/limit)
        const orders = await orderModel.find({ userId ,   orderStatus: { $nin: ["cancelled"] }}).sort({ createdAt: -1 }).skip(skip).limit(limit)

        if (!orders) {
            return res.status(404).json({
                success: false,
                message: "Order is not available"
            })

        }
        

        res.status(200).json({

            success: true,
            message: "Orders fetched successfully",
            data: orders,
            paginatedInfo: {
                currentPage: page,
                totalPages: totalPages,
                totalOrders: totalOrders
            }


        })

    } catch (err) {
        console.log("Error fetching user orders:", err);
        return res.status(500).json({
            success: false,
            message: "some error occured!"
        })

    }


}


module.exports = { createRazorpayOrder, verifyRazorpayPayment, userSuccessOrders, paymentFailed, getAllUserOrders };
