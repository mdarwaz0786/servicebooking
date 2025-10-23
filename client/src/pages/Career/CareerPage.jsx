import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";

const CareerPage = () => {

    
  const { Urls, postData, imageCheck, formatDate} = useContext(AppContext);
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(10);
  const [data, setdata] = useState([]);
  const fetchData = async () => {
      try { 
        const response = await postData({page:page,limit:limit}, Urls.career, "GET", 0, 1);    
        setdata(response.data?response.data:[]);
      
      } catch (error) { 
      console.error("Cart API Error:", error);
      }
  }

  const handlePagination = async (page, limit) => {
    setpage(page);
    if(limit) setlimit(limit);
}
  
  useEffect(() => {  
  fetchData(); 
  }, [page, limit]);  

  const jobOpenings = [
    {
      title: "Front-End Developer",
      location: "Remote / Bangalore",
      type: "Full-time",
      description: "Work with our product and design teams to build user-friendly web interfaces using React and modern front-end tools.",
    },
    {
      title: "Customer Support Executive",
      location: "Mumbai",
      type: "Full-time",
      description: "Provide excellent customer support and help troubleshoot user issues across our services and platforms.",
    },
    {
      title: "Digital Marketing Specialist",
      location: "Remote",
      type: "Contract",
      description: "Develop and manage marketing campaigns across SEO, PPC, email marketing, and social media platforms.",
    },
  ];

  return (
    <div className="container py-5">
      {/* Hero Section */}
      <section className="text-center mb-5">
        <h2 className="fw-bold">Join Our Team</h2>
        <p className="lead mt-3">
          We're looking for passionate individuals who want to make a real difference.
          Explore opportunities to grow, learn, and innovate with us.
        </p>
      </section>

      {/* Job Openings */}
      <section className="mb-5">
        <h4 className="mb-4 fw-semibold">Current Job Openings</h4>
        <div className="row">
          {data.map((job, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <p className="card-subtitle text-muted mb-2">{job.location} | {job.employmentType}</p>
                  <p className="card-text">{job.shortDescription}</p>
                  <Link to="#" className="btn btn-primary btn-sm mt-auto">Apply Now</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination handlePagination={handlePagination} />
      </section>

      {/* Benefits Section */}
      <section className="mb-5">
        <h4 className="mb-4 fw-semibold">Why Work With Us?</h4>
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="p-3 border rounded bg-light">
              <h6 className="fw-bold">Work-Life Balance</h6>
              <p className="mb-0">Flexible hours and remote opportunities help you maintain balance and productivity.</p>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="p-3 border rounded bg-light">
              <h6 className="fw-bold">Growth Opportunities</h6>
              <p className="mb-0">Access to mentorship, upskilling programs, and internal promotions.</p>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="p-3 border rounded bg-light">
              <h6 className="fw-bold">Inclusive Culture</h6>
              <p className="mb-0">We celebrate diversity and foster a welcoming, respectful workplace.</p>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="p-3 border rounded bg-light">
              <h6 className="fw-bold">Competitive Compensation</h6>
              <p className="mb-0">Enjoy industry-standard pay, bonuses, and perks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center mt-5">
        <h5 className="fw-bold mb-3">Don’t see a role that fits?</h5>
        <p>We’re always on the lookout for talented people. Email us at <a href="mailto:careers@company.com">careers@company.com</a> with your resume and we’ll get in touch!</p>
      </section>
    </div>
  );
};

export default CareerPage;
