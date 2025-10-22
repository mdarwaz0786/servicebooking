import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";
import SelectMultipleService from "../../components/Form/SelectMultipleService";

const UpdateServiceFaqPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [mainTitle, setMainTitle] = useState("");
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(apis.service.get, {
          headers: { Authorization: validToken },
        });
        if (res?.data?.success) setServices(res?.data?.data || []);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchServices();
  }, [validToken]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${apis.serviceFaq.get}/${id}`, {
          headers: { Authorization: validToken },
        });
        if (res?.data?.success && res?.data?.data) {
          const data = res.data.data;
          setMainTitle(data?.mainTitle || "");
          setSelectedServices(data?.services?.map(s => s?._id) || []);
          setFaqs(data?.faqs?.length ? data.faqs : [{ question: "", answer: "" }]);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id, validToken]);

  const handleFaqChange = (index, field, value) => {
    const updated = [...faqs];
    updated[index][field] = value;
    setFaqs(updated);
  };

  const addFaqField = () => setFaqs([...faqs, { question: "", answer: "" }]);

  const removeFaqField = (index) => {
    if (faqs.length === 1) return;
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mainTitle.trim()) return toast.error("Main title is required");
    if (selectedServices.length === 0) return toast.error("Select at least one service");
    if (faqs.some((f) => !f?.question?.trim() || !f?.answer?.trim()))
      return toast.error("All FAQ questions and answers are required");

    try {
      setLoading(true);

      const payload = {
        mainTitle,
        services: selectedServices,
        faqs: faqs?.map((f) => ({ question: f?.question?.trim(), answer: f?.answer?.trim() })),
      };

      const res = await axios.patch(`${apis.serviceFaq.update}/${id}`, payload, {
        headers: { Authorization: validToken },
      });

      if (res?.data?.success) {
        toast.success("Service FAQ updated successfully");
        navigate(-1);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Update Service FAQ</h5>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Services */}
              <div className="mb-3">
                <label className="form-label">
                  Select Services <span className="text-danger">*</span>
                </label>
                <SelectMultipleService
                  optionsList={services}
                  value={selectedServices}
                  onChange={setSelectedServices}
                />
              </div>

              {/* Main Title */}
              <div className="mb-3">
                <label className="form-label">
                  Main Title <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={mainTitle}
                  onChange={(e) => setMainTitle(e.target.value)}
                />
              </div>

              {/* FAQs */}
              <div className="mb-3">
                <label className="form-label">FAQs</label>
                {faqs.map((faq, index) => (
                  <div key={index} className="mb-2 border p-2 rounded">
                    <input
                      type="text"
                      className="form-control mb-1"
                      placeholder="Question"
                      value={faq.question}
                      onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                    />
                    <textarea
                      className="form-control mb-1"
                      placeholder="Answer"
                      value={faq.answer}
                      onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                    />
                    <div className="d-flex justify-content-end">
                      <button
                        type="button"
                        className="btn btn-danger btn-sm me-2"
                        onClick={() => removeFaqField(index)}
                        disabled={faqs.length === 1}
                      >
                        Remove
                      </button>
                      {index === faqs.length - 1 && (
                        <button
                          type="button"
                          className="btn btn-success btn-sm"
                          onClick={addFaqField}
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit */}
              <div className="text-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateServiceFaqPage;
