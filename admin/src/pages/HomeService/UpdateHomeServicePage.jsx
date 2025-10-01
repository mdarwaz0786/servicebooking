/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";

const UpdateHomeServicePage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

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

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apis.homeService.get}/${id}`, {
        headers: { Authorization: validToken },
      });
      if (response?.data?.success) {
        const data = response?.data?.data;
        setTitle(data?.title);
        const normalized = data?.services?.map((s) =>
          typeof s === "string" ? { _id: s } : s
        );
        setSelectedServices(normalized || []);
      };
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to fetch details");
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${apis.homeService.update}/${id}`,
        {
          title,
          services: selectedServices.map((s) => s._id),
        },
        {
          headers: { Authorization: validToken },
        }
      );

      if (response?.data?.success) {
        toast.success("Updated successfully");
        navigate(-1);
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update");
    };
  };

  const handleSelect = (id) => {
    const service = services?.find((s) => s?._id === id);
    if (service && !selectedServices.some((s) => s?._id === id)) {
      setSelectedServices([...selectedServices, service]);
      setSelectedValue("");
    };
  };

  const handleRemove = (id) => {
    setSelectedServices(selectedServices.filter((s) => s?._id !== id));
  };

  useEffect(() => {
    fetchServices();
    fetchData();
  }, []);

  return (
    <div className="page-wrapper page-settings">
      <div className="content">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Update Sevice</h5>
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
              value={selectedValue}
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

          {/* Selected services list */}
          <div className="mb-3">
            {selectedServices.map((s) => (
              <div
                key={s?._id}
                className="d-inline-flex align-items-center bg-light border rounded px-2 py-1 me-2 mb-2"
              >
                <span className="me-2">{s?.name || s?._id}</span>
                <button
                  type="button"
                  className="btn-close btn-sm"
                  aria-label="Remove"
                  onClick={() => handleRemove(s?._id)}
                />
              </div>
            ))}
          </div>

          <button type="submit" className="btn btn-primary">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateHomeServicePage;
