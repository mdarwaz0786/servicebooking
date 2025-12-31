/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, memo, useRef, useState } from "react";
import apis from "../../apis/apis";
import { useAuth } from "../../context/auth.context";
import { toast } from "react-toastify";

const ServicemanBookingModal = ({ booking, fetchBookings }) => {
  const { validToken } = useAuth();
  const [getAll, setGetAll] = useState("false");
  const [formData, setFormData] = useState({
    bookingId: "",
    userId: "",
    servicemanId: "",
  });

  const modalRef = useRef(null);
  const modalInstance = useRef(null);

  useEffect(() => {
    if (window.bootstrap && modalRef.current && !modalInstance.current) {
      modalInstance.current = new window.bootstrap.Modal(modalRef.current);
    };
  }, []);

  useEffect(() => {
    if (modalRef.current) {
      const element = modalRef.current;
      const handleHidden = () => {
        setFormData((prev) => ({ ...prev, servicemanId: "" }));
        document.body.classList.remove("modal-open");
        document.querySelectorAll(".modal-backdrop").forEach((bd) => bd.remove());
      };
      element.addEventListener("hidden.bs.modal", handleHidden);
      return () => element.removeEventListener("hidden.bs.modal", handleHidden);
    };
  }, []);

  useEffect(() => {
    if (booking?._id && modalInstance.current) {
      modalInstance.current.show();
      setFormData({
        bookingId: booking?._id,
        userId: booking?.userId,
        servicemanId: "",
      });
    };
  }, [booking?._id]);

  const [serviceMen, setServiceMen] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchServiceMen = async () => {
      try {
        const res = await axios.get(apis.servicemanByZone.get, {
          headers: { Authorization: validToken },
          params: {
            all: getAll,
            lat: getAll === "false" ? booking?.address?.lat : undefined,
            long: getAll === "false" ? booking?.address?.long : undefined,
          },
        });

        if (res?.data?.success) {
          setServiceMen(res?.data?.data || []);
        }
      } catch (err) {
        console.log("Error while fetching servicemen:", err.message);
      }
    };

    if (booking?._id) fetchServiceMen();
  }, [
    booking?._id,
    booking?.address?.lat,
    booking?.address?.long,
    getAll,
    validToken,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(apis.servicemanBooking.create, formData, {
        headers: { Authorization: validToken },
      });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        fetchBookings();
      };
    } catch (error) {
      console.log(error.message);
      toast.error(error?.response?.data?.message || "Error while assigning");
    } finally {
      setLoading(false);
      modalInstance.current?.hide();
    };
  };

  return (
    <div
      className="modal fade"
      id="serviceManBookingModal"
      tabIndex="-1"
      aria-labelledby="serviceManBookingModalLabel"
      aria-hidden="true"
      ref={modalRef}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="serviceManBookingModalLabel">
              Assign To Provider
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit} className="row">
              {/* All or zone wise */}
              <div className="col-md-6">
                <label className="form-label">Get All Provider</label>
                <select
                  className="form-select"
                  value={getAll}
                  onChange={(e) => setGetAll(e.target.value)}
                >
                  <option value="false">No (Zone Based)</option>
                  <option value="true">Yes (All Provider)</option>
                </select>
              </div>

              {/* Service Man */}
              <div className="col-md-6">
                <label className="form-label">Provider</label>
                <select
                  name="servicemanId"
                  value={formData.servicemanId}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">-- Select Provider --</option>
                  {serviceMen?.map((sm) => (
                    <option key={sm?._id} value={sm?._id}>
                      {sm?.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-end mt-4">
                <button
                  type="submit"
                  className="btn btn-success"
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

export default memo(ServicemanBookingModal);
