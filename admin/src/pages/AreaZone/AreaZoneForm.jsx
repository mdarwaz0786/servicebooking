import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import apis from "../../apis/apis";
import { useAuth } from "../../context/auth.context";
import MultiSelect from "../../components/Form/MultiSelect";

const AreaZoneFormPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [localities, setLocalities] = useState([]);

  const [formData, setFormData] = useState({
    localityIds: [],
    name: "",
    radius: "",
    latitude: "",
    longitude: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(apis.locality.get, {
          headers: { Authorization: validToken },
        });
        if (res.data.success) {
          setLocalities(res.data.data);
        }
      } catch (err) {
        console.log(err)
        toast.error("Failed to load localities");
      }
    };
    fetchData();
  }, [validToken]);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${apis.areaZone.get}/${id}`, {
            headers: { Authorization: validToken },
          });

          if (res.data.success) {
            setFormData({
              localityIds: res.data.data.localityIds.map((l) => l._id) || [],
              name: res.data.data.name || "",
              radius: res.data.data.radius || "",
              latitude: res.data.data.latitude || "",
              longitude: res.data.data.longitude || "",
              description: res.data.data.description || "",
            });
          }
        } catch (err) {
          console.log(err)
          toast.error("Failed to fetch area zone");
        }
      };
      fetchData();
    }
  }, [id, validToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLocalityChange = (selectedIds) => {
    setFormData({ ...formData, localityIds: selectedIds });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }

    const data = {
      localityIds: formData.localityIds,
      name: formData.name,
      radius: formData.radius,
      latitude: formData.latitude,
      longitude: formData.longitude,
      description: formData.description,
    };

    try {
      setLoading(true);
      let res;

      if (id) {
        res = await axios.patch(`${apis.areaZone.update}/${id}`, data, {
          headers: { Authorization: validToken },
        });
      } else {
        res = await axios.post(apis.areaZone.create, data, {
          headers: { Authorization: validToken },
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
                {/* Lacalities */}
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label">
                      Localities <span style={{ color: "red" }}>*</span>
                    </label>
                    <MultiSelect
                      optionsList={localities}
                      value={formData.localityIds}
                      onChange={handleLocalityChange}
                      placeholder="Select Localities"
                      labelKey="name"
                      valueKey="_id"
                    />
                  </div>
                </div>

                {/* Name */}
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      Name <span style={{ color: "red" }}>*</span>
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

                {/* Radius */}
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Radius (km)</label>
                    <input
                      type="text"
                      name="radius"
                      value={formData.radius}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Latitude */}
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Latitude</label>
                    <input
                      type="number"
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Longitude */}
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Longitude</label>
                    <input
                      type="number"
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="form-control"
                      rows={3}
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="text-end">
                <button
                  type="reset"
                  className="btn btn-secondary me-2"
                  onClick={() =>
                    setFormData({
                      localityIds: [],
                      name: "",
                      radius: "",
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

export default AreaZoneFormPage;
