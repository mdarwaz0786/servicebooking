/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import apis from "../../apis/apis";
import { useAuth } from "../../context/auth.context";

const SupportContentFormPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    faqs: [{ question: "", answer: "" }],
    supportInfo: {
      workingHours: "",
      quickResponseHours: "",
      officeName: "",
      address: "",
      email: "",
      phone: "",
      channels: "",
    },
    call: {
      id: "call",
      label: "Call Support",
      icon: "phone",
      value: "",
      type: "phone",
    },
    email: {
      id: "email",
      label: "Email Us",
      icon: "email",
      value: "",
      type: "email",
    },
    whatsapp: {
      id: "whatsapp",
      label: "WhatsApp",
      icon: "whatsapp",
      value: "",
      type: "whatsapp",
    },
    acceptCreditPoints: 10,
    cancelCreditPoints: 10,
    earningPercent: 15,
    status: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(apis.supportContent.get, {
          headers: {
            Authorization: validToken,
          },
        });
        if (res?.data?.data) {
          setFormData((prev) => ({
            ...prev,
            ...res?.data?.data,
          }));
        }
      } catch (error) {
        console.log(error);
      };
    };

    fetchData();
  }, []);

  const handleNestedChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFaqChange = (index, field, value) => {
    const updated = [...formData.faqs];
    updated[index][field] = value;
    setFormData((p) => ({ ...p, faqs: updated }));
  };

  const addFaq = () => {
    setFormData((p) => ({
      ...p,
      faqs: [...p.faqs, { question: "", answer: "" }],
    }));
  };

  const removeFaq = (index) => {
    const faqs = [...formData.faqs];
    faqs.splice(index, 1);
    setFormData((p) => ({ ...p, faqs }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      await axios.post(apis.supportContent.upsert, formData, {
        headers: { Authorization: validToken },
      });

      toast.success("Saved successfully");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    };
  };

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card shadow-sm">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Support Content Settings</h5>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={() => navigate("/")}
            >
              ← Back
            </button>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <h5 className="text-center mt-0 mb-4">Support Information</h5>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <label className="form-label">Status</label>
                  <select
                    name="status"
                    className="form-select"
                    value={formData.status ? "true" : "false"}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        status: e.target.value === "true",
                      }))
                    }
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="mb-1">Office Name</label>
                  <input
                    className="form-control"
                    value={formData.supportInfo.officeName}
                    onChange={(e) =>
                      handleNestedChange("supportInfo", "officeName", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="mb-1">Working Hours</label>
                  <input
                    className="form-control"
                    value={formData.supportInfo.workingHours}
                    onChange={(e) =>
                      handleNestedChange("supportInfo", "workingHours", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="mb-1">Quick Response Hours</label>
                  <input
                    className="form-control"
                    value={formData.supportInfo.quickResponseHours}
                    onChange={(e) =>
                      handleNestedChange("supportInfo", "quickResponseHours", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="mb-1">Support Email</label>
                  <input
                    className="form-control"
                    value={formData.supportInfo.email}
                    onChange={(e) =>
                      handleNestedChange("supportInfo", "email", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="mb-1">Support Phone</label>
                  <input
                    className="form-control"
                    value={formData.supportInfo.phone}
                    onChange={(e) =>
                      handleNestedChange("supportInfo", "phone", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Address</label>
                  <textarea
                    rows="2"
                    className="form-control"
                    value={formData.supportInfo.address}
                    onChange={(e) =>
                      handleNestedChange("supportInfo", "address", e.target.value)
                    }
                  />
                </div>
              </div>
              <h5 className="text-center mt-4 mb-4">Support Actions</h5>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="mb-1">Mobile Number</label>
                  <input
                    className="form-control"
                    value={formData.call.value}
                    onChange={(e) =>
                      handleNestedChange("call", "value", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="mb-1">Email Address</label>
                  <input
                    className="form-control"
                    value={formData.email.value}
                    onChange={(e) =>
                      handleNestedChange("email", "value", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="mb-1">WhatsApp Number</label>
                  <input
                    className="form-control"
                    value={formData.whatsapp.value}
                    onChange={(e) =>
                      handleNestedChange("whatsapp", "value", e.target.value)
                    }
                  />
                </div>
              </div>
              <h5 className="text-center mt-4 mb-4">Credit Point Settings</h5>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="mb-1">Accept Credit Points (deduct)</label>
                  <input
                    type="number"
                    name="acceptCreditPoints"
                    className="form-control"
                    value={formData.acceptCreditPoints}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="mb-1">Cancel Credit Points (Add)</label>
                  <input
                    type="number"
                    name="cancelCreditPoints"
                    className="form-control"
                    value={formData.cancelCreditPoints}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="mb-1">Earning Percent (%)</label>
                  <input
                    type="number"
                    name="earningPercent"
                    className="form-control"
                    value={formData.earningPercent}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <h5 className="text-center mt-4 mb-4">FAQs</h5>
              {formData.faqs.map((faq, index) => (
                <div key={index} className="border rounded p-3 mb-3">
                  <input
                    className="form-control mb-2"
                    placeholder="Question"
                    value={faq.question}
                    onChange={(e) =>
                      handleFaqChange(index, "question", e.target.value)
                    }
                  />
                  <textarea
                    className="form-control mb-2"
                    placeholder="Answer"
                    rows="2"
                    value={faq.answer}
                    onChange={(e) =>
                      handleFaqChange(index, "answer", e.target.value)
                    }
                  />
                  {formData.faqs.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => removeFaq(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={addFaq}
              >
                + Add FAQ
              </button>
              <div className="text-end mt-4">
                <button
                  type="submit"
                  className="btn btn-primary px-4"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportContentFormPage;
