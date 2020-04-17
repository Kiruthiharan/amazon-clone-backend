const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressScehma = new Schema({
    user : {type: Schema.Types.ObjectId, ref:"User"},
    country: String,
    fullName: String,
    streetAddress: String,
    city: String,
    state: String,
    deliverInstructions: String,
    zipCode: Number,
    phoneNumber: Number,
    securityCode: Number,
});

module.exports = mongoose.model("Address", AddressScehma);