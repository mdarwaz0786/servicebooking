import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast } from "react-toastify";
import apis, { BASE_URL } from "../../apis/apis";
import { useAuth } from "../../context/auth.context";

const SupportFormPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [ticketStatus, setTicketStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    userType: "",
    mobile: "",
    subject: "",
    priority: "",
    description: "",
    reply: "",
    scheduleTicket: "",
  });

  const [preview, setPreview] = useState(null);
  const [replyImage, setReplyImage] = useState(null);
  const [replyPreview, setReplyPreview] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${apis.supportTicket.get}/${id}`, {
            headers: { Authorization: validToken },
          });

          if (res.data.success) {
            const d = res.data.data;

            setFormData({
              name: d.name || "",
              userType: d.userType || "",
              mobile: d.mobile || "",
              subject: d.subject || "",
              priority: d.priority || "",
              description: d.description || "",
              reply: d.reply || "",
              scheduleTicket: d.scheduleTicket || "",
            });

            if (d?.image) setPreview(`${BASE_URL}/${d.image}`);
            if (d?.replyImage) setReplyPreview(`${BASE_URL}/${d.replyImage}`);
          }
        } catch (err) {
          toast.error(err?.response?.data?.message || "Failed to fetch data");
        }
      };

      fetchData();
    }
  }, [id, validToken]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const onDropReplyImage = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setReplyImage(file);
      setReplyPreview(URL.createObjectURL(file));
    }
  }, []);

  const replyDrop = useDropzone({
    onDrop: onDropReplyImage,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    if (replyImage) data.append("replyImage", replyImage);
    if (ticketStatus) data.append("ticketStatus", ticketStatus);
    if (formData.scheduleTicket) data.append("scheduleTicket", formData.scheduleTicket);
    if (formData.reply) data.append("reply", formData.reply);

    try {
      setLoading(true);
      let res;

      if (id) {
        res = await axios.patch(`${apis.supportTicket.update}/${id}`, data, {
          headers: { Authorization: validToken, "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await axios.post(apis.supportTicket.create, data, {
          headers: { Authorization: validToken, "Content-Type": "multipart/form-data" },
        });
      }

      if (res.data.success) {
        toast.success(`${id ? "updated" : "created"} successfully`);
        navigate(-1);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (preview && !id) URL.revokeObjectURL(preview);
      if (replyPreview && !id) URL.revokeObjectURL(replyPreview);
    };
  }, [preview, replyPreview, id]);

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">{id ? "Update" : "Add"}</h5>
            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => navigate(-1)}>
              ← Back
            </button>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* Name */}
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    Name
                  </label>
                  <input type="text" name="name" value={formData.name} className="form-control" readOnly />
                </div>

                {/* Subject */}
                <div className="col-md-4 mb-3">
                  <label className="form-label">Subject</label>
                  <input type="text" name="subject" value={formData.subject} className="form-control" readOnly />
                </div>

                {/* User Type */}
                <div className="col-md-4 mb-3">
                  <label className="form-label">User Type</label>
                  <select name="userType" value={formData.userType} className="form-select" readOnly>
                    <option value="">Select</option>
                    <option value="Customer">Customer</option>
                    <option value="Provider">Provider</option>
                  </select>
                </div>
              </div>

              <div className="row">
                {/* Mobile */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Mobile</label>
                  <input type="text" name="mobile" value={formData.mobile} readOnly
                    className="form-control" />
                </div>

                {/* Priority */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Priority</label>
                  <select name="priority" value={formData.priority} className="form-select" readOnly>
                    <option value="">Select</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea name="description" value={formData.description} readOnly className="form-control" rows="3"></textarea>
              </div>

              {/* Image */}
              <div className="mb-5">
                <label className="form-label">Image</label>
                {preview && (
                  <div className="mt-3 text-center">
                    <img src={preview} alt="Preview" style={{ maxWidth: "200px", borderRadius: "8px" }} />
                  </div>
                )}
              </div>

              <div className="row">
                <div className="col-md-6">
                  {/* Reply Image */}
                  {id && (
                    <div className="mb-3">
                      <label className="form-label">Attachment</label>
                      <div
                        {...replyDrop.getRootProps()}
                        className={`border text-center rounded ${replyDrop.isDragActive ? "bg-light" : ""}`}
                        style={{ cursor: "pointer", padding: "10px" }}
                      >
                        <input {...replyDrop.getInputProps()} />
                        {replyDrop.isDragActive ? (
                          <p>Drop Attachment...</p>
                        ) : (
                          <span className="text-center">Drag & Drop Attachment or <span className="text-primary">Browse</span></span>
                        )}
                      </div>

                      {replyPreview && (
                        <div className="mt-3 text-center">
                          <img src={replyPreview} alt="Reply Preview" style={{ maxWidth: "200px", borderRadius: "8px" }} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="col-md-6">
                  {id && (
                    <div className="mb-3">
                      <label className="form-label">Schedule Ticket</label>
                      <select
                        name="scheduleTicket"
                        value={formData.scheduleTicket}
                        onChange={handleChange}
                        className="form-select"
                      >
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Reply */}
              {id && (
                <div className="mb-3">
                  <label className="form-label">Reply</label>
                  <textarea
                    name="reply"
                    value={formData.reply}
                    onChange={handleChange}
                    className="form-control"
                    rows="4"
                  ></textarea>
                </div>
              )}

              {/* Buttons */}
              <div className="text-end mt-3">
                <button
                  type="submit"
                  className="btn btn-secondary me-2"
                  disabled={loading}
                  onClick={() => setTicketStatus("Completed")}
                >
                  Close Ticket
                </button>

                <button type="submit" className="btn btn-primary" disabled={loading} onClick={() => setTicketStatus("Active")}>
                  {loading ? (id ? "Updating..." : "Saving...") : id ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportFormPage;
