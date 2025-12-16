/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";
import SelectMultipleService from "../../components/Form/SelectMultipleService";

const UpdateHomeServicePage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const fetchServices = async () => {
    try {
      const response = await axios.get(apis.service.get, {
        headers: { Authorization: validToken },
      });

      if (response?.data?.success) {
        setServices(response.data.data || []);
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to fetch services");
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apis.homeService.get}/${id}`, {
        headers: { Authorization: validToken },
      });

      if (response?.data?.success) {
        const data = response.data.data;

        setTitle(data?.title || "");
        const normalized = data?.services?.map((s) =>
          typeof s === "string" ? s : s?._id
        );

        setSelectedServices(normalized || []);
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to fetch details");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedServices.length === 0) {
      toast.error("Please select at least one service");
      return;
    }

    try {
      const response = await axios.patch(
        `${apis.homeService.update}/${id}`,
        {
          title,
          services: selectedServices,
        },
        {
          headers: { Authorization: validToken },
        }
      );

      if (response?.data?.success) {
        toast.success("Updated successfully");
        navigate(-1);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update");
    }
  };

  useEffect(() => {
    fetchServices();
    fetchData();
  }, []);

  return (
    <div className="page-wrapper page-settings">
      <div className="content">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Update Service</h5>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-3">
          {/* Title */}
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

          {/* Services */}
          <div className="mb-3">
            <label>Services</label>

            <SelectMultipleService
              optionsList={services}
              value={selectedServices}
              onChange={setSelectedServices}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateHomeServicePage;
