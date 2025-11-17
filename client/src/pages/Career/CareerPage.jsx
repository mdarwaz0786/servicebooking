import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import BreadCrumb from "../BreadCrumb/BreadCrumb";

const CareerPage = () => {
  const { Urls, postData } = useContext(AppContext);
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(10);
  const [data, setdata] = useState([]);

  // ⭐ New state for toggle
  const [activeJob, setActiveJob] = useState(null);

  const fetchData = async () => {
    try {
      const response = await postData(
        { page: page, limit: limit },
        Urls.career,
        "GET",
        0,
        1
      );

      setdata(response.data ? response.data : []);
    } catch (error) {
      console.error("Cart API Error:", error);
    }
  };

  const handlePagination = async (page, limit) => {
    setpage(page);
    if (limit) setlimit(limit);
  };

  useEffect(() => {
    fetchData();
  }, [page, limit]);

  // ⭐ Toggle function
  const toggleJob = (id) => {
    setActiveJob((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <BreadCrumb data={{ title: "Current Opening" }} />
      <div className="container py-5">
        {/* Job Openings */}
        <section className="mb-5">
          <div className="row">
            {data.map((job, index) => (
              <div key={index} className="col-md-8 mb-4 m-auto">
                <div
                  className="card h-100 shadow-sm"
                  onClick={() => toggleJob(job._id)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{job.title}</h5>

                    <p className="card-subtitle text-muted mb-2">
                      {job.location} | {job.employmentType}
                    </p>

                    {/* Short description */}
                    <div
                      className="mt-3"
                      dangerouslySetInnerHTML={{ __html: job.shortDescription }}
                    />

                    {/* ⭐ Full description only when active */}
                    {activeJob === job._id && (
                      <div
                        className="mt-3"
                        dangerouslySetInnerHTML={{ __html: job.fullDescription }}
                      />
                    )}

                    {/* Apply button (card click event stop) */}
                    <Link
                      to={`/career/${job._id}`}
                      className="btn btn-primary btn-sm mt-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination handlePagination={handlePagination} />
        </section>
      </div>
    </>
  );
};

export default CareerPage;
