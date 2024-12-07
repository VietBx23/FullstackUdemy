const OrderDetails = require("../models/orderDetail.model");

// Lấy tất cả OrderDetails
exports.getAllOrderDetails = async (req, res) => {
  try {
    const orderDetails = await OrderDetails.getAllOrderDetail();
    res.status(200).json(orderDetails);
  } catch (error) {
    console.error("Error fetching order details:", error.message);
    res.status(500).json({ error: "Failed to retrieve order details" });
  }
};

// Lấy OrderDetail theo ID
exports.getOrderDetailById = async (req, res) => {
  const { id } = req.params;
  try {
    const orderDetail = await OrderDetails.getOrderDetailById(id);
    if (orderDetail) {
      res.status(200).json(orderDetail);
    } else {
      res.status(404).json({ error: "Order detail not found" });
    }
  } catch (error) {
    console.error("Error fetching order detail:", error.message);
    res.status(500).json({ error: "Failed to retrieve order detail" });
  }
};

exports.getOrderDetailsByOrderId = async (req, res) => {
  const { order_id } = req.params.order_id;
  try {
    const orderDetails = await OrderDetails.getOrderDetailsByOrderId(order_id);

    if (orderDetails.length > 0) {
      res.status(200).json(orderDetails);
    } else {
      res
        .status(404)
        .json({ error: "No order details found for this order ID" });
    }
  } catch (error) {
    console.error("Error fetching order details by order_id:", error.message);
    res.status(500).json({ error: "Failed to retrieve order details" });
  }
};

// Tạo một OrderDetail mới
exports.createOrderDetail = async (req, res) => {
  const { order_id, product_id, price, quantity, size, color } = req.body;
  if (!order_id || !product_id || !price || !quantity || !size || !color) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const newOrderDetail = {
      order_id,
      product_id,
      price,
      quantity,
      size,
      color,
    };
    const insertId = await OrderDetails.createOrderDetail(newOrderDetail);
    res.status(201).json({ message: "Order detail created", id: insertId });
  } catch (error) {
    console.error("Error creating order detail:", error.message);
    res.status(500).json({ error: "Failed to create order detail" });
  }
};

// Cập nhật OrderDetail theo ID
exports.updateOrderDetail = async (req, res) => {
  const { id } = req.params;
  const { order_id, product_id, price, quantity, size, color } = req.body;
  if (!order_id || !product_id || !price || !quantity || !size || !color) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const updated = await OrderDetails.updateOrderDetail(id, {
      order_id,
      product_id,
      price,
      quantity,
      size,
      color,
    });
    if (updated) {
      res.status(200).json({ message: "Order detail updated" });
    } else {
      res.status(404).json({ error: "Order detail not found" });
    }
  } catch (error) {
    console.error("Error updating order detail:", error.message);
    res.status(500).json({ error: "Failed to update order detail" });
  }
};

// Xóa OrderDetail theo ID
exports.deleteOrderDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await OrderDetails.deleteOrderDetail(id);
    if (deleted) {
      res.status(200).json({ message: "Order detail deleted" });
    } else {
      res.status(404).json({ error: "Order detail not found" });
    }
  } catch (error) {
    console.error("Error deleting order detail:", error.message);
    res.status(500).json({ error: "Failed to delete order detail" });
  }
};
