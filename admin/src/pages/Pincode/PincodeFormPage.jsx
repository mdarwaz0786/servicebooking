import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import apis from "../../apis/apis";
import { useAuth } from "../../context/auth.context";

const PincodeFormPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    placeName: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${apis.pincode.get}/${id}`, {
            headers: { Authorization: validToken },
          });

          if (res.data.success) {
            setFormData({
              placeName: res.data.data.placeName || "",
              pincode: res.data.data.pincoode || "",
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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.pincode) {
      toast.error("Pincode is required");
      return;
    }

    if (!formData.placeName) {
      toast.error("Place name is required");
      return;
    }

    const data = {
      placeName: formData.placeName,
      pincoode: Number(formData.pincode),
    };

    try {
      setLoading(true);
      let res;

      if (id) {
        res = await axios.patch(`${apis.pincode.update}/${id}`, data, {
          headers: { Authorization: validToken },
        });
      } else {
        res = await axios.post(apis.pincode.create, data, {
          headers: { Authorization: validToken },
        });
      }

      if (res.data.success) {
        toast.success(`Pincode ${id ? "updated" : "created"} successfully`);
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
            <h5 className="mb-0">{id ? "Update Pincode" : "Add Pincode"}</h5>
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
                    <label className="form-label">Place Name <span style={{ color: "red" }}>*</span></label>
                    <input
                      type="text"
                      name="placeName"
                      value={formData.placeName}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Place name"
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      Pincode <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="number"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="text-end">
                <button
                  type="reset"
                  className="btn btn-secondary me-2"
                  onClick={() =>
                    setFormData({ placeName: "", pincode: "" })
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
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

export default PincodeFormPage;
