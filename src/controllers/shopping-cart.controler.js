const ShoppingCart = require("../models/shopping-cart.model");

exports.getCartByUsername = async (req, res) => {
  try {
    const cartItems = await ShoppingCart.findByUsername(req.params.username);
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const cartData = req.body;
    const cartItemId = await ShoppingCart.addToCart(cartData);
    res.status(201).json({ cartItemId, message: "Item added to cart" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { qty, total } = req.body;
    await ShoppingCart.updateCartItem(req.params.id, qty, total);
    res.status(200).json({ message: "Cart item updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFromCart = async (req, res) => {
  try {
    await ShoppingCart.deleteFromCart(req.params.id);
    res.status(200).json({ message: "Item deleted from cart" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    await ShoppingCart.clearCart(req.params.username);
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
