const imageProduct = require("../models/imageProduct.model");

exports.getAllImageProducts = async (req, res) => {
  try {
    const imageProducts = await imageProduct.getAllImageProduct();
    res.status(200).json(imageProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getImageProductByProductId = async (req, res) => {
  const { product_id } = req.params;
  try {
    const productImages = await imageProduct.getImageProductByProductId(
      product_id
    );
    if (!productImages) {
      return res
        .status(404)
        .json({ message: "No images found for this product." });
    }
    res.status(200).json(productImages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getImageProductLimit5 = async (req, res) => {
  const { product_id } = req.params;
  try {
    const images = await imageProduct.getImageProductLimit5(product_id);
    if (!images) {
      return res
        .status(404)
        .json({ message: "No images found for this product." });
    }
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getImageProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const image = await imageProduct.getImageProductById(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found." });
    }
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createImageProduct = async (req, res) => {
  const { image, product_id } = req.body;
  try {
    const newImage = await imageProduct.createImageProduct({
      image,
      product_id,
    });
    res.status(201).json({
      message: "Image product created successfully.",
      imageId: newImage.insertId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateImageProduct = async (req, res) => {
  const { id } = req.params;
  const { image, product_id } = req.body;
  try {
    await imageProduct.updateImageProduct(id, { image, product_id });
    res.status(200).json({ message: "Image product updated successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteImageProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await imageProduct.deleteImageProduct(id);
    res.status(200).json({ message: "Image product deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
