const Product = require("../models/product.model");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductsById = async (req, res) => {
  try {
    const product = await Product.getProductById(req.params.id); // Đúng tên phương thức
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const productId = await Product.createProduct(req.body); // Đúng tên phương thức
    res.status(201).json({ id: productId, message: "Product created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    await Product.update(req.params.id, req.body); // Đúng tên phương thức
    res.status(200).json({ message: "Product updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.delete(req.params.id); // Đúng tên phương thức
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
