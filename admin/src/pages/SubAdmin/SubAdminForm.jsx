/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import apis from "../../apis/apis";
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
    profileImage: "",
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
      setRoles(res.data.data || []);
    } catch (err) {
      console.error(err);
    };
  };

  const fetchCities = async () => {
    try {
      const res = await axios.get(apis.city.get, {
        headers: { Authorization: validToken },
      });
      setCities(res?.data?.data || []);
    } catch (err) {
      console.error(err);
    };
  };

  const fetchSubAdmin = async () => {
    try {
      const res = await axios.get(`${apis.subadmin.get}/${id}`, {
        headers: { Authorization: validToken },
      });

      const d = res?.data?.data;

      setFormData({
        name: d.name || "",
        email: d.email || "",
        mobile: d.mobile || "",
        username: d.username || "",
        password: "",
        profileImage: d.profileImage || "",
        dob: d.dob || "",
        address: d.address || "",
        cityName: d.cityName?._id || "",
        stateName: d.stateName || "",
        pinCode: d.pinCode || "",
        permissions: d.permissions?._id || "",
      });
    } catch (err) {
      console.log(err);
      toast.error("Failed to load subadmin");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (!isEdit && !formData.password) {
        return toast.error("Password is required");
      }

      if (isEdit) {
        await axios.put(
          `${apis.subadmin.update}/${id}`,
          formData,
          { headers: { Authorization: validToken } }
        );
        toast.success("SubAdmin updated");
      } else {
        await axios.post(
          apis.subadmin.create,
          formData,
          { headers: { Authorization: validToken } }
        );
        toast.success("SubAdmin created");
      }

      navigate("/admins");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="d-flex justify-content-between align-items-center p-2">
        <h5>{isEdit ? "Update SubAdmin" : "Create SubAdmin"}</h5>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => navigate(-1)}
        >
          ← Back
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

                <div className="col-md-6 mb-3">
                  <label>Profile Image URL</label>
                  <input
                    name="profileImage"
                    value={formData.profileImage}
                    onChange={handleChange}
                    className="form-control"
                  />
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
                    name="permissions"
                    value={formData.cityName}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select City</option>
                    {cities?.map((r) => (
                      <option key={r?._id} value={r?._id}>
                        {r?.name}
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
                  <label>Role Permission</label>
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
                    ? "Update SubAdmin"
                    : "Create SubAdmin"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubAdminForm;
