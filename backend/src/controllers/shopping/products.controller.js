const productModel = require("../../model/product.model");

const getFiltteredProducts = async (req, res) => {
    try {
        const { category, sortBy , keyword} = req.query
        const page =Number( req.query.page) || 1
        const limit =Number( req.query.limit) || 8
        const skip = (page-1)*limit

        let filter = {}
        if (category) {
            const categories = Array.isArray(category) ? category : [category]
            filter.category = { $in: categories }
        }

    if (keyword) {
      const regex = new RegExp(keyword, "i");

      filter.$or = [
        { title: regex },
        { description: regex },
        { brand: regex }
      ];
    }

        let sortOption = {}
        if (sortBy) {
            switch (sortBy) {
                case "price_low_to_high":
                    sortOption.price = 1;
                    break;
                case "price_high_to_low":
                    sortOption.price = -1;
                    break;
                case "name_a_to_z":
                    sortOption.title = 1;
                    break;
                case "name_z_to_a":
                    sortOption.title = -1;
                    break;
                default:
                    break;
            }
        }
          
        const totalProductCount = await productModel.countDocuments(filter)

        const products = await productModel
        .find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limit)

        res.status(200).json({
            success: true,
            message: "Product filtered successfully",
            data: products,
            pagination : {
                page,
                limit,
                totalProductCount,
                totalPages : Math.ceil(totalProductCount/limit)
            }
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Some error occured",

        })
    }
}



const getProductDetails = async (req, res) => {
    try {
        const { id } = req.params;
  
        const product = await productModel.findById( id );
            
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "product not found"})
            
            }
         res.status(200).json({
                success: true,
                message: "product details fetched successfully",
                data: product
            })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Some error occured"
        })
    }
}





const getRelatedProducts = async (req, res) => {
    try {
        const { id } = req.params;
  
        const product = await productModel.findById( id);
            
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "product not found"})
            
            }

const relatedProduct = await productModel.find( {
    category: product.category,_id: {$ne: product._id}
}).limit(8);

         res.status(200).json({
                success: true,
                message: "Related product fetched successfully",
                data: relatedProduct
            })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Some error occured"
        })
    }
}

module.exports = { getFiltteredProducts, getProductDetails, getRelatedProducts }