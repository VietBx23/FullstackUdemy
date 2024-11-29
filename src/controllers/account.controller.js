const Account = require("../models/account.model");

exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.findAll();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAccountById = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) return res.status(404).json({ message: "Account not found" });
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createAccount = async (req, res) => {
  try {
    const accountId = await Account.create(req.body);
    res.status(201).json({ id: accountId, message: "Account created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAccount = async (req, res) => {
  try {
    await Account.update(req.params.id, req.body);
    res.status(200).json({ message: "Account updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    await Account.delete(req.params.id);
    res.status(200).json({ message: "Account deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
