/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import apis from "../../apis/apis";
import { useAuth } from "../../context/auth.context";
import SingleSelect from "../../components/Form/SingleSelect";

const WalletFormPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [providers, setProviders] = useState([]);

  const [formData, setFormData] = useState({
    providerId: "",
    depositAmount: "",
    depositStatus: "Paid",
    dateOfDeposit: new Date().toISOString().split("T")[0],
    paymentMode: "",
    transactionType: "",
    transactionId: "",
    transactionNumber: "",
    purpose: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await axios.get(apis.servicemanProfile.get, {
          headers: { Authorization: validToken },
        });

        if (res.data.success) {
          setProviders(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProviders();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${apis.wallet.get}/${id}`, {
            headers: { Authorization: validToken },
          });

          if (res.data.success) {
            const d = res.data.data;

            setFormData({
              providerId: d.providerId?._id || "",
              depositAmount: d.depositAmount || "",
              depositStatus: d.depositStatus || "",
              dateOfDeposit: d.dateOfDeposit
                ? d.dateOfDeposit.split("T")[0]
                : "",
              paymentMode: d.paymentMode || "",
              transactionType: d.transactionType || "",
              transactionId: d.transactionId || "",
              transactionNumber: d.transactionNumber || "",
              purpose: d.purpose || "",
            });
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }
  }, [id, validToken]);

  // Input Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.providerId) {
      toast.error("Provider is required");
      return;
    }
    if (!formData.depositAmount) {
      toast.error("Deposit amount is required");
      return;
    }
    if (!formData.dateOfDeposit) {
      toast.error("Date of deposit is required");
      return;
    }

    try {
      setLoading(true);

      let res;
      if (id) {
        res = await axios.patch(`${apis.wallet.update}/${id}`, formData, {
          headers: { Authorization: validToken },
        });
      } else {
        res = await axios.post(apis.wallet.create, formData, {
          headers: { Authorization: validToken },
        });
      }

      if (res.data.success) {
        toast.success(id ? "Updated successfully" : "Created successfully");
        navigate(-1);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between">
            <h5 className="mb-0">{id ? "Update" : "Add"}</h5>
            <button
              type="button"
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
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Provider <span className="text-danger">*</span>
                  </label>

                  <SingleSelect
                    optionsList={providers}
                    value={formData.providerId}
                    onChange={(val) =>
                      setFormData({ ...formData, providerId: val })
                    }
                    placeholder="Select Provider"
                    labelKey="name"
                    valueKey="_id"
                  />
                </div>

                {/* Deposit Amount */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Deposit Amount <span className="text-danger">*</span></label>
                  <input
                    type="number"
                    name="depositAmount"
                    value={formData.depositAmount}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* Deposit Status */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Deposit Status <span className="text-danger">*</span></label>
                  <input
                    name="depositStatus"
                    value={formData.depositStatus}
                    onChange={handleChange}
                    className="form-control"
                    disabled={true}
                    aria-readonly
                  />
                </div>

                {/* Date of Deposit */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Date of Deposit <span className="text-danger">*</span></label>
                  <input
                    type="date"
                    name="dateOfDeposit"
                    value={formData.dateOfDeposit}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* Payment Mode */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Payment Mode <span className="text-danger">*</span></label>
                  <select
                    name="paymentMode"
                    value={formData.paymentMode}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select Mode</option>
                    <option value="Online">Online</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>

                {/* Transaction Type */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Transaction Type <span className="text-danger">*</span></label>
                  <select
                    name="transactionType"
                    value={formData.transactionType}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Debit">Debit</option>
                    <option value="Credit">Credit</option>
                  </select>
                </div>

                {formData?.paymentMode === "Online" && (
                  <>
                    {/* Transaction Id */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Transaction ID</label>
                      <input
                        type="text"
                        name="transactionId"
                        value={formData.transactionId}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>

                    {/* Transaction Number */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Transaction Number</label>
                      <input
                        type="text"
                        name="transactionNumber"
                        value={formData.transactionNumber}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </>
                )}

                {/* Purpose */}
                <div className="col-12 mb-3">
                  <label className="form-label">Purpose</label>
                  <textarea
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    className="form-control"
                    rows="3"
                  />
                </div>
              </div>

              <div className="text-end">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (id ? "Updating..." : "Saving...") : id ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletFormPage;
