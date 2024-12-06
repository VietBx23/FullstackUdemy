const Contact = require("../models/contact.model");

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAllContact();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(400).json({ message: "Contact not found" });
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.createContact = async (req, res) => {
  try {
    const cotactId = await Contact.createContact(req.body);
    res
      .status(201)
      .json({ message: "Contact created successfully", id: cotactId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateContact = async (req, res) => {
  try {
    await Contact.updateContact(req.params.id, req.body);
    res.status(200).json({ message: "Contact Updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteContact = async (req, res) => {
  try {
    await Contact.deleteContact(req.params.id);
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
