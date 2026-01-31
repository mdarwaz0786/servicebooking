import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import apis from "../../apis/apis";

const NotificationForm = () => {

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ---------------- FETCH USERS ---------------- */
  const fetchUsers = async () => {
    try {
      const res = await axios.get(apis.user.get);
      setUsers(res?.data?.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message) {
      return toast.error("Message is required");
    }

    if (!role && selectedUsers.length === 0) {
      return toast.error("Select role or users");
    }

    try {
      setLoading(true);

      const payload = {
        title,
        message,
      };

      if (role) payload.role = role;
      else payload.user = selectedUsers;

      await axios.post(apis.notification.send, payload);

      toast.success("Notification sent successfully");

      setTitle("");
      setMessage("");
      setRole("");
      setSelectedUsers([]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending notification");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="page-wrapper">
      <div className="container mt-4">
        <div className="card shadow p-4">
          <h4 className="mb-3">Send Notification</h4>

          <form onSubmit={handleSubmit}>

            {/* Title */}
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Optional"
              />
            </div>

            {/* Message */}
            <div className="mb-3">
              <label className="form-label">Message *</label>
              <textarea
                className="form-control"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            {/* Role Select */}
            <div className="mb-3">
              <label className="form-label">Send To Role</label>
              <select
                className="form-select"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  setSelectedUsers([]);
                }}
              >
                <option value="">-- Select Role --</option>
                <option value="user">User</option>
                <option value="serviceman">Serviceman</option>
                <option value="provider">Provider</option>
                <option value="admin">Admin</option>
                <option value="subadmin">Sub Admin</option>
              </select>
            </div>

            {/* User Multi Select */}
            <div className="mb-3">
              <label className="form-label">Or Select Users</label>
              <select
                multiple
                className="form-select"
                value={selectedUsers}
                onChange={(e) =>
                  setSelectedUsers(
                    Array.from(e.target.selectedOptions, opt => opt.value)
                  )
                }
              >
                {users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name} ({u.role})
                  </option>
                ))}
              </select>
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
