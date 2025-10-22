import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextEditor from "../../components/Form/TextEditor";
import apis from "../../apis/apis";
import { useAuth } from "../../context/auth.context";

const AddTermsConditionsPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "Terms and Conditions",
    introduction: "",
    effectiveDate: "",
    contentSections: [{ heading: "", content: "" }],
    contact: { companyName: "", address: "", email: "" },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIntroductionChange = (value) => {
    setFormData({ ...formData, introduction: value });
  };

  const handleSectionChange = (index, field, value) => {
    const sections = [...formData.contentSections];
    sections[index][field] = value;
    setFormData({ ...formData, contentSections: sections });
  };

  const addSection = () => {
    setFormData({
      ...formData,
      contentSections: [...formData.contentSections, { heading: "", content: "" }],
    });
  };

  const removeSection = (index) => {
    const sections = [...formData.contentSections];
    sections.splice(index, 1);
    setFormData({ ...formData, contentSections: sections });
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, contact: { ...formData.contact, [name]: value } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.introduction.trim()) {
      toast.error("Introduction is required");
      return;
    }

    if (!formData.effectiveDate) {
      toast.error("Effective date is required");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(apis.termsConditions.create, formData, {
        headers: { Authorization: validToken },
      });

      if (res.data.success) {
        toast.success("Terms & Conditions created successfully");
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
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Add Terms & Conditions</h5>
            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => navigate(-1)}>
              ← Back
            </button>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              {/* Introduction */}
              <div className="mb-3">
                <label className="form-label">Introduction</label>
                <TextEditor
                  value={formData.introduction}
                  onChange={handleIntroductionChange}
                  placeholder="Enter introduction..."
                  height={100}
                />
              </div>

              {/* Effective Date */}
              <div className="mb-3">
                <label className="form-label">Effective Date</label>
                <input
                  type="date"
                  name="effectiveDate"
                  value={formData.effectiveDate}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Content Sections */}
              <div className="mb-3">
                <label className="form-label">Content Sections</label>
                {formData.contentSections.map((section, index) => (
                  <div key={index} className="border rounded p-3 mb-3">
                    <input
                      type="text"
                      placeholder="Heading"
                      className="form-control mb-2"
                      value={section.heading}
                      onChange={(e) => handleSectionChange(index, "heading", e.target.value)}
                      required
                    />
                    <TextEditor
                      value={section.content}
                      onChange={(value) => handleSectionChange(index, "content", value)}
                      placeholder="Content"
                      height={100}
                    />
                    <button
                      type="button"
                      className="btn btn-danger btn-sm mt-2"
                      onClick={() => removeSection(index)}
                      disabled={formData.contentSections.length === 1}
                    >
                      Remove Section
                    </button>
                  </div>
                ))}
                <button type="button" className="btn btn-primary btn-sm" onClick={addSection}>
                  + Add Section
                </button>
              </div>

              {/* Contact */}
              <div className="mb-3">
                <label className="form-label">Contact Information</label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={formData.contact.companyName}
                  onChange={handleContactChange}
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.contact.address}
                  onChange={handleContactChange}
                  className="form-control mb-2"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.contact.email}
                  onChange={handleContactChange}
                  className="form-control mb-2"
                />
              </div>

              {/* Buttons */}
              <div className="text-end">
                <button
                  type="reset"
                  className="btn btn-secondary me-2"
                  onClick={() =>
                    setFormData({
                      title: "Terms and Conditions",
                      introduction: "",
                      effectiveDate: "",
                      contentSections: [{ heading: "", content: "" }],
                      contact: { companyName: "", address: "", email: "" },
                    })
                  }
                >
                  Cancel
                </button>
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

export default AddTermsConditionsPage;
