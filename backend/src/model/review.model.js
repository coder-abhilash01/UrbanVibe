const mongoose = require('mongoose')

const schema =  new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId,
    ref : 'user',
    required : true},
    productId : {type : mongoose.Schema.Types.ObjectId,
        ref : 'product',
        required : true},
    
    rating : {type: Number, required:true, min:1, max:5},
    comment : {type: String},
},{ timestamps:true })

schema.index({userId:1, productId:1}, {unique: true})
const reviewModel = mongoose.model('reviews', schema)

module.exports = reviewModel