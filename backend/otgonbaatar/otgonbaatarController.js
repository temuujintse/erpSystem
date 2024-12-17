const mongoose = require("mongoose"); 
const Product = require("../models/Product");

const addProduct = async (req, res) => {
    try {
        console.log("Request body:", req.body); // Debugging line
        const { name, price } = req.body;
        const newProduct = new Product({ name, price });
        await newProduct.save();
        res.status(201).send({ message: 'Product added successfully', product: newProduct });
    } catch (err) {
        console.error("Error:", err.message); // Log error for debugging
        res.status(400).send({ message: 'Failed to add product', error: err.message });
    }
};



const getProductList = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).send({ message: 'Failed to fetch products' });
    }
};

const updateProduct = async (req, rest) => {
    
}



module.exports = {
    addProduct,
    getProductList,
};
