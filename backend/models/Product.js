const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        set: (v) => Number(v), // Ensure price is cast to a number
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


module.exports = mongoose.model("Product", ProductSchema);
