/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";

const AppInfoFormPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    serviceman: {
      android: "",
      ios: "",
    },
    user: {
      android: "",
      ios: "",
    },
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(apis.app.get, {
          headers: { Authorization: validToken },
        });

        if (res?.data?.data) {
          setFormData({
            serviceman: {
              android: res?.data?.data?.serviceman?.android || "",
              ios: res?.data?.data?.serviceman?.ios || "",
            },
            user: {
              android: res?.data?.data?.user?.android || "",
              ios: res?.data?.data?.user?.ios || "",
            },
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load app settings");
      }
    };

    fetchSettings();
  }, []);

  const handleNestedChange = (section, platform, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [platform]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      await axios.post(apis.app.create, formData, {
        headers: { Authorization: validToken },
      });

      toast.success("App info saved successfully");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card shadow-sm">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">App Info</h5>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => navigate("/")}
            >
              ← Back
            </button>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <h6 className="mb-3">Serviceman App Version</h6>
              <div className="row mb-4">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Android Version</label>
                  <input
                    className="form-control"
                    placeholder="e.g. 1.0.5"
                    value={formData.serviceman.android}
                    onChange={(e) =>
                      handleNestedChange("serviceman", "android", e.target.value)
                    }
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">iOS Version</label>
                  <input
                    className="form-control"
                    placeholder="e.g. 1.0.5"
                    value={formData.serviceman.ios}
                    onChange={(e) =>
                      handleNestedChange("serviceman", "ios", e.target.value)
                    }
                  />
                </div>
              </div>

              <h6 className="mb-3">User App Version</h6>
              <div className="row mb-4">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Android Version</label>
                  <input
                    className="form-control"
                    placeholder="e.g. 1.0.5"
                    value={formData.user.android}
                    onChange={(e) =>
                      handleNestedChange("user", "android", e.target.value)
                    }
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">iOS Version</label>
                  <input
                    className="form-control"
                    placeholder="e.g. 1.0.5"
                    value={formData.user.ios}
                    onChange={(e) =>
                      handleNestedChange("user", "ios", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="text-end">
                <button
                  type="submit"
                  className="btn btn-primary px-4"
                  disabled={loading}
                >
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

export default AppInfoFormPage;
