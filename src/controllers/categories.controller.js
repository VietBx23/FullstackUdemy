const Categories = require("../models/categories.model");
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getCategoriesById = async (req, res) => {
  try {
    const categories = await Categories.getCategoriesById(req.params.id);
    if (!categories)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.createCategories = async (req, res) => {
  try {
    const categories = await Categories.createCategory(req.body);
    res
      .status(201)
      .json({ categories, message: "Category created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCategories = async (req, res) => {
  try {
    await Categories.updateCategory(req.params.id, req.body);
    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCategories = async (req, res) => {
  try {
    await Categories.deleteCategory(req.params.id);
    res.status(200).json({ message: "categories deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
