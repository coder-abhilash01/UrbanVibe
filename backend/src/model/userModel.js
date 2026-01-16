const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    userName:{
        type: String,
        required:true,
    },
     email:{
        type: String,
        required:true,
        unique: true

    },
     password:{
        type: String,
        required:true,

    },
    role:{
        type:String,
        default: "user"

    }
})

const userModel = mongoose.model("user", schema)

module.exports = userModel;