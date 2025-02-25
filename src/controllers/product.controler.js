const Product = require("../models/product.model");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getTop4NewProducts = async (req, res) => {
  try {
    const products = await Product.getTop4NewProducts();
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("Error in getTop4NewProducts:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
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

// **New function** to get top 4 products on sale
exports.getAllProductSale = async (req, res) => {
  try {
    const productsOnSale = await Product.findAllProductSale();
    res.status(200).json(productsOnSale);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm giảm giá:", error.message);
    res.status(500).json({ error: "Lỗi server khi lấy sản phẩm giảm giá." });
  }
};
exports.getTop4ProductSale = async (req, res) => {
  try {
    const productsOnSale = await Product.top4ProductSale();
    res.status(200).json(productsOnSale);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm giảm giá:", error.message);
    res.status(500).json({ error: "Lỗi server khi lấy sản phẩm giảm giá." });
  }
};
