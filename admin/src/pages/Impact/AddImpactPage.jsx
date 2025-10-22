import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import TextEditor from "../../components/Form/TextEditor";
import apis from "../../apis/apis";

const AddImpactPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "Green India Team Impact",
    introduction: "",
    contentSections: [{ heading: "", content: "" }],
    status: true,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContentChange = (index, value) => {
    const updatedSections = [...formData.contentSections];
    updatedSections[index].content = value;
    setFormData({ ...formData, contentSections: updatedSections });
  };

  const handleHeadingChange = (index, value) => {
    const updatedSections = [...formData.contentSections];
    updatedSections[index].heading = value;
    setFormData({ ...formData, contentSections: updatedSections });
  };

  const addSection = () => {
    setFormData({
      ...formData,
      contentSections: [...formData.contentSections, { heading: "", content: "" }],
    });
  };

  const removeSection = (index) => {
    const updatedSections = formData.contentSections.filter((_, i) => i !== index);
    setFormData({ ...formData, contentSections: updatedSections });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.introduction.trim()) {
      toast.error("Introduction is required");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(apis.impact.create, formData, {
        headers: { Authorization: validToken },
      });

      if (res.data.success) {
        toast.success("Impact page created successfully");
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
            <h5 className="mb-0">Add Impact</h5>
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
                  onChange={(value) => setFormData({ ...formData, introduction: value })}
                  placeholder="Enter introduction..."
                  height="200px"
                />
              </div>

              {/* Dynamic Content Sections */}
              {formData.contentSections.map((section, index) => (
                <div key={index} className="mb-3 border p-3 rounded">
                  <label className="form-label">Section Heading</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={section.heading}
                    onChange={(e) => handleHeadingChange(index, e.target.value)}
                    placeholder="Enter heading"
                  />
                  <label className="form-label">Content</label>
                  <TextEditor
                    value={section.content}
                    onChange={(value) => handleContentChange(index, value)}
                    placeholder="Enter content..."
                    height="150px"
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-danger mt-2"
                    onClick={() => removeSection(index)}
                  >
                    Remove Section
                  </button>
                </div>
              ))}

              <button type="button" className="btn btn-secondary mb-3" onClick={addSection}>
                + Add Section
              </button>

              {/* Buttons */}
              <div className="text-end">
                <button
                  type="reset"
                  className="btn btn-secondary me-2"
                  onClick={() =>
                    setFormData({
                      title: "Green India Team Impact",
                      introduction: "",
                      contentSections: [{ heading: "", content: "" }],
                      status: true,
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

export default AddImpactPage;
