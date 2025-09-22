import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import apis from "../../apis/apis";

const AddEarningPage = () => {
  const { validToken, user } = useAuth();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    categoryId: "",
    earningHour1: "",
    earningPrice1: "",
    earningHour2: "",
    earningPrice2: "",
    earningHour3: "",
    earningPrice3: "",
    earningHour4: "",
    earningPrice4: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(apis.category.get, {
          headers: { Authorization: validToken },
        });
        if (res?.data?.success) setCategories(res?.data?.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load categories");
      };
    };
    fetchCategories();
  }, [validToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      categoryId: "",
      earningHour1: "",
      earningPrice1: "",
      earningHour2: "",
      earningPrice2: "",
      earningHour3: "",
      earningPrice3: "",
      earningHour4: "",
      earningPrice4: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.categoryId) return toast.error("Category is required");
    if (!formData.earningHour1 || !formData.earningPrice1) return toast.error("At least first hour & price are required");

    try {
      setLoading(true);
      const data = { ...formData, createdBy: user?._id };
      const res = await axios.post(apis.earning.create, data, {
        headers: { Authorization: validToken },
      });
      if (res?.data?.success) {
        toast.success("Earning created successfully");
        resetForm();
      };
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    };
  };

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Add Earning</h5>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Category */}
              <div className="mb-3">
                <label className="form-label">
                  Category <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Hour & Price Fields */}
              {[1, 2, 3, 4].map((i) => (
                <div className="row mb-3" key={i}>
                  <div className="col">
                    <label className="form-label">Earning Hour {i}{i === 1 && <span style={{ color: "red" }}> *</span>}</label>
                    <input
                      type="number"
                      name={`earningHour${i}`}
                      value={formData[`earningHour${i}`]}
                      onChange={handleChange}
                      className="form-control"
                      required={i === 1}
                      min="0"
                    />
                  </div>
                  <div className="col">
                    <label className="form-label">Earning Price {i}{i === 1 && <span style={{ color: "red" }}> *</span>}</label>
                    <input
                      type="number"
                      name={`earningPrice${i}`}
                      value={formData[`earningPrice${i}`]}
                      onChange={handleChange}
                      className="form-control"
                      required={i === 1}
                      min="0"
                    />
                  </div>
                </div>
              ))}

              {/* Buttons */}
              <div className="text-end">
                <button
                  type="reset"
                  className="btn btn-secondary me-2"
                  onClick={resetForm}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEarningPage;
