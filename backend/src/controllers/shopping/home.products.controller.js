const productModel = require("../../model/product.model");

const getHomeProducts = async(req,res)=>{
   try{ const {tag} = req.params
   if(!tag){
        return res.status(400).json({message : "Tag parameter is required"})
    }
    
    const products = await productModel.find({tags:tag}).sort({createdAt: -1})
    if(!products){
        return res.status(404).json({message : "Products not found"})
    }
    
    return res.status(200).json({
        sauccess : true,
        tag,
        products})

}catch(err){
        console.log("Error fetching home products:", err);
        return res.status(500).json({message : "Internal server error"})
   }
}


module.exports = {
    getHomeProducts
}