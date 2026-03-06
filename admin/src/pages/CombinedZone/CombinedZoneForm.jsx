import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";
import apis from "../../apis/apis";
import { useAuth } from "../../context/auth.context";

const CombinedZoneFormPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [zones, setZones] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    zones: []
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const res = await axios.get(apis.zone.get, {
          headers: { Authorization: validToken }
        });

        if (res.data.success) {
          setZones(res.data.data || []);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchZones();
  }, [validToken]);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${apis.combinedZone.get}/${id}`, {
            headers: { Authorization: validToken }
          });

          if (res.data.success) {
            setFormData({
              name: res.data.data.name || "",
              zones: res.data.data.zones?.map((z) => z._id) || []
            });
          }
        } catch (err) {
          toast.error(err?.response?.data?.message || "Failed to fetch data");
        }
      };

      fetchData();
    }
  }, [id, validToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!formData.zones.length) {
      toast.error("Select at least one zone");
      return;
    }

    const data = {
      name: formData.name,
      zones: formData.zones
    };

    try {
      setLoading(true);

      let res;

      if (id) {
        res = await axios.patch(`${apis.combinedZone.update}/${id}`, data, {
          headers: { Authorization: validToken }
        });
      } else {
        res = await axios.post(apis.combinedZone.create, data, {
          headers: { Authorization: validToken }
        });
      }

      if (res.data.success) {
        toast.success(`Combined zone ${id ? "updated" : "created"} successfully`);
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
            <h5 className="mb-0">{id ? "Update Combined Zone" : "Add Combined Zone"}</h5>
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

                {/* NAME */}
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

                {/* ZONES */}
                {/* ZONES */}
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      Select Zones <span style={{ color: "red" }}>*</span>
                    </label>

                    <Select
                      isMulti
                      options={zones.map((zone) => ({
                        value: zone._id,
                        label: zone.name,
                      }))}
                      value={zones
                        .filter((zone) => formData.zones.includes(zone._id))
                        .map((zone) => ({
                          value: zone._id,
                          label: zone.name,
                        }))}
                      onChange={(selected) =>
                        setFormData({
                          ...formData,
                          zones: selected ? selected.map((z) => z.value) : [],
                        })
                      }
                      placeholder="Select Zones..."
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                  </div>
                </div>

              </div>

              <div className="text-end">
                <button
                  type="reset"
                  className="btn btn-secondary me-2"
                  onClick={() => setFormData({ name: "", zones: [] })}
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading
                    ? id
                      ? "Updating..."
                      : "Saving..."
                    : id
                      ? "Update"
                      : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedZoneFormPage;