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

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    console.log("Attempting to delete product with ID:", id);

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.error("Invalid ID format:", id);
            return res.status(400).send({ message: 'Invalid product ID format' });
        }

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            console.error("No product found with ID:", id);
            return res.status(404).send({ message: 'Product not found' });
        }

        console.log("Deleted product:", deletedProduct);
        res.status(200).send({ message: 'Product deleted successfully', product: deletedProduct });
    } catch (err) {
        console.error("Error deleting product:", err.message);
        res.status(500).send({ message: 'Failed to delete product', error: err.message });
    }
};







module.exports = {
    addProduct,
    getProductList,
    deleteProduct,
};
