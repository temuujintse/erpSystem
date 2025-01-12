const mongoose = require("mongoose"); 
const Product = require("../models/Product");

const updateProduct = async (req, res) => {
  try {
      const { id } = req.params;
      const { name, price, image, unit } = req.body;

      if (!name || price == null || !image || !unit) {
          return res.status(400).send({ message: "Name, price, image and unit are required" });
      }

      const updatedProduct = await Product.findByIdAndUpdate(
          id,
          { name, price, image, unit },
          { new: true, runValidators: true }
      );

      if (!updatedProduct) {
          return res.status(404).send({ message: "Product not found" });
      }

      res.status(200).json(updatedProduct);
  } catch (err) {
      res.status(500).send({ message: "Failed to update product", error: err.message });
  }
};



const getProduct = async (req, res) => {
  try {
      const { id } = req.params; // Extract the product ID from the route parameters
      const product = await Product.findById(id); // Find the product by its ID

      if (!product) {
          // If no product is found, return a 404 status with an error message
          return res.status(404).send({ message: "Product not found" });
      }

      res.status(200).json(product); // Respond with the product details
  } catch (err) {
      console.error("Error:", err.message); // Log any error for debugging
      res.status(500).send({ message: "Failed to fetch product", error: err.message });
  }
};




module.exports = {
    updateProduct,
    getProduct,
};
