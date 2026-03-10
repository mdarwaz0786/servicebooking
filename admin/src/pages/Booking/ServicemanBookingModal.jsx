/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, memo, useRef, useState } from "react";
import apis from "../../apis/apis";
import { useAuth } from "../../context/auth.context";
import { toast } from "react-toastify";
import Select from "react-select";

const ServicemanBookingModal = ({ booking, fetchBookings }) => {
  const { validToken } = useAuth();
  const [getAll, setGetAll] = useState(false);
  const [formData, setFormData] = useState({
    bookingId: "",
    userId: "",
    servicemanId: "",
    getAll: false,
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
      setFormData((prev) => ({
        ...prev,
        bookingId: booking._id,
        userId: booking.userId,
        servicemanId: "",
      }));
    }
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
            lat: !getAll ? booking?.address?.lat : undefined,
            long: !getAll ? booking?.address?.long : undefined,
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

  const providerOptions =
    serviceMen?.map((sm) => ({
      value: sm?._id,
      label: `${sm?.name} - ${sm?.servicemanId}`,
    })) || [];

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
                  onChange={(e) => {
                    const value = e.target.value === "true";
                    setGetAll(value);
                    setFormData((prev) => ({ ...prev, getAll: value }));
                  }}
                >
                  <option value="false">No (Zone Based)</option>
                  <option value="true">Yes (All Provider)</option>
                </select>
              </div>

              {/* Service Man */}
              <div className="col-md-6">
                <label className="form-label">Provider</label>
                <Select
                  options={providerOptions}
                  placeholder="Select Provider"
                  value={providerOptions.find(
                    (opt) => opt.value === formData.servicemanId
                  )}
                  onChange={(selected) =>
                    setFormData((prev) => ({
                      ...prev,
                      servicemanId: selected?.value || "",
                    }))
                  }
                  isClearable
                />
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
