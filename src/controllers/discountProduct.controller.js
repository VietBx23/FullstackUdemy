const DiscountProduct = require("../models/discountProduct.model");

// Get all discount products
exports.getAllDiscountProducts = async (req, res) => {
  try {
    const discountProducts = await DiscountProduct.findAll();
    res.status(200).json(discountProducts);
  } catch (error) {
    console.error("Error fetching discount products", error);
    res.status(500).json({ error: "Error fetching discount products" });
  }
};

// Get discount product by ID
exports.getDiscountProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const discountProduct = await DiscountProduct.findById(id);
    if (!discountProduct) {
      return res.status(404).json({ error: "Discount product not found" });
    }
    res.status(200).json(discountProduct);
  } catch (error) {
    console.error("Error fetching discount product by ID", error);
    res.status(500).json({ error: "Error fetching discount product by ID" });
  }
};

// Create a new discount product
exports.createDiscountProduct = async (req, res) => {
  const { product_id, start_date, end_date, percentage, active } = req.body;
  try {
    const newDiscountProduct = await DiscountProduct.create({
      product_id,
      start_date,
      end_date,
      percentage,
      active,
    });
    res.status(201).json({
      id: newDiscountProduct,
      message: "Discount product created successfully",
    });
  } catch (error) {
    console.error("Error creating discount product", error);
    res.status(500).json({ error: "Error creating discount product" });
  }
};

// Update discount product by ID
exports.updateDiscountProduct = async (req, res) => {
  const { id } = req.params;
  const { product_id, start_date, end_date, percentage, active } = req.body;
  try {
    const discountProduct = await DiscountProduct.findById(id);
    if (!discountProduct) {
      return res.status(404).json({ error: "Discount product not found" });
    }
    await DiscountProduct.update(id, {
      product_id,
      start_date,
      end_date,
      percentage,
      active,
    });
    res.status(200).json({ message: "Discount product updated successfully" });
  } catch (error) {
    console.error("Error updating discount product", error);
    res.status(500).json({ error: "Error updating discount product" });
  }
};

// Delete discount product by ID
exports.deleteDiscountProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const discountProduct = await DiscountProduct.findById(id);
    if (!discountProduct) {
      return res.status(404).json({ error: "Discount product not found" });
    }
    await DiscountProduct.delete(id);
    res.status(200).json({ message: "Discount product deleted successfully" });
  } catch (error) {
    console.error("Error deleting discount product", error);
    res.status(500).json({ error: "Error deleting discount product" });
  }
};
