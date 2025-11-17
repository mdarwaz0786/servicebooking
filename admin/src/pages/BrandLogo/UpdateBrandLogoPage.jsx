import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import apis, { BASE_URL } from "../../apis/apis";
import SelectMultipleService from "../../components/Form/SelectMultipleService";

const UpdateBrandLogoPage = () => {
  const { validToken } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const [mainTitle, setMainTitle] = useState("");
  const [description, setDescription] = useState("");

  const [oldIcons, setOldIcons] = useState([]);
  const [removeIcons, setRemoveIcons] = useState([]);

  const [newIcons, setNewIcons] = useState([]);

  const [loading, setLoading] = useState(false);

  // ---------------- GET SERVICES ----------------
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(apis.service.get, {
          headers: { Authorization: validToken },
        });
        if (res.data.success) setServices(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchServices();
  }, [validToken]);

  // ---------------- GET EXISTING DATA ----------------
  useEffect(() => {
    const fetchBrandLogo = async () => {
      try {
        const res = await axios.get(`${apis.brandLogo.get}/${id}`, {
          headers: { Authorization: validToken },
        });

        if (res.data.success) {
          const b = res.data.data;
          setMainTitle(b.mainTitle || "");
          setDescription(b.description || "");
          setSelectedServices(b.services?.map((s) => s._id) || []);
          setOldIcons(b.icons || []);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchBrandLogo();
  }, [id, validToken]);

  // ---------------- HANDLE REMOVE OLD ICON ----------------
  const handleRemoveOldIcon = (index) => {
    setRemoveIcons((prev) => [...prev, index]);
    setOldIcons((prev) => prev.filter((_, i) => i !== index));
  };

  // ---------------- HANDLE NEW ICON UPLOAD ----------------
  const handleNewIconUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewIcons((prev) => [...prev, ...files]);
  };

  const handleRemoveNewIcon = (index) => {
    setNewIcons((prev) => prev.filter((_, i) => i !== index));
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mainTitle.trim()) return toast.error("Main title is required");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("mainTitle", mainTitle);
      formData.append("description", description);
      formData.append("services", JSON.stringify(selectedServices));
      formData.append("removeIcons", JSON.stringify(removeIcons));

      newIcons.forEach((file) => {
        formData.append("icons", file);
      });

      const res = await axios.patch(
        `${apis.brandLogo.update}/${id}`,
        formData,
        {
          headers: {
            Authorization: validToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success("Updated successfully");
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
          <div className="card-header d-flex justify-content-between">
            <h5 className="mb-0">Update Brand Logo</h5>
            <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate(-1)}>
              ← Back
            </button>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>

              {/* SERVICES */}
              <div className="mb-3">
                <label className="form-label">Select Services</label>
                <SelectMultipleService
                  optionsList={services}
                  value={selectedServices}
                  onChange={setSelectedServices}
                />
              </div>

              {/* MAIN TITLE */}
              <div className="mb-3">
                <label className="form-label">Main Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={mainTitle}
                  onChange={(e) => setMainTitle(e.target.value)}
                />
              </div>

              {/* DESCRIPTION */}
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              {/* OLD ICONS */}
              <div className="mb-3">
                <label className="form-label">Existing Icons</label>
                <div className="d-flex flex-wrap gap-3">
                  {oldIcons.map((img, index) => (
                    <div key={index} style={{ position: "relative" }}>
                      <img
                        src={`${BASE_URL}/${img}`}
                        alt=""
                        style={{ width: 80, height: 80, objectFit: "contain", border: "1px solid #ddd" }}
                      />
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        style={{ position: "absolute", top: -8, right: -8 }}
                        onClick={() => handleRemoveOldIcon(index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* NEW ICON UPLOAD */}
              <div className="mb-3">
                <label className="form-label">Upload New Icons</label>
                <input
                  type="file"
                  multiple
                  className="form-control"
                  accept="image/*"
                  onChange={handleNewIconUpload}
                />

                {/* NEW IMAGES PREVIEW */}
                <div className="d-flex flex-wrap gap-3 mt-4">
                  {newIcons.map((file, index) => (
                    <div key={index} style={{ position: "relative" }}>
                      <img
                        src={URL.createObjectURL(file)}
                        alt=""
                        style={{ width: 80, height: 80, objectFit: "contain", border: "1px solid #ddd" }}
                      />
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        style={{ position: "absolute", top: -8, right: -8 }}
                        onClick={() => handleRemoveNewIcon(index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* SUBMIT */}
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
