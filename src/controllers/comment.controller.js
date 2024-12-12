const Comment = require("../models/comment.model");

class CommentController {
  // Lấy tất cả bình luận
  static async getAllComments(req, res) {
    try {
      const comments = await Comment.findAll();
      res.status(200).json(comments);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching comments", error: error.message });
    }
  }

  // Lấy bình luận theo ID
  static async getCommentById(req, res) {
    const { id } = req.params;
    try {
      const comment = await Comment.findById(id);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      res.status(200).json(comment);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching comment", error: error.message });
    }
  }

  // Lấy bình luận theo ID sản phẩm
  static async getCommentsByProductId(req, res) {
    const { product_id } = req.params;
    try {
      const comments = await Comment.getCommentsByProductId(product_id);
      if (!comments || comments.length === 0) {
        return res
          .status(404)
          .json({ message: "No comments found for this product" });
      }
      res.status(200).json(comments);
    } catch (error) {
      console.error("Error fetching comments by product ID:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Tạo bình luận mới
  static async createComment(req, res) {
    const { product_id, description, username, rating } = req.body;

    if (!product_id || !description || !username || rating == null) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const newCommentId = await Comment.createComment({
        product_id,
        description,
        username,
        rating,
      });
      res.status(201).json({ message: "Comment created", id: newCommentId });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating comment", error: error.message });
    }
  }

  // Cập nhật bình luận
  static async updateComment(req, res) {
    const { id } = req.params;
    const { product_id, description, username, rating } = req.body;

    if (!product_id || !description || !username || rating == null) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const rowsAffected = await Comment.update(id, {
        product_id,
        description,
        username,
        rating,
      });

      if (rowsAffected === 0) {
        return res.status(404).json({ message: "Comment not found" });
      }

      res.status(200).json({ message: "Comment updated" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating comment", error: error.message });
    }
  }

  // Xóa bình luận
  static async deleteComment(req, res) {
    const { id } = req.params;
    try {
      const rowsAffected = await Comment.delete(id);

      if (rowsAffected === 0) {
        return res.status(404).json({ message: "Comment not found" });
      }

      res.status(200).json({ message: "Comment deleted" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting comment", error: error.message });
    }
  }
}

module.exports = CommentController;
