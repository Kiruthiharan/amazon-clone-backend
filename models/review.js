const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewScehma = new Schema({
    headline: String,
    body: String,
    rating: Number,
    photo: String,
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    user: { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Review", ReviewScehma);