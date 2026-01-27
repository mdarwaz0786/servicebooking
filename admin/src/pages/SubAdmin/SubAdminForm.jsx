/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import apis, { BASE_URL } from "../../apis/apis";
import { useAuth } from "../../context/auth.context";

const SubAdminForm = () => {
  const { validToken } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = Boolean(id);

  const [roles, setRoles] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    username: "",
    password: "",
    profileImage: null,
    profilePreview: "",
    dob: "",
    address: "",
    cityName: "",
    stateName: "",
    pinCode: "",
    permissions: "",
  });

  useEffect(() => {
    fetchRoles();
    fetchCities();
    if (isEdit) fetchSubAdmin();
  }, [id]);

  const fetchRoles = async () => {
    try {
      const res = await axios.get(apis.role.get, {
        headers: { Authorization: validToken },
      });
      setRoles(res?.data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCities = async () => {
    try {
      const res = await axios.get(apis.city.get, {
        headers: { Authorization: validToken },
      });
      setCities(res?.data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSubAdmin = async () => {
    try {
      const res = await axios.get(`${apis.subadmin.get}/${id}`, {
        headers: { Authorization: validToken },
      });

      const d = res.data.data;

      setFormData({
        name: d.name || "",
        email: d.email || "",
        mobile: d.mobile || "",
        username: d.username || "",
        password: "",
        profileImage: null,
        profilePreview: d?.profileImage ? `${BASE_URL}/${d?.profileImage}` : "",
        dob: d.dob || "",
        address: d.address || "",
        cityName: d.cityName?._id || "",
        stateName: d.stateName || "",
        pinCode: d.pinCode || "",
        permissions: d.permissions?._id || "",
      });

    } catch {
      toast.error("Failed to load subadmin");
    };
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({
      ...formData,
      profileImage: file,
      profilePreview: URL.createObjectURL(file),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (!formData.name.trim()) {
        return toast.error("Name is required");
      };

      if (!formData.mobile.trim()) {
        return toast.error("Mobile is required");
      };

      if (!formData.username.trim()) {
        return toast.error("Username is required");
      };

      if (!formData.password.trim() && !isEdit) {
        return toast.error("Password is required");
      };

      if (!formData.permissions) {
        return toast.error("Role is required");
      };

      setLoading(true);

      const fd = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "profileImage" && formData[key]) {
          fd.append("image", formData[key]);
        }
        else if (key !== "profilePreview" && key !== "profileImage") {
          fd.append(key, formData[key]);
        }
      });

      if (isEdit) {
        await axios.patch(`${apis.subadmin.update}/${id}`, fd, {
          headers: {
            Authorization: validToken,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("SubAdmin updated");
      } else {
        await axios.post(apis.subadmin.create, fd, {
          headers: {
            Authorization: validToken,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("SubAdmin created");
      }

      navigate("/admins");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="d-flex justify-content-between p-2">
        <h5>{isEdit ? "Update User" : "Create User"}</h5>
        <button className="btn btn-sm btn-secondary" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>

      <div className="container">
        <div className="card shadow">
          <div className="card-body">

            <form onSubmit={handleSubmit}>
              <div className="row">

                <div className="col-md-6 mb-3">
                  <label>Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Email</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Mobile</label>
                  <input
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* IMAGE */}
                <div className="col-md-6 mb-3">
                  <label>Profile Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="form-control"
                  />

                  {formData.profilePreview && (
                    <img
                      src={formData.profilePreview}
                      alt="preview"
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        marginTop: 10,
                      }}
                    />
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label>DOB</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Address</label>
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>State</label>
                  <input
                    name="stateName"
                    value={formData.stateName}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>City</label>
                  <select
                    name="cityName"
                    value={formData.cityName}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select City</option>
                    {cities?.map((c) => (
                      <option key={c?._id} value={c?._id}>
                        {c?.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label>Pin Code</label>
                  <input
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Role</label>
                  <select
                    name="permissions"
                    value={formData.permissions}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select Role</option>
                    {roles?.map((r) => (
                      <option key={r?._id} value={r?._id}>
                        {r?.roleName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label>Username</label>
                  <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {!isEdit && (
                  <div className="col-md-6 mb-3">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                )}

              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading
                  ? "Saving..."
                  : isEdit
                    ? "Update User"
                    : "Create User"}
              </button>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SubAdminForm;
