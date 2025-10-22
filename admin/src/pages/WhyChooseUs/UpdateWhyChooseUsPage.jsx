import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";
import SelectMultipleService from "../../components/Form/SelectMultipleService";

const UpdateWhyChooseUsPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [mainTitle, setMainTitle] = useState("");
  const [reasons, setReasons] = useState([{ title: "", description: "" }]);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(apis.service.get, {
          headers: { Authorization: validToken },
        });
        if (res?.data?.success) setServices(res?.data?.data || []);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchServices();
  }, [validToken]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${apis.whyChooseUs.get}/${id}`, {
          headers: { Authorization: validToken },
        });
        if (res?.data?.success && res?.data?.data) {
          const data = res?.data?.data;
          setMainTitle(data?.mainTitle || "");
          setSelectedServices(data?.services?.map((s) => s?._id) || []);
          setReasons(
            data?.reasons?.length
              ? data?.reasons
              : [{ title: "", description: "" }]
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id, validToken]);

  const handleReasonChange = (index, field, value) => {
    const updated = [...reasons];
    updated[index][field] = value;
    setReasons(updated);
  };

  const addReasonField = () => setReasons([...reasons, { title: "", description: "" }]);

  const removeReasonField = (index) => {
    if (reasons.length === 1) return;
    setReasons(reasons.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mainTitle.trim()) return toast.error("Main title is required");
    if (selectedServices.length === 0) return toast.error("Select at least one service");
    if (reasons.some((r) => !r?.title?.trim() || !r?.description?.trim()))
      return toast.error("All reason titles and descriptions are required");

    try {
      setLoading(true);

      const payload = {
        mainTitle,
        services: selectedServices,
        reasons: reasons.map(r => ({
          title: r.title.trim(),
          description: r.description.trim(),
        })),
      };

      const res = await axios.patch(`${apis.whyChooseUs.update}/${id}`, payload, {
        headers: { Authorization: validToken },
      });

      if (res?.data?.success) {
        toast.success("Updated successfully");
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
            <h5 className="mb-0">Update Why Choose Us</h5>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Services */}
              <div className="mb-3">
                <label className="form-label">
                  Select Services <span className="text-danger">*</span>
                </label>
                <SelectMultipleService
                  optionsList={services}
                  value={selectedServices}
                  onChange={setSelectedServices}
                />
              </div>

              {/* Main Title */}
              <div className="mb-3">
                <label className="form-label">
                  Main Title <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={mainTitle}
                  onChange={(e) => setMainTitle(e.target.value)}
                />
              </div>

              {/* Reasons */}
              <div className="mb-3">
                <label className="form-label">Reasons</label>
                {reasons.map((reason, index) => (
                  <div key={index} className="mb-3 border p-3 rounded">
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Reason title"
                      value={reason?.title}
                      onChange={(e) =>
                        handleReasonChange(index, "title", e.target.value)
                      }
                    />
                    <textarea
                      className="form-control mb-2"
                      placeholder="Reason description"
                      value={reason?.description}
                      onChange={(e) =>
                        handleReasonChange(index, "description", e.target.value)
                      }
                    />
                    <div className="d-flex justify-content-end">
                      <button
                        type="button"
                        className="btn btn-danger btn-sm me-2"
                        onClick={() => removeReasonField(index)}
                        disabled={reasons.length === 1}
                      >
                        Remove
                      </button>
                      {index === reasons.length - 1 && (
                        <button
                          type="button"
                          className="btn btn-success btn-sm"
                          onClick={addReasonField}
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit */}
              <div className="text-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateWhyChooseUsPage;
