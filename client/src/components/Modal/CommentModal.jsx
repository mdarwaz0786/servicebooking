import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const CommentModal = ({ fetchBlog, show, handleClose, contentId, contentType = "Blog" }) => {

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = storedUser?._id || null;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedCommentUser = JSON.parse(localStorage.getItem("commentUser") || "{}");

    if (savedCommentUser?.name || savedCommentUser?.email) {
      setFormData((prev) => ({
        ...prev,
        name: savedCommentUser?.name || "",
        email: savedCommentUser?.email || ""
      }));
    }
  }, [show]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...formData,
        userId,
        contentId,
        contentType
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_SERVER_BASE_URL}api/v1/user/comment/create`,
        payload
      );

      if (data?.success) {
        localStorage.setItem("commentUser",
          JSON.stringify({
            name: formData.name,
            email: formData.email
          })
        );

        toast.success("Comment submitted successfully");
        handleClose();

        setFormData((prev) => ({
          ...prev,
          comment: ""
        }));

        fetchBlog();
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Comment</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name <span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email <span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Comment <span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              name="comment"
              placeholder="Write your comment..."
              value={formData.comment}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CommentModal;