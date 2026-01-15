
const cartModel = require('../../model/cart.model')
const productModel = require('../../model/product.model')

const addToCart = async (req, res) => {

    try {
        const {productId, quantity } = req.body;
       const userId = req.user.id
        

        if ( !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided"
            })
        }

      

        const product = await productModel.findById(productId)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        let cart = await cartModel.findOne({ userId })
        if (!cart) {
            cart = new cartModel({ userId, items: [] })

        }

        const existingItem = cart.items.find(item => item.productId == productId)

        if (existingItem) { existingItem.quantity += quantity } else {
            cart.items.push({ productId, quantity })
        }
        await cart.save()

        res.status(201).json({
            success: true,
            data: cart,
            message: "product added to cart"
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Some error occured!"
        })
    }
}



const fetchCartItems = async (req, res) => {

    try {
         const userId = req.user.id

        const cart = await cartModel.findOne({ userId }).populate({
            path: 'items.productId',
            select: "image title price salePrice"
        })


           if (!cart) {
      return res.status(200).json({
        success: true,
        data: {
          items: []
        }
      });
    }


        const validItems = cart.items.filter(productItem => productItem.productId)
        if (validItems.length < cart.items.length) {
            cart.items = validItems
            await cart.save()
        }
        const populateCartItems = validItems.map(item => ({
            productId: item.productId.id,
            image: item.productId.image,
            title: item.productId.title,
            price: item.productId.price,
            salePrice: item.productId.salePrice,
            quantity: item.quantity,
        }))
        res.status(200).json({
            success: true,
            data: {...cart.doc,
                items:populateCartItems
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Some error occured!"
        })
    }
}



const updateCartItemQty = async (req, res) => {

    try {
        const { productId, quantity } = req.body;

         const userId = req.user.id

        if (!productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided"
            })
        }

        let cart = await cartModel.findOne({ userId })
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found!"
            })

        }

        const item = cart.items.find(item => item.productId.toString() === productId)
        if (!item) {
            return res.status(200).json({
                success: true,
                message: "cart item not present!",
                data: cart
            })
        }
        item.quantity = quantity
        await cart.save()

        await cart.populate({
            path: 'items.productId',
            select: 'image title price salePrice'

        })

        const populateCartItems = cart.items.map(item => ({
            productId: item.productId.id || null,
            image: item.productId.image || null,
            title:  item.productId.title || "product not found",
            price:  item.productId.price || null,
            salePrice: item.productId.salePrice || null,
            quantity: item.quantity,
        }))
        return res.status(200).json({
            success: true,
            message: "cart quantity updated!",
            data: {...cart.doc,
                items:populateCartItems
            }
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Some error occured!"
        })
    }
}



const deleteCartItem = async (req, res) => {

    try {
        
const { productId} = req.params;

 const userId = req.user.id

     

if(!productId){
    return res.status(400).json({
        success:false,
        message:"invalid data provided"
    })
}
const cart = await cartModel.findOne({userId}).populate({
    path: "items.productId",
    select: "image title price salePrice"
    })
if(!cart){
    return res.status(404).json({
        success:false,
        message:"Cart not found!"
    })
}

cart.items = cart.items.filter(item=> item.productId._id.toString() !== productId)
await cart.save()
await cart.populate({
    path: "items.productId",
    select: "image title price salePrice"
    })
    const populateCartItems = cart.items.map(item => ({
            productId: item.productId.id || null,
            image: item.productId.image || null,
            title:  item.productId.title || "product not found",
            price:  item.productId.price || null,
            salePrice: item.productId.salePrice || null,
            quantity: item.quantity,
        }))
        return res.status(200).json({
            success: true,
            message: "cart quantity updated!",
            data: {...cart.doc,
                items:populateCartItems
            }
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Some error occured!"
        })
    }
}


module.exports = { addToCart, fetchCartItems, updateCartItemQty, deleteCartItem }