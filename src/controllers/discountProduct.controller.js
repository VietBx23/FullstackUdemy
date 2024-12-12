const Discount_Product = require("../models/discountProduct.model");

// Lấy tất cả discount products
exports.getAllDiscountProducts = async (req, res) => {
  try {
    const discountProducts = await Discount_Product.findAll();
    res.status(200).json(discountProducts);
  } catch (error) {
    console.error("Error fetching discount products:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Lấy discount product theo ID
exports.getDiscountProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const discountProduct = await Discount_Product.findById(id);
    if (!discountProduct) {
      return res.status(404).json({ error: "Discount product not found" });
    }
    res.status(200).json(discountProduct);
  } catch (error) {
    console.error("Error fetching discount product by ID:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Tạo mới discount product
exports.createDiscountProduct = async (req, res) => {
  const { code, discount_amount, quantity, start_date, end_date, activate } =
    req.body;
  try {
    const newDiscountProductId = await Discount_Product.create({
      code,
      discount_amount,
      quantity,
      start_date,
      end_date,
      activate,
    });
    res.status(201).json({ id: newDiscountProductId });
  } catch (error) {
    console.error("Error creating discount product:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Cập nhật discount product
exports.updateDiscountProduct = async (req, res) => {
  const { id } = req.params;
  const { code, discount_amount, quantity, start_date, end_date, activate } =
    req.body;
  try {
    const discountProduct = await Discount_Product.findById(id);
    if (!discountProduct) {
      return res.status(404).json({ error: "Discount product not found" });
    }
    await Discount_Product.update(id, {
      code,
      discount_amount,
      quantity,
      start_date,
      end_date,
      activate,
    });
    res.status(200).json({ message: "Discount product updated successfully" });
  } catch (error) {
    console.error("Error updating discount product:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Xóa discount product
exports.deleteDiscountProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const discountProduct = await Discount_Product.findById(id);
    if (!discountProduct) {
      return res.status(404).json({ error: "Discount product not found" });
    }
    await Discount_Product.delete(id);
    res.status(200).json({ message: "Discount product deleted successfully" });
  } catch (error) {
    console.error("Error deleting discount product:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
