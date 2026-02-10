import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import apis from "../../apis/apis";
import { useAuth } from "../../context/auth.context";

const CreateCashCollectedSubmitPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();

  const [providers, setProviders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    providerId: null,
    bookingId: null,
    amount: "",
  });

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await axios.get(apis.servicemanProfile.get, {
          headers: { Authorization: validToken },
        });

        if (res?.data?.success) {
          setProviders(res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchProviders();
  }, [validToken]);

  useEffect(() => {
    if (!formData.providerId) {
      setBookings([]);
      setFormData((prev) => ({ ...prev, bookingId: null }));
      return;
    };

    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          `${apis.booking.servicemanBooking}?servicemanId=${formData.providerId.value}`,
          {
            headers: { Authorization: validToken },
          }
        );

        if (res?.data?.success) {
          setBookings(res?.data?.data);
        };
      } catch (err) {
        console.log(err);
      };
    };

    fetchBookings();
  }, [formData.providerId, validToken]);

  useEffect(() => {
    if (!formData.bookingId) {
      setFormData((prev) => ({ ...prev, amount: "" }));
      return;
    };

    const fetchBooking = async () => {
      try {
        const res = await axios.get(
          `${apis.booking.get}/${formData.bookingId.value}`,
          {
            headers: { Authorization: validToken },
          }
        );

        if (res?.data?.success) {
          const data = res?.data?.data;

          console.log("booking", data)
          setFormData((prev) => ({
            ...prev, amount: data?.booking?.cashColletedPendingAmount,
          }));
        };
      } catch (err) {
        console.log(err);
      };
    };

    fetchBooking();
  }, [formData.bookingId, validToken]);

  const providerOptions = providers?.map((p) => ({
    value: p?._id,
    label: `${p?.name} ${p?.mobile}`,
  }));

  const bookingOptions = bookings?.map((b) => ({
    value: b?.bookingId,
    label: b?.bookingCode,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const providerId = formData.providerId?.value;
    const bookingId = formData.bookingId?.value;
    const { amount } = formData;

    if (!providerId) return toast.error("Provider is required");
    if (!bookingId) return toast.error("Booking is required");

    try {
      setLoading(true);

      const res = await axios.post(
        apis.cashCollectedSubmit.create,
        {
          providerId,
          bookingId,
          amount,
        },
        {
          headers: { Authorization: validToken },
        }
      );

      if (res.data.success) {
        toast.success("Cash submitted successfully");
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
          <div className="card-header d-flex justify-content-between">
            <h5 className="mb-0">Cash Collection Submit</h5>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">

                {/* Provider */}
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    Provider <span className="text-danger">*</span>
                  </label>
                  <Select
                    options={providerOptions}
                    value={formData.providerId}
                    onChange={(selected) =>
                      setFormData({
                        providerId: selected,
                        bookingId: null,
                        amount: formData.amount,
                      })
                    }
                    placeholder="Select Provider"
                    isClearable
                  />
                </div>

                {/* Booking */}
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    Booking <span className="text-danger">*</span>
                  </label>
                  <Select
                    options={bookingOptions}
                    value={formData.bookingId}
                    onChange={(selected) =>
                      setFormData({ ...formData, bookingId: selected })
                    }
                    placeholder="Select Booking"
                    isDisabled={!formData.providerId}
                    isClearable
                  />
                </div>

                {/* Amount */}
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    Amount <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.amount}
                    disabled={formData.amount}
                  />
                </div>
              </div>

              <div className="text-end mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Cash"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCashCollectedSubmitPage;
