const productModel = require("../../model/product.model");
const uploadFile = require("../../services/storage.services")

 
 const createProduct = async(req, res)=> {
    const {title,description,category,price,salePrice, totalStock, } = req.body;
    
    const tags = JSON.parse(req.body.tags)
    const file = req.file;
    try{
    if(!file)return res.status(400).json({
        success:false,
        message: "plz upload a file!"
    })
        
        const image =await uploadFile(file.buffer, file.originalname) 
    

        const createdProductdata = await productModel.create({
            title,
            description,
            category,
            price,
            salePrice,
            image : image.url,
            totalStock,
            tags

        })


return res.status(201).json({
    success: true,
    message: "product added Successfully",
    data:createdProductdata
})


    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message : "Some error occured"
        })
    }
}

// fetch all products
 const fetchAllProducts = async(req, res)=> {
   
    try{
        
const fetchedProducts = await productModel.find({})
res.status(200).json({
    success:true,
    message:"Product fetched Successfuly",
    data:fetchedProducts
})

    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message : "Some error occured"
        })
    }
}




// edit product
 const editProduct = async(req, res)=> {
   
    try{
        const {id} = req.params;
        const {title,
            description,
            category,
            price,
            salePrice,
            image,
        totalStock } = req.body
        const tags = req.body.tags

            const findProduct = await productModel.findById(id);
        
            if(!findProduct){return res.status(404).json({
                success:false,
                message: "Product not found!"
            })}

            findProduct.title = title  || findProduct.title
            findProduct.description = description  || findProduct.description
            findProduct.category = category  || findProduct.category
            findProduct.price = price  || findProduct.price
            findProduct.salePrice = salePrice  || findProduct.salePrice
            findProduct.image = image  || findProduct.image
             findProduct.totalStock = totalStock  || findProduct.totalStock
              findProduct.tags = tags  || findProduct.tags

            await findProduct.save()

 res.status(200).json({
    success: true,
    message: "product edited successfully",
    data: findProduct
 })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message : "Some error occured"
        })
    }
}

// dalete a product
 const deleteProduct = async(req, res)=> {
   
    try{
        const {id} = req.params;
        const product = await productModel.findByIdAndDelete(id);
        if(!product){return res.status(404).json({
            success:false,
            message: "Product not found!"

        })}

        res.status(200).json({
            success:true,
            message: "Product deleted successfully!"
        })


    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message : "Some error occured"
        })
    }
}

module.exports = {createProduct, fetchAllProducts, editProduct, deleteProduct}