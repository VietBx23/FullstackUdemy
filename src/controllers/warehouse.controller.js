const Warehouse = require("../models/warehouse.model");

exports.getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.findAll();
    res.status(200).json(warehouses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getWarehouseById = async (req, res) => {
  const { id } = req.params;
  try {
    const warehouse = await Warehouse.findById(id);
    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }
    res.status(200).json(warehouse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getWarehouseBySizeColorProductId = async (req, res) => {
  const { size, color, product_id } = req.params; // Lấy tham số từ path

  try {
    const warehouses = await Warehouse.findBySizeColorProductId(
      size,
      color,
      product_id
    ); // Truy vấn theo size, color, và product_id
    if (warehouses.length === 0) {
      return res.status(404).json({ message: "Warehouse not found" });
    }
    res.status(200).json(warehouses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createWarehouse = async (req, res) => {
  const warehouseData = req.body;

  try {
    const warehouseId = await Warehouse.createWarehouse(warehouseData);
    res
      .status(201)
      .json({ id: warehouseId, message: "Warehouse created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateWarehouse = async (req, res) => {
  const { id } = req.params;
  const warehouseData = req.body;

  try {
    const affectedRows = await Warehouse.update(id, warehouseData);
    if (affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Warehouse not found or no changes made" });
    }
    res.status(200).json({ message: "Warehouse updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteWarehouse = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRows = await Warehouse.delete(id);
    if (deletedRows === 0) {
      return res.status(404).json({ message: "Warehouse not found" });
    }
    res.status(200).json({ message: "Warehouse deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
