import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";
import SelectMultipleService from "../../components/Form/SelectMultipleService";

const UpdateServiceIncludedPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [mainTitle, setMainTitle] = useState("");
  const [titles, setTitles] = useState([""]);
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
        console.log(error.message)
      };
    };
    fetchServices();
  }, [validToken]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${apis.serviceIncluded.get}/${id}`, {
          headers: { Authorization: validToken },
        });
        if (res?.data?.success && res?.data?.data) {
          const data = res?.data?.data;
          setMainTitle(data?.mainTitle || "");
          setTitles(data?.titles?.length ? data.titles : [""]);
          setSelectedServices(data?.services?.map((s) => s?._id) || []);
        };
      } catch (error) {
        console.log(error.message);
      };
    };
    fetchData();
  }, [id, validToken]);

  const handleTitleChange = (index, value) => {
    const updated = [...titles];
    updated[index] = value;
    setTitles(updated);
  };

  const addTitleField = () => setTitles([...titles, ""]);

  const removeTitleField = (index) => {
    if (titles?.length === 1) return;
    setTitles(titles?.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mainTitle.trim()) return toast.error("Main title is required");
    if (selectedServices?.length === 0) return toast.error("Select at least one service");

    try {
      setLoading(true);

      const payload = {
        mainTitle,
        titles,
        services: selectedServices,
      };

      const res = await axios.patch(`${apis.serviceIncluded.update}/${id}`, payload, {
        headers: {
          Authorization: validToken,
        },
      });

      if (res?.data?.success) {
        toast.success("Updated successfully");
        navigate(-1);
      };
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    };
  };

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Update Service Included</h5>
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

              {/* Titles */}
              <div className="mb-3">
                <label className="form-label">Titles</label>
                {titles?.map((title, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <input
                      type="text"
                      className="form-control me-2"
                      placeholder="Enter title"
                      value={title}
                      onChange={(e) =>
                        handleTitleChange(index, e.target.value)
                      }
                    />
                    <button
                      type="button"
                      className="btn btn-danger me-1"
                      onClick={() => removeTitleField(index)}
                      disabled={titles?.length === 1}
                    >
                      -
                    </button>
                    {index === titles?.length - 1 && (
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={addTitleField}
                      >
                        +
                      </button>
                    )}
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

export default UpdateServiceIncludedPage;
