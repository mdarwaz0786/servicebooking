/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import apis from "../../apis/apis";

const AddBankTransferPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    servicemanId: "",
    transactionId: "",
    fromDate: "",
    toDate: "",
    amount: 0,
  });

  const [servicemen, setServicemen] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ---------------- Load Servicemen ---------------- */
  useEffect(() => {
    const fetchServicemen = async () => {
      try {
        const res = await axios.get(
          apis.servicemanProfile.get,
          { headers: { Authorization: validToken } }
        );

        if (res.data.success) {
          setServicemen(res.data.data);
        }
      } catch (err) {
        console.log(err);
      };
    };

    fetchServicemen();
  }, []);

  /* ---------------- Fetch Amount ---------------- */
  const fetchAmount = async (data) => {
    const { servicemanId, fromDate, toDate } = data;

    if (!servicemanId || !fromDate || !toDate) {
      setFormData((prev) => ({ ...prev, amount: 0 }));
      return;
    };

    try {
      const res = await axios.get(
        apis.earningAmout.get,
        {
          params: { servicemanId, fromDate, toDate },
          headers: { Authorization: validToken }
        }
      );

      if (res?.data?.success) {
        setFormData(prev => ({
          ...prev,
          amount: res?.data?.data || 0
        }));
      }
    } catch (error) {
      console.log(error);
      setFormData((prev) => ({ ...prev, amount: 0 }));
    };
  };

  /* ---------------- Input Change ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    const updated = {
      ...formData,
      [name]: value,
    };

    setFormData(updated);
    fetchAmount(updated);
  };

  /* ---------------- Submit ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { servicemanId, fromDate, toDate } = formData;

    if (!servicemanId || !fromDate || !toDate) {
      toast.error("All fields are required");
      return;
    };

    if (formData.amount <= 0) {
      toast.error("No unpaid earning found for this range");
      return;
    };

    try {
      setLoading(true);

      const payload = {
        servicemanId,
        fromDate,
        toDate,
      };

      const res = await axios.post(
        apis.bankTransfer.create,
        payload,
        { headers: { Authorization: validToken } }
      );

      if (res.data.success) {
        toast.success("Bank transfer created successfully");
        navigate(-1);
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    };
  };

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          {/* Header */}
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Create Bank Transfer</h5>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
          </div>

          {/* Body */}
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* Serviceman */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Serviceman <span className="text-danger">*</span>
                  </label>

                  <select
                    className="form-select"
                    value={formData.servicemanId}
                    onChange={(e) => {
                      const updated = {
                        ...formData,
                        servicemanId: e.target.value,
                      };
                      setFormData(updated);
                      fetchAmount(updated);
                    }}
                  >
                    <option value="">-- Select Provider --</option>
                    {servicemen?.map((item) => (
                      <option key={item?._id} value={item?.userId}>
                        {`${item?.name} ${item?.mobile}`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Transaction Id */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    TransactionId
                  </label>
                  <input
                    type="text"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row">
                {/* From Date */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    From Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    name="fromDate"
                    value={formData.fromDate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                {/* To Date */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    To Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    name="toDate"
                    value={formData.toDate}
                    min={formData.fromDate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row">
                {/* Amount */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Amount
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.amount}
                    readOnly
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="text-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBankTransferPage;
