import CommentModel from "../../models/comment.model.js";

// Create comment
export const createComment = async (req, res) => {
  try {
    const { contentId, contentType, comment, parentId, userId } = req.body;

    if (!contentId) {
      return res.status(400).json({ message: "Content id is required" });
    };

    if (!comment) {
      return res.status(400).json({ message: "Comment is required" });
    };

    const now = new Date();

    const time = now.toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    const newComment = await CommentModel.create({
      userId: userId || req.user?._id,
      contentId,
      contentType,
      parentId,
      comment,
      time,
    });

    return res.status(201).json({
      success: true,
      message: "Comment created successfully",
      data: newComment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// Update comment
export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).json({ message: "Comment is required" });
    }

    const updatedComment = await CommentModel.findOneAndUpdate(
      { _id: id, userId: req.user?._id },
      { comment, updatedAt: new Date(), edited: true },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found or unauthorized",
      });
    }

    return res.json({
      success: true,
      message: "Comment updated successfully",
      data: updatedComment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Like/Dislike comment
export const toggleLikeComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const comment = await CommentModel.findById(id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found"
      });
    }

    const alreadyLiked = comment.likes.includes(userId);

    let updated;

    if (alreadyLiked) {
      // DISLIKE
      updated = await CommentModel.findByIdAndUpdate(
        id,
        { $pull: { likes: userId } },
        { new: true }
      );
    } else {
      // LIKE
      updated = await CommentModel.findByIdAndUpdate(
        id,
        { $addToSet: { likes: userId } },
        { new: true }
      );
    }

    return res.json({
      success: true,
      message: alreadyLiked ? "Disliked Successfully" : "Liked Successfully",
      liked: !alreadyLiked,
      totalLikes: updated.likes.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete comment
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await CommentModel.findOneAndDelete({
      _id: id,
      userId: req.user?._id,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Comment not found or unauthorized",
      });
    }

    return res.json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};