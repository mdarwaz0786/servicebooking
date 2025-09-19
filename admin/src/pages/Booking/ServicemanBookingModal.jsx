import axios from "axios";
import { memo, useEffect, useRef, useState } from "react";
import apis from "../../apis/apis";
import { useAuth } from "../../context/auth.context";
import { toast } from "react-toastify";

const ServicemanBookingModal = ({ booking }) => {
  const { validToken } = useAuth();
  const [formData, setFormData] = useState({
    bookingId: "",
    userId: "",
    serviceManId: "",
  });

  const modalRef = useRef(null);
  const modalInstance = useRef(null);

  useEffect(() => {
    if (window.bootstrap && modalRef.current && !modalInstance.current) {
      modalInstance.current = new window.bootstrap.Modal(modalRef.current);
    }
  }, []);

  // show modal when booking changes
  useEffect(() => {
    if (booking?._id && modalInstance.current) {
      modalInstance.current.show();
      setFormData({
        bookingId: booking._id,
        userId: booking.userId,
        serviceManId: "",
      });
    }
  }, [booking?._id]);

  const [serviceMen, setServiceMen] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchServiceMen = async () => {
      try {
        const res = await axios.get(apis.servicemanProfile.get, {
          headers: { Authorization: validToken },
        });
        if (res?.data?.success) {
          setServiceMen(res?.data?.data || []);
        }
      } catch (err) {
        console.log("Error while fetching servicemen:", err.message);
      }
    };
    if (booking?._id) fetchServiceMen();
  }, [booking?._id, validToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(apis.servicemanBooking.create, formData, {
        headers: { Authorization: validToken },
      });
      toast.success("Assigned successfully");
      setFormData({ bookingId: "", serviceManId: "", userId: "" });

      modalInstance.current?.hide();
    } catch (error) {
      console.log(error.message);
      toast.error("Error while assigning");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="serviceManBookingModal"
      tabIndex="-1"
      aria-labelledby="serviceManBookingModalLabel"
      aria-hidden="true"
      ref={modalRef} // 👈 keep ref to modal DOM node
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="serviceManBookingModalLabel">
              Assign Serviceman
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit} className="row g-3">
              {/* Service Man */}
              <div className="col-md-6">
                <label className="form-label">Service Man</label>
                <select
                  name="serviceManId"
                  value={formData.serviceManId}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">-- Select Service Man --</option>
                  {serviceMen?.map((sm) => (
                    <option key={sm?._id} value={sm?._id}>
                      {sm?.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Booking"}
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
