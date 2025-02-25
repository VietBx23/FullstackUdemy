const Voucher = require("../models/voucher.model");

// Lấy tất cả discount products
exports.getAllVouchers = async (req, res) => {
  try {
    const vouchers = await Voucher.findAll();
    res.status(200).json(vouchers);
  } catch (error) {
    console.error("Error fetching  voucher:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Lấy discount product theo ID
exports.getVoucherById = async (req, res) => {
  const { id } = req.params;
  try {
    const voucher = await Voucher.findById(id);
    if (!voucher) {
      return res.status(404).json({ error: "Vouchers not found" });
    }
    res.status(200).json(voucher);
  } catch (error) {
    console.error("Error fetching Vouchers by ID:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Tạo mới discount product
exports.createvoucher = async (req, res) => {
  const { code, discount_amount, quantity, start_date, end_date, activate } =
    req.body;
  try {
    const newvoucherId = await Voucher.create({
      code,
      discount_amount,
      quantity,
      start_date,
      end_date,
      activate,
    });
    res.status(201).json({ id: newvoucherId });
  } catch (error) {
    console.error("Error creating voucher:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Cập nhật discount product
exports.updatevoucher = async (req, res) => {
  const { id } = req.params;
  const { code, discount_amount, quantity, start_date, end_date, activate } =
    req.body;
  try {
    const voucher = await Voucher.findById(id);
    if (!voucher) {
      return res.status(404).json({ error: "Discount product not found" });
    }
    await Voucher.update(id, {
      code,
      discount_amount,
      quantity,
      start_date,
      end_date,
      activate,
    });
    res.status(200).json({ message: "voucher updated successfully" });
  } catch (error) {
    console.error("Error updating voucher:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Xóa discount product
exports.deletevoucher = async (req, res) => {
  const { id } = req.params;
  try {
    const voucher = await Voucher.findById(id);
    if (!voucher) {
      return res.status(404).json({ error: "voucher not found" });
    }
    await Voucher.delete(id);
    res.status(200).json({ message: "voucher deleted successfully" });
  } catch (error) {
    console.error("Error deleting voucher:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
