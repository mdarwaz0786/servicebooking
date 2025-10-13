import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";
import SelectMultipleService from "../../components/Form/SelectMultipleService";

const AddServiceFaqPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();

  const [mainTitle, setMainTitle] = useState("");
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);
  const [loading, setLoading] = useState(false);

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(apis.service.get, {
          headers: { Authorization: validToken },
        });
        if (res?.data?.success) setServices(res.data.data || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load services");
      }
    };
    fetchServices();
  }, [validToken]);

  // Handle FAQ input changes
  const handleFaqChange = (index, field, value) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index][field] = value;
    setFaqs(updatedFaqs);
  };

  const addFaqField = () => setFaqs([...faqs, { question: "", answer: "" }]);

  const removeFaqField = (index) => setFaqs(faqs.filter((_, i) => i !== index));

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mainTitle.trim()) {
      toast.error("Main title is required");
      return;
    }

    if (selectedServices.length === 0) {
      toast.error("Please select at least one service");
      return;
    }

    if (faqs.some((f) => !f.question.trim() || !f.answer.trim())) {
      toast.error("Each FAQ must have a question and an answer");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        mainTitle,
        services: selectedServices,
        faqs,
      };

      console.log(faqs)

      const res = await axios.post(apis.serviceFaq.create, payload, {
        headers: { Authorization: validToken },
      });

      if (res?.data?.success) {
        toast.success("Service FAQ created successfully");
        setMainTitle("");
        setSelectedServices([]);
        setFaqs([{ question: "", answer: "" }]);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Add Service FAQ</h5>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Main Title */}
              <div className="mb-3">
                <label className="form-label">
                  Main Title <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={mainTitle}
                  onChange={(e) => setMainTitle(e.target.value)}
                  required
                />
              </div>

              {/* Services */}
              <div className="mb-3">
                <label className="form-label">
                  Select Services <span style={{ color: "red" }}>*</span>
                </label>
                <SelectMultipleService
                  optionsList={services}
                  value={selectedServices}
                  onChange={setSelectedServices}
                />
              </div>

              {/* FAQs */}
              <div className="mb-3">
                <label className="form-label">FAQs</label>
                {faqs.map((faq, index) => (
                  <div key={index} className="border p-3 mb-2 rounded">
                    <div className="mb-2">
                      <label className="form-label">Question</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter question"
                        value={faq.question}
                        onChange={(e) =>
                          handleFaqChange(index, "question", e.target.value)
                        }
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Answer</label>
                      <textarea
                        className="form-control"
                        rows={2}
                        placeholder="Enter answer"
                        value={faq.answer}
                        onChange={(e) =>
                          handleFaqChange(index, "answer", e.target.value)
                        }
                      />
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        type="button"
                        className="btn btn-danger btn-sm me-2"
                        onClick={() => removeFaqField(index)}
                        disabled={faqs.length === 1}
                      >
                        -
                      </button>
                      {index === faqs.length - 1 && (
                        <button
                          type="button"
                          className="btn btn-success btn-sm"
                          onClick={addFaqField}
                        >
                          +
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-end">
                <button type="submit" className="btn btn-primary" disabled={loading}>
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

export default AddServiceFaqPage;
