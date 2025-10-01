/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";

const AddHomeServicePage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const fetchServices = async () => {
    try {
      const response = await axios.get(apis.service.get, {
        headers: { Authorization: validToken },
      });
      if (response?.data?.success) {
        setServices(response?.data?.data || []);
      };
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to fetch services");
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(apis.homeService.create, {
        title,
        services: selectedServices,
      }, {
        headers: { Authorization: validToken }
      });

      if (response?.data?.success) {
        toast.success("Created successfully");
        navigate(-1);
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create");
    };
  };

  const handleSelect = (id) => {
    const service = services?.find((s) => s?._id === id);
    if (service && !selectedServices?.some((s) => s?._id === id)) {
      setSelectedServices([...selectedServices, service]);
    };
  };

  const handleRemove = (id) => {
    setSelectedServices(selectedServices.filter((s) => s?._id !== id));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="page-wrapper page-settings">
      <div className="content">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Create Sevice</h5>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate(-1)}>← Back</button>
        </div>
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-3">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Service Selector */}
          <div className="mb-3">
            <label>Services</label>
            <select
              className="form-select"
              onChange={(e) => handleSelect(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                -- Select a service --
              </option>
              {services
                .filter((s) => !selectedServices.some((sel) => sel?._id === s?._id))
                .map((s) => (
                  <option key={s?._id} value={s?._id}>
                    {s?.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-3">
            {selectedServices.map((s) => (
              <div
                key={s?._id}
                className="d-inline-flex align-items-center bg-light border rounded px-2 py-1 me-2 mb-2"
              >
                <span className="me-2">{s?.name}</span>
                <button
                  type="button"
                  className="btn-close btn-sm"
                  aria-label="Remove"
                  onClick={() => handleRemove(s?._id)}
                />
              </div>
            ))}
          </div>

          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
  );
};

export default AddHomeServicePage;
