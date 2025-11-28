import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import apis from "../../apis/apis";
import { useAuth } from "../../context/auth.context";

const LocalityFormPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({
    cityId: "",
    name: "",
    latitude: "",
    longitude: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(apis.city.get, {
          headers: { Authorization: validToken },
        });
        if (res.data.success) {
          setCities(res.data.data || []);
        }
      } catch (error) {
        console.log(error)
        toast.error("Failed to load cities");
      }
    };
    fetchData();
  }, [validToken]);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${apis.locality.get}/${id}`, {
            headers: { Authorization: validToken },
          });

          if (res.data.success) {
            const d = res.data.data;
            setFormData({
              cityId: d.cityId?._id || "",
              name: d.name || "",
              latitude: d.latitude || "",
              longitude: d.longitude || "",
              description: d.description || "",
            });
          }
        } catch (err) {
          toast.error(err?.response?.data?.message || "Failed to fetch locality");
        }
      };
      fetchData();
    }
  }, [id, validToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.cityId) return toast.error("City is required");
    if (!formData.name.trim()) return toast.error("Locality name is required");

    try {
      setLoading(true);
      let res;

      const data = {
        cityId: formData.cityId,
        name: formData.name,
        latitude: formData.latitude || null,
        longitude: formData.longitude || null,
        description: formData.description,
      };

      if (id) {
        res = await axios.patch(`${apis.locality.update}/${id}`, data, {
          headers: { Authorization: validToken },
        });
      } else {
        res = await axios.post(apis.locality.create, data, {
          headers: { Authorization: validToken },
        });
      }

      if (res.data.success) {
        toast.success(`Locality ${id ? "updated" : "created"} successfully`);
        navigate(-1);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">{id ? "Update" : "Add"}</h5>
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
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      City <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      name="cityId"
                      value={formData.cityId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select City</option>
                      {cities.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      Locality Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Latitude</label>
                  <input
                    type="number"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    className="form-control"
                    step="0.000001"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Longitude</label>
                  <input
                    type="number"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    className="form-control"
                    step="0.000001"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="text-end">
                <button
                  type="reset"
                  className="btn btn-secondary me-2"
                  onClick={() =>
                    setFormData({
                      cityId: "",
                      name: "",
                      latitude: "",
                      longitude: "",
                      description: "",
                    })
                  }
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary" disabled={loading}>
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

export default LocalityFormPage;
