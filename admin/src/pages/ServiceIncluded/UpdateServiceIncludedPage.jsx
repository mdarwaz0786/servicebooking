/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";

const UpdateServiceIncludedPage = () => {
  const { validToken } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [mainTitle, setMainTitle] = useState("");
  const [titles, setTitles] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [Services, setServices] = useState([""]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${apis.serviceIncluded.get}/${id}`, {
        headers: { Authorization: validToken },
      });
      if (res?.data?.success) {
        setMainTitle(res.data.data.mainTitle || "");
        setTitles(res.data.data.titles.length > 0 ? res.data.data.titles : [""]);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const handleTitleChange = (index, value) => {
    const updated = [...titles];
    updated[index] = value;
    setTitles(updated);
  };

  const addTitleField = () => setTitles([...titles, ""]);
  const removeTitleField = (index) => setTitles(titles.filter((_, i) => i !== index));


  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(apis.service.get, {
          headers: { Authorization: validToken },
        });
        if (res?.data?.success) setServices(res?.data?.data || []);
      } catch (error) {
        console.log(error.message);
        toast.error("Failed to load services");
      };
    };
    fetchServices();
  }, [validToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mainTitle.trim()) {
      toast.error("Main title is required");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.patch(
        `${apis.serviceIncluded.update}/${id}`,
        { mainTitle, titles: titles.filter(t => t.trim() !== "") },
        { headers: { Authorization: validToken } }
      );
      if (res?.data?.success) {
        toast.success("Service included updated successfully");
        navigate(-1);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Update Service Included</h5>
            <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate(-1)}>
              ← Back
            </button>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Main Title */}
              <div className="mb-3">
                <label className="form-label">
                  Main Title <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={mainTitle}
                  onChange={(e) => setMainTitle(e.target.value)}
                  required
                />
              </div>

              

              {/* Titles */}
              <div className="mb-3">
                <label className="form-label">Titles</label>
                {titles.map((title, index) => (
                  <div key={index} className="d-flex mb-2">
                    <input
                      type="text"
                      className="form-control me-2"
                      value={title}
                      onChange={(e) => handleTitleChange(index, e.target.value)}
                    />
                    <button type="button" className="btn btn-danger me-1" onClick={() => removeTitleField(index)} disabled={titles.length === 1}>
                      -
                    </button>
                    {index === titles.length - 1 && (
                      <button type="button" className="btn btn-success" onClick={addTitleField}>
                        +
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-end">
                <button type="submit" className="btn btn-primary" disabled={loading}>
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
