import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";
import SelectMultipleService from "../../components/Form/SelectMultipleService";

const UpdateBrandLogoPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [mainTitle, setMainTitle] = useState("");
  const [description, setDescription] = useState("");
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const [icons, setIcons] = useState([]); // {file:null, preview:null, existing:false, url:""}
  const [loading, setLoading] = useState(false);

  // -------------------------------------
  // Fetch all services
  // -------------------------------------
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(apis.service.get, {
          headers: { Authorization: validToken },
        });
        setServices(res?.data?.data || []);
      } catch (error) {
        console.log(error)
        toast.error("Failed to load services");
      }
    };
    fetchServices();
  }, [validToken]);


  // -------------------------------------
  // Fetch existing brand logo details
  // -------------------------------------
  useEffect(() => {
    const fetchBrandLogo = async () => {
      try {
        const res = await axios.get(`${apis.brandLogo.get}/${id}`, {
          headers: { Authorization: validToken },
        });

        const data = res?.data?.data;

        setMainTitle(data.mainTitle || "");
        setDescription(data.description || "");
        setSelectedServices(data.services?.map((s) => s._id) || []);

        // Existing icons
        setIcons(
          (data.icons || []).map((url) => ({
            file: null,
            preview: url, // existing URL
            existing: true,
            url,
          }))
        );
      } catch (error) {
        console.log(error)
        toast.error("Failed to load brand logo");
      }
    };

    fetchBrandLogo();
  }, [id, validToken]);


  // -------------------------------------
  // Handle Icon Change
  // -------------------------------------
  const handleIconChange = (index, file) => {
    const updated = [...icons];

    if (updated[index].preview && !updated[index].existing) {
      URL.revokeObjectURL(updated[index].preview);
    }

    updated[index] = {
      file,
      preview: URL.createObjectURL(file),
      existing: false,
    };

    setIcons(updated);
  };


  const addIconField = () => {
    setIcons([...icons, { file: null, preview: null, existing: false }]);
  };

  const removeIconField = (index) => {
    const updated = [...icons];
    if (updated[index].preview && !updated[index].existing) {
      URL.revokeObjectURL(updated[index].preview);
    }
    updated.splice(index, 1);
    setIcons([...updated]);
  };


  // -------------------------------------
  // Submit update
  // -------------------------------------
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!mainTitle.trim()) {
      toast.error("Main title is required");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("mainTitle", mainTitle);
      formData.append("description", description);

      selectedServices.forEach((id) => formData.append("services[]", id));

      // Add existing icons that should be kept
      icons.forEach((icon) => {
        if (icon.existing) {
          formData.append("oldIcons[]", icon.url);
        }
      });

      // Add new icons
      icons.forEach((icon) => {
        if (icon.file) {
          formData.append("icons", icon.file);
        }
      });

      const res = await axios.put(
        `${apis.brandLogo.update}/${id}`,
        formData,
        {
          headers: {
            Authorization: validToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res?.data?.success) {
        toast.success("Brand logo updated successfully");
        navigate(-1);
      }

    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  // -------------------------------------
  // JSX
  // -------------------------------------
  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Update Brand Logo</h5>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
          </div>

          <div className="card-body">
            <form onSubmit={handleUpdate}>

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
                />
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Services */}
              <div className="mb-3">
                <label className="form-label">Select Services</label>
                <SelectMultipleService
                  optionsList={services}
                  value={selectedServices}
                  onChange={setSelectedServices}
                />
              </div>

              {/* Icons */}
              <div className="mb-3">
                <label className="form-label">Icons</label>

                {icons.map((icon, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <input
                      type="file"
                      className="form-control me-2"
                      accept="image/*"
                      onChange={(e) =>
                        handleIconChange(index, e.target.files[0])
                      }
                    />

                    {icon.preview && (
                      <img
                        src={icon.preview}
                        alt="icon"
                        style={{
                          width: "50px",
                          height: "50px",
                          marginRight: "5px",
                          borderRadius: "4px",
                          objectFit: "cover",
                        }}
                      />
                    )}

                    <button
                      type="button"
                      className="btn btn-danger me-1"
                      onClick={() => removeIconField(index)}
                      disabled={icons.length === 1}
                    >
                      -
                    </button>

                    {index === icons.length - 1 && (
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={addIconField}
                      >
                        +
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-end">
                <button type="submit" className="btn btn-primary" disabled={loading}>
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

export default UpdateBrandLogoPage;
