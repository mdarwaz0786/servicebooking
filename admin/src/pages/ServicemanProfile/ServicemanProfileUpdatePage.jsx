import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import apis, { BASE_URL } from "../../apis/apis";
import { useAuth } from "../../context/auth.context";
import MultiSelect from "../../components/Form/MultiSelect";

const ServicemanProfileUpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { validToken, } = useAuth();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [zones, setZones] = useState([]);
  const [cities, setCities] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedZones, setSelectedZones] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "Male",
    city: "",
    experienceLevel: "Fresher",
    companyName: "",
    yearOfExperience: "",
    monthOfExperience: "",
    permanentAddress: "",
    currentAddress: "",
    referenceName1: "",
    referenceMobile1: "",
    referenceName2: "",
    referenceMobile2: "",
    profileStatus: "Pending",
    remarks: "",
  });

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (!id || !validToken) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${apis.servicemanProfile.get}/${id}`,
          { headers: { Authorization: validToken } }
        );

        const data = res?.data?.data;

        setFormData({
          ...data,
          dob: data?.dob ? data?.dob?.split("T")[0] : "",
          city: data?.city?._id || "",
        });

        if (data?.profileImage) {
          setImagePreview(`${BASE_URL}/${data.profileImage}`);
        };

        setSelectedCategories(data?.categoryIds || []);
        setSelectedSubCategories(data?.subCategoryIds || []);
        setSelectedZones(data?.zones?.map((z) => z?._id) || []);
      } catch {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      };
    };

    fetchData();
  }, [id, validToken]);

  useEffect(() => {
    if (!validToken) return;

    const fetchMasters = async () => {
      try {
        const [catRes, zoneRes, cityRes] = await Promise.all([
          axios.get(apis.category.get, { headers: { Authorization: validToken } }),
          axios.get(apis.combinedZone.get, { headers: { Authorization: validToken } }),
          axios.get(apis.city.get, { headers: { Authorization: validToken } }),
        ]);

        setCategories(catRes?.data?.data || []);
        setZones(zoneRes?.data?.data || []);
        setCities(cityRes?.data?.data || []);
      } catch (error) {
        console.log(error);
      };
    };

    fetchMasters();
  }, [validToken]);

  useEffect(() => {
    if (!validToken || !selectedCategories?.length) {
      setSubCategories([]);
      setSelectedSubCategories([]);
      return;
    };

    const fetchSubCategories = async () => {
      try {
        const res = await axios.get(
          apis.subCategory.byCategory,
          {
            headers: { Authorization: validToken },
            params: {
              categoryId: selectedCategories.join(",")
            }
          },
        );

        const list = res?.data?.data || [];
        setSubCategories(list);
        setSelectedSubCategories((prev) => prev?.filter((id) => list?.some((sc) => sc?._id === id)));
      } catch (error) {
        console.log(error);
      };
    };

    fetchSubCategories();
  }, [selectedCategories, validToken]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfileImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (!formData?.city) {
        return toast.error("City is required");
      }

      const form = new FormData();

      form.append("name", formData.name || "");
      form.append("email", formData.email || "");
      form.append("mobile", formData.mobile || "");
      form.append("dob", formData.dob || "");
      form.append("city", formData.city || "");
      form.append("experienceLevel", formData.experienceLevel || "");
      form.append("companyName", formData.companyName || "");
      form.append("yearOfExperience", formData.yearOfExperience || "");
      form.append("monthOfExperience", formData.monthOfExperience || "");
      form.append("permanentAddress", formData.permanentAddress || "");
      form.append("currentAddress", formData.currentAddress || "");
      form.append("referenceName1", formData.referenceName1 || "");
      form.append("referenceMobile1", formData.referenceMobile1 || "");
      form.append("referenceName2", formData.referenceName2 || "");
      form.append("referenceMobile2", formData.referenceMobile2 || "");
      form.append("gender", formData.gender || "Male");
      form.append("remarks", formData.remarks || "");

      form.append("categoryIds", JSON.stringify(selectedCategories || []));
      form.append("subCategoryIds", JSON.stringify(selectedSubCategories || []));
      form.append("zones", JSON.stringify(selectedZones || []));

      if (profileImage) {
        form.append("profileImage", profileImage);
      };

      const res = await axios.patch(
        `${apis.servicemanProfile.update}/${id}`,
        form,
        {
          headers: {
            Authorization: validToken,
          },
        }
      );

      if (res?.data?.success) {
        toast.success("Profile updated successfully");
        navigate(-1);
      };

    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    };
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="page-wrapper">
      <div className="container py-4">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>Update Profile</h5>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={() => navigate(-1)}
              >
                ← Back
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label>Name</label>
                  <input className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="col-md-6">
                  <label>Email</label>
                  <input className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="col-md-6">
                  <label>Mobile</label>
                  <input className="form-control" name="mobile" value={formData.mobile} onChange={handleChange} />
                </div>

                <div className="col-md-6">
                  <label>Date of Birth</label>
                  <input type="date" className="form-control" name="dob" value={formData.dob} onChange={handleChange} required />
                </div>

                <div className="col-md-6">
                  <label>Gender</label>
                  <select className="form-select" name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label>City</label>
                  <select className="form-select" name="city" value={formData.city} onChange={handleChange}>
                    <option value="">Select City</option>
                    {cities?.map((city) => (
                      <option key={city?._id} value={city?._id}>{city?.name}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label>Experience Level</label>
                  <select className="form-select" name="experienceLevel" value={formData.experienceLevel} onChange={handleChange}>
                    <option value="Fresher">Fresher</option>
                    <option value="Experience">Experience</option>
                  </select>
                </div>

                {formData?.experienceLevel === "Experience" && (
                  <>
                    <div className="col-md-6">
                      <label>Company Name</label>
                      <input className="form-control" name="companyName" value={formData.companyName} onChange={handleChange} />
                    </div>
                    <div className="col-md-3">
                      <label>Years of Experience</label>
                      <input type="number" className="form-control" name="yearOfExperience" value={formData.yearOfExperience} onChange={handleChange} />
                    </div>
                    <div className="col-md-3">
                      <label>Months of Experience</label>
                      <input type="number" className="form-control" name="monthOfExperience" value={formData.monthOfExperience} onChange={handleChange} />
                    </div>
                  </>
                )}

                <div className="col-md-6">
                  <label>Categories</label>
                  <MultiSelect optionsList={categories} value={selectedCategories} onChange={setSelectedCategories} />
                </div>

                <div className="col-md-6">
                  <label>Sub Categories</label>
                  <MultiSelect optionsList={subCategories} value={selectedSubCategories} onChange={setSelectedSubCategories} />
                </div>

                <div className="col-md-6">
                  <label>Zones</label>
                  <MultiSelect optionsList={zones} value={selectedZones} onChange={setSelectedZones} />
                </div>

                <div className="col-md-6">
                  <label>Profile Image</label>

                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageChange}
                  />

                  {imagePreview && (
                    <div className="mt-3">
                      <img
                        src={imagePreview}
                        alt="Profile Preview"
                        className="img-thumbnail"
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "10px"
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="col-md-6">
                  <label>Status</label>
                  <select className="form-select" name="profileStatus" value={formData.profileStatus} onChange={handleChange}>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div className="col-12">
                  <label>Permanent Address</label>
                  <textarea className="form-control" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} />
                </div>

                <div className="col-12">
                  <label>Current Address</label>
                  <textarea className="form-control" name="currentAddress" value={formData.currentAddress} onChange={handleChange} />
                </div>

                <div className="col-12">
                  <label>Remarks</label>
                  <textarea className="form-control" name="remarks" value={formData.remarks} onChange={handleChange} />
                </div>

                <div className="col-12 text-end">
                  <button className="btn btn-primary">Update Profile</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicemanProfileUpdatePage;
