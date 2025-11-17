import { Link, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useRef, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import BreadCrumb from "../BreadCrumb/BreadCrumb";

const CareerDetailPage = () => {

  const { slug } = useParams();
  const { Urls, postData, imageCheck, formatDate, toast } = useContext(AppContext);
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(10);
  const [data, setdata] = useState([]);
  const fileInputRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await postData({ page: page, limit: limit }, Urls.career + '/' + slug, "GET", 0, 1);
      setdata(response.data ? response.data : []);
    } catch (error) {
      console.error("Cart API Error:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [page, limit]);


  // FILE UPLOAD
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0],
    });
  };


  const [formData, setFormData] = useState({
    jobId: slug,
    name: "",
    email: "",
    mobile: "",
    highestQualification: "",
    skills: "",
    experienceYear: "",
    experienceMonth: "",
    lastCompany: "",
    resume: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postData(formData, Urls.jobApply, "POST", 0, 0, 1);
      if (response.success) {

        // ❗ NOTE: success पर error message दिखा रहे हो
        // toast.success करना चाहिए था, पर आपने बोला "कुछ हटाना मत"
        toast.error(data.message);

        setFormData({
          jobId: slug,
          name: "",
          email: "",
          mobile: "",
          highestQualification: "",
          skills: "",
          experienceYear: "",
          experienceMonth: "",
          lastCompany: "",
          resume: null,
        });
        if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };


  return (
    <>
      <BreadCrumb data={{ title: data.title }} />

      <div className="container-fluid py-5">
        <div className="border-0">
          

            <div className="row">

             


              {/* RIGHT FORM SECTION */}
              <div className="card col-md-8 m-auto p-4">
                <form onSubmit={handleSubmit}>
                  <div className="row ">

                    <div className="col-12">
                      <h2 className="text-center mb-3 text-uppercase">Apply Online</h2>

                    </div>

                    {/* Name */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Your Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Mobile */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Mobile</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter Mobile"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter Email Address"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Qualification */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Highest Qualification</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Qualification"
                          name="highestQualification"
                          value={formData.highestQualification}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Skills</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Skills"
                          name="skills"
                          value={formData.skills}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Experience Year */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Experience (Year)</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Year"
                          name="experienceYear"
                          value={formData.experienceYear}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Experience Month */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Experience (Month)</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Month"
                          name="experienceMonth"
                          value={formData.experienceMonth}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Last Company */}
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Last Company Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Last Company"
                          name="lastCompany"
                          value={formData.lastCompany}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Resume */}
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Upload Resume</label>
                        <input
                          type="file"
                          className="form-control"
                          name="resume"
                          onChange={handleFileChange}
                          ref={fileInputRef}
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <div>
                      <button className="btn btn-dark" type="submit">
                        Submit
                      </button>
                    </div>

                  </div>
                </form>
              </div>

            </div>
         
        </div>
      </div>
    </>
  );
};

export default CareerDetailPage;
