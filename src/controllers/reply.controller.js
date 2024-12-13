const Reply = require("../models/reply.model");
class ReplyController {
  static async getAllReplies(req, res) {
    try {
      const replys = await Reply.findAll();
      res.status(200).json(replys);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching replies", error: error.message });
    }
  }
  static async getReplyById(req, res) {
    const { id } = req.params;
    try {
      const reply = await Reply.findById(id);
      if (!reply) {
        return res.status(404).json({ message: "Reply not found" });
      }
      res.status(200).json(reply);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching reply", error: error.message });
    }
  }
  static async getReplyByProductIdAndCommentId(req, res) {
    const { productId, commentId } = req.params;
    try {
      const reply = await Reply.getReplysByProductIdAndCommentId(
        productId,
        commentId
      );
      if (!reply || reply.length == 0) {
        return res.status(404).json({ message: "Reply not found" });
      }
      res.status(200).json(reply);
    } catch (error) {
      console.error("Error fetching reply", error.message);
      res.status(500).json({ mesage: "Internal server error" });
    }
  }

  static async createNewReply(req, res) {
    const { description, product_id, comment_id, username } = req.body;
    if (!description || !product_id || !comment_id || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }
    try {
      const reply = await Reply.createReply({
        description,
        product_id,
        comment_id,
        username,
      });
      res.status(201).json({ message: "reply created", id: reply });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating reply", error: error.message });
    }
  }
  static async updateReply(req, res) {
    const id = req.params.id; // Truyền đúng id từ req.params
    const { description, product_id, comment_id, username } = req.body;

    // Kiểm tra các trường dữ liệu
    if (
      typeof description !== "string" ||
      !description.trim() ||
      !product_id ||
      !comment_id ||
      !username
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required and valid" });
    }

    try {
      const reply = await Reply.updateReply(id, {
        description,
        product_id,
        comment_id,
        username,
      });

      if (reply === 0) {
        return res.status(404).json({ message: "Reply not found" });
      }
      res.status(200).json({ message: "Reply updated successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating reply", error: error.message });
    }
  }

  static async deleteReply(req, res) {
    const { id } = req.params;
    try {
      const reply = await Reply.deleteReply(id);
      if (reply === 0) {
        return res.status(400).json({ mesage: "reply not found" });
      }
      res.status(200).json({ message: "reply deleted" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting reply", error: error.message });
    }
  }
}

module.exports = ReplyController;
