/* eslint-disable react-hooks/exhaustive-deps */
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

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [subSubSubCategories, setSubSubSubCategories] = useState([]);

  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [subSubCategory, setSubSubCategory] = useState();
  const [subSubSubCategory, setSubSubSubCategory] = useState();

  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const [mainTitle, setMainTitle] = useState("");
  const [description, setDescription] = useState("");

  const [oldIcons, setOldIcons] = useState([]);
  const [removeIcons, setRemoveIcons] = useState([]);

  const [newIcons, setNewIcons] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(apis.category.get, {
          headers: { Authorization: validToken },
        });
        if (res?.data?.success) setCategories(res?.data?.data || []);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load categories");
      };
    };
    fetchCategories();
  }, [validToken]);

  useEffect(() => {
    if (!category) return;
    const fetchSubCategories = async () => {
      try {
        const res = await axios.get(
          `${apis.subCategory.get}?categoryId=${category}`,
          { headers: { Authorization: validToken } }
        );
        if (res?.data?.success) {
          setSubCategories(res?.data?.data || []);
          if (res?.data.data.length < 1) {
            fetchServices();
          }
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load sub categories");
      };
    };
    fetchSubCategories();
  }, [category, validToken]);

  useEffect(() => {
    if (!subCategory) return;
    const fetchSubSubCategories = async () => {
      try {
        const res = await axios.get(
          `${apis.subSubCategory.get}?subCategoryId=${subCategory}`,
          { headers: { Authorization: validToken } }
        );
        if (res?.data?.success) {
          setSubSubCategories(res?.data?.data || []);
          if (res?.data.data.length < 1) {
            fetchServices();
          }
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load sub sub categories");
      };
    };
    fetchSubSubCategories();
  }, [subCategory, validToken]);

  useEffect(() => {
    if (!subSubCategory) return;
    const fetchSubSubSubCategories = async () => {
      try {
        const res = await axios.get(
          `${apis.subSubSubCategory.get}?subSubCategoryId=${subSubCategory}`,
          { headers: { Authorization: validToken } }
        );
        if (res?.data?.success) {
          setSubSubSubCategories(res?.data?.data || []);
          if (res?.data.data.length < 1) {
            fetchServices();
          }
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load sub sub sub categories");
      };
    };
    fetchSubSubSubCategories();
  }, [subSubCategory, validToken]);

  const fetchServices = async () => {
    try {
      const params = {};
      if (category) params.categoryId = category;
      if (subCategory) params.subCategoryId = subCategory;
      if (subSubCategory) params.subSubCategoryId = subSubCategory;
      if (subSubSubCategory) params.subSubSubCategoryId = subSubSubCategory;

      const res = await axios.get(apis.service.get, {
        params,
        headers: {
          Authorization: validToken,
        },
      });
      setServices(res?.data?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

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
          setCategory(b?.category?._id)
          setSubCategory(b?.subCategory?._id)
          setSubSubCategory(b?.subSubCategory?._id)
          setSubSubSubCategory(b?.subSubSubCategory?._id)
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

    try {
      setLoading(true);

      if (!mainTitle.trim()) {
        toast.error("Main title is required");
        return;
      }

      if (selectedServices.length === 0) {
        toast.error("Please select at least one service");
        return;
      }

      const formData = new FormData();
      formData.append("mainTitle", mainTitle);
      formData.append("description", description);
      formData.append("services", JSON.stringify(selectedServices));
      formData.append("removeIcons", JSON.stringify(removeIcons));

      if (category) formData.append("category", category);
      if (subCategory) formData.append("subCategory", subCategory);
      if (subSubCategory) formData.append("subSubCategory", subSubCategory);
      if (subSubSubCategory) formData.append("subSubSubCategory", subSubSubCategory);

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
              <div className="row">
                <div className="col-md-6">
                  {/* Category */}
                  <div className="mb-3">
                    <label className="form-label">Product <span style={{ color: "red" }}>*</span></label>
                    <select
                      name="category"
                      value={category}
                      onChange={(e) => {
                        setCategory(e.target.value);
                        setSubCategory();
                        setSubSubCategory();
                        setSubSubSubCategory();
                        setSelectedServices([]);
                      }}
                      className="form-control"
                      required
                    >
                      <option value="">-- Select Product --</option>
                      {categories?.map((cat) => (
                        <option key={cat?._id} value={cat?._id}>
                          {cat?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  {/* Sub Category */}
                  <div className="mb-3">
                    <label className="form-label">Variant</label>
                    <select
                      name="subCategory"
                      value={subCategory}
                      onChange={(e) => {
                        setSubCategory(e.target.value);
                        setSubSubCategory();
                        setSubSubSubCategory();
                        setSelectedServices([]);
                      }}
                      className="form-control"
                      disabled={!category}
                    >
                      <option value="">-- Select Variant --</option>
                      {subCategories?.map((sub) => (
                        <option key={sub?._id} value={sub?._id}>
                          {sub?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  {/* Sub Sub Category */}
                  <div className="mb-3">
                    <label className="form-label">Service Process</label>
                    <select
                      name="subSubCategory"
                      value={subSubCategory}
                      onChange={(e) => {
                        setSubSubCategory(e.target.value);
                        setSubSubSubCategory();
                      }
                      }
                      className="form-control"
                      disabled={!subCategory}
                    >
                      <option value="">-- Select Service Process --</option>
                      {subSubCategories?.map((subsub) => (
                        <option key={subsub?._id} value={subsub?._id}>
                          {subsub?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  {/* Sub Sub Sub Category */}
                  <div className="mb-3">
                    <label className="form-label">Nested Service Process</label>
                    <select
                      name="subSubSubCategory"
                      value={subSubSubCategory}
                      onChange={(e) => setSubSubSubCategory(e.target.value)}
                      className="form-control"
                      disabled={!subSubCategory}
                    >
                      <option value="">-- Select Nested Service Process --</option>
                      {subSubSubCategories?.map((sss) => (
                        <option key={sss?._id} value={sss?._id}>
                          {sss?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  {/* SERVICES */}
                  <div className="mb-3">
                    <label className="form-label">Select Services <span style={{ color: "red" }}>*</span></label>
                    <SelectMultipleService
                      optionsList={services}
                      value={selectedServices}
                      onChange={setSelectedServices}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  {/* MAIN TITLE */}
                  <div className="mb-3">
                    <label className="form-label">Main Title <span style={{ color: "red" }}>*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      value={mainTitle}
                      required
                      onChange={(e) => setMainTitle(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {/* DESCRIPTION */}
              <div className="mb-3">
                <label className="form-label">Description <span style={{ color: "red" }}>*</span></label>
                <textarea
                  className="form-control"
                  rows={4}
                  required
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
                <label className="form-label">Upload New Icons <span style={{ color: "red" }}>*</span></label>
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
