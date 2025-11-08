import { Link, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import BreadCrumb from "../BreadCrumb/BreadCrumb";

const CareerDetailPage = () => {

  const { slug } = useParams();
  const { Urls, postData, imageCheck, formatDate, toast} = useContext(AppContext);
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(10);
  const [data, setdata] = useState([]);
  const fetchData = async () => {
      try { 
        const response = await postData({page:page,limit:limit}, Urls.career+'/'+slug, "GET", 0, 1);    
        setdata(response.data?response.data:[]);      
      } catch (error) { 
      console.error("Cart API Error:", error);
      }
  }


  
  useEffect(() => {
  fetchData(); 
  }, [page, limit]);  



  // ✅ Handle file upload
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
      const response = await postData(formData, Urls.jobApply, "POST",0,0,1);
      if (response.success) {
        toast.error(data.message);
        setFormData({
          jobId: slug,
          name: "",
          email: "",
          mobile: "",
          resume: null,
        });
        
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };



  return (

    <>
    <BreadCrumb data={{title:data.title}} />
    <div className="container-fluid py-5">
      

      <div className="card border-0 shadow-sm">
       
        <div className="card-body">
            <div className="row">
                <div className="col-md-8">
                    <h6 className="text-muted mb-2">{data?.category?.name}</h6>
                    <h3 className="fw-bold">{data.title}</h3>
                    <small className="text-muted d-block mb-3">
                        <p className="card-subtitle text-muted mb-2">{data.location} | {data.employmentType}</p>
                    </small>
                    <div
                        className="mt-3"
                        dangerouslySetInnerHTML={{ __html: data.shortDescription }}
                    ></div>
                    <div
                        className="mt-3"
                        dangerouslySetInnerHTML={{ __html: data.fullDescription }}
                    ></div>
                </div>
                <div className="col-md-4">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
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


                            <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label">Upload Resume</label>
                                <input
                                type="file"
                                className="form-control"
                                name="resume"
                                onChange={handleFileChange}
                                />
                            </div>
                            </div>

                            

                            

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
    </div>
    </>
  );
};

export default CareerDetailPage;
