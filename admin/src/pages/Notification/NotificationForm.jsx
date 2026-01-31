/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";
import apis from "../../apis/apis";
import { useAuth } from "../../context/auth.context";

const NotificationForm = () => {
  const { validToken } = useAuth();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ---------------- FETCH USERS ---------------- */
  const fetchUsers = async () => {
    try {
      const res = await axios.get(apis.user.get, {
        params: {
          role: role || undefined
        },
        headers: {
          Authorization: validToken,
        },
      });
      console.log(res?.data?.data)
      setUsers(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    };
  };

  useEffect(() => {
    fetchUsers();
  }, [role]);

  /* ---------------- FORMAT FOR REACT SELECT ---------------- */
  const userOptions = users.map((u) => ({
    value: u?._id,
    label: `${u?.name || u?.mobile} (${u?.role})`,
  }));

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message) return toast.error("Message is required");

    if (!role) {
      return toast.error("Role is required");
    };

    if (!role && selectedUsers.length === 0) {
      return toast.error("Select role or users");
    };

    try {
      setLoading(true);

      const payload = {
        title,
        message,
        role,
      };

      if (selectedUsers.length > 0) {
        payload.user = selectedUsers.map((u) => u?.value);
      };

      await axios.post(
        apis.notification.send,
        payload,
        {
          headers: {
            Authorization: validToken,
          }
        }
      );

      toast.success("Notification sent successfully");
      setTitle("");
      setMessage("");
      setRole("");
      setSelectedUsers([]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending notification");
    } finally {
      setLoading(false);
    };
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="page-wrapper">
      <div className="container mt-4">
        <div className="card shadow p-4">
          <h4 className="mb-3">Send Notification</h4>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                {/* Role */}
                <div className="mb-3">
                  <label className="form-label">Role <span className="text-danger">*</span></label>
                  <select
                    className="form-select"
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                      setSelectedUsers([]);
                    }}
                    required
                  >
                    <option value="">-- Select Role --</option>
                    <option value="user">User</option>
                    <option value="serviceman">Provider</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                {/* React Select Users */}
                <div className="mb-3">
                  <label className="form-label">User</label>
                  <Select
                    options={userOptions}
                    isMulti
                    value={selectedUsers}
                    onChange={(val) => {
                      setSelectedUsers(val || []);
                    }}
                    placeholder="Select User..."
                  />
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Title"
              />
            </div>

            {/* Message */}
            <div className="mb-3">
              <label className="form-label">Message <span className="text-danger">*</span></label>
              <textarea
                className="form-control"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter Message"
                required
              />
            </div>

            {/* Button */}
            <button
              disabled={loading}
              className="btn btn-primary w-100"
            >
              {loading ? "Sending..." : "Send Notification"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NotificationForm;
