const orderModel = require("../../model/order.model")
const productModel = require("../../model/product.model")
const reviewModel = require("../../model/review.model")

const postProductReviews = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body
        const userId = req.user.id

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "productId is required!"
            })
        }

        if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: "Rating must be an integer between 1 and 5"
            })
        }


        const hasPurchased = await orderModel.findOne({
            userId: userId,
            "cartItems.productId": productId,
            orderStatus: "delivered"
        })
        if (!hasPurchased) {
            return res.status(403).json({
                success: false,
                message: "You can only review products that you have purchased!"
            })
        }

        const existingReview = await reviewModel.findOne({ userId, productId })
        if (existingReview) {
            return res.status(409).json({
                success: false,
                message: "You have already reviewed this product!"
            })
        }
        const newReview = new reviewModel({
            userId,
            productId,
            rating: rating,
            comment: comment || ""
        })

        await newReview.save()

 const product = await productModel.findById(productId);
 if(!product){ return res.status(404).json({ success: false, message: "Product not found!" }); }

 const oldAverage = product.averageRating || 0;
 const oldCount = product.reviewCount || 0;
 const newCount = oldCount + 1;

 const newAverage = ((oldAverage*oldCount)+rating)/newCount
 product.averageRating = Number(newAverage.toFixed(1));
 product.reviewCount = newCount;
 await product.save();    


        return res.status(201).json({
            success: true,
            message: "Review submitted successfully!"
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "some error occured!"
        })

    }
}



const fetchProductReviews = async (req, res) => {
    try {
        const { productId } = req.params
        

        if (!productId ) {
            return res.status(400).json({
                success: false,
                message: "ProductId is missing!"
            })
        }

        const productReview = await reviewModel.find({ productId }).populate({path : 'userId', select: 'userName'})
        if (!productReview.length) {
            return res.status(200).json({
                success: true,
                data: [],
                message: "No reviews yet!"
            })
        }


        return res.status(200).json({
            success: true,
            message: "Review fetched successfully!",
            data: productReview

        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "some error occured!"
        })

    }
}



const deleteProductReview = async(req,res)=> {
   try{ const {reviewId} = req.params
    const userId = req.user.id

    if (!reviewId){return res.status(400).json({
        success:false,
        message : "reviewId is required"
    })}

    const review = await reviewModel.findById(reviewId)
    if(!review){return res.status(404).json({
        success:false,
        message:"review not found"
    })}

    if(review.userId.toString() != userId){
            return res.status(403).json({
                success: false,
                message: "You are not allowed to delete this review",
            });
    }

    await reviewModel.findByIdAndDelete(reviewId)

        return res.status(200).json({
                success: true,
                message: "Review deleted Successfully!",
            });
    
    }catch(err){
          console.log(err)
        return res.status(500).json({
            success: false,
            message: "some error occured!"
        })
    }
}


module.exports = {
    postProductReviews,
    fetchProductReviews,
    deleteProductReview
}