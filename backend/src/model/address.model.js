const mongoose = require('mongoose');

const schema = new mongoose.Schema({
     userId : String,
     address: String,
     city: String,
     state: String,
     pincode: String,
     phone: String,
     country: String,
     notes: String,

},{ timestamps: true });

const addressModel =mongoose.model('Address', schema);

module.exports = addressModel;
