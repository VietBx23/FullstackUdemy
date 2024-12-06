const createDatabaseConnection = require("../config/database");

class Contact {
  static async findAllContact() {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [row] = await connection.query("SELECT * FROM contacts ");
      return row;
    } catch (error) {
      console.error("Error in findAllContact", error.message);
      throw error;
    } finally {
      if (connection) await connection.end(); // close the connection
    }
  }
  static async findById(id) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [row] = await connection.query(
        "SELECT * FROM contacts WHERE id = ?",
        [id]
      );
      return row[0];
    } catch (error) {
      console.error("Error querying database: ", error.message);
      throw error;
    } finally {
      if (connection) await connection.end(); // close the connection
    }
  }

  static async createContact(contactData) {
    const { fullname, email, phone, message, create_date } = contactData;
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [result] = await connection.query(
        "INSERT INTO contacts(fullname, email, phone, message, create_date) VALUES (?, ?, ?, ?, ?)",
        [fullname, email, phone, message, create_date]
      );
      return result.insertId;
    } catch (error) {
      console.error("Error in createContact", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }

  static async updateContact(id, contactData) {
    const { fullname, email, phone, message } = contactData;
    let connection;
    try {
      connection = await createDatabaseConnection();
      await connection.query(
        "UPDATE contacts SET fullname = ?, email = ?, phone = ?, message = ? WHERE id = ?",
        [fullname, email, phone, message, id]
      );
    } catch (error) {
      console.error("Error updating contact: ", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }
  static async deleteContact(id) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      await connection.query("DELETE FROM contacts WHERE id = ?", [id]);
    } catch (error) {
      console.error("Error deleting contact: ", error.message);
    } finally {
      if (connection) await connection.end(); // close the connection
    }
  }
}
module.exports = Contact;
