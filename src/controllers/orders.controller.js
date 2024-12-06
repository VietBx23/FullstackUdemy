// controllers/orders.controller.js
const Order = require("../models/orders.model");

// Tạo một đơn hàng mới
async function createOrder(req, res) {
  try {
    const orderData = req.body;
    const orderId = await Order.createOrder(orderData);
    res.status(201).json({ message: "Order created successfully", orderId });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create order", message: err.message });
  }
}

// Lấy danh sách đơn hàng của người dùng
async function getOrders(req, res) {
  try {
    const { username } = req.params;
    const orders = await Order.getOrdersByUsername(username);
    res.status(200).json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch orders", message: err.message });
  }
}

// Cập nhật trạng thái đơn hàng
async function updateOrderStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const success = await Order.updateOrderStatus(id, status);
    if (success) {
      res.status(200).json({ message: "Order status updated successfully" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update order status", message: err.message });
  }
}

// Xóa một đơn hàng
async function deleteOrder(req, res) {
  try {
    const { id } = req.params;
    const success = await Order.deleteOrder(id);
    if (success) {
      res.status(200).json({ message: "Order deleted successfully" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete order", message: err.message });
  }
}

module.exports = {
  createOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder,
};
