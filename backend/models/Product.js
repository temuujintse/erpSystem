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
        set: (v) => Number(v),
    },
    image: {
        type: String, // URL of the image
        required: true, // Set to true if every product must have an image
    },
    unit: { type: String, default: 'piece' },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Product", ProductSchema);
