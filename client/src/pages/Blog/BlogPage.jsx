import { useContext, useEffect, useState } from "react";
import blog from "../../assets/blog.jpg";
import { AppContext } from "../../context/AppContext";
import Pagination from '../../components/Pagination/Pagination';
import { Link } from "react-router-dom";
import BreadCrumb from "../BreadCrumb/BreadCrumb";

const BlogPage = () => {

  const { Urls, postData, imageCheck, formatDate} = useContext(AppContext);
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(10);
  const [data, setdata] = useState([]);
  const fetchData = async () => {
      try { 
        const response = await postData({page:page,limit:limit}, Urls.blog, "GET", 0, 1);    
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

  
  return (
    <>
    <BreadCrumb data={{title:'Blog'}} />
    <div className="container py-5">
      <h3 className="mb-4 fw-bold">Blogs</h3>
      <div className="row">
        {data.map((blog, index) => (

          <>
            <div className="col-xl-4 col-md-6" key={index}>
              <div className="card p-0">
                <div className="card-body p-0">
                  <div className="img-sec w-100">
                    <Link to={'/blog/'+blog.slug}>
                      <img
                        // src="/assets/img/providers/provider-15.jpg"
                        src={imageCheck(blog.frontImage)} 
                        alt={blog.title}
                        className="img-fluid rounded-top w-100"
                         style={{ height: '200px', objectFit: 'cover' }}
                      />
                    </Link>

                    <div className="image-tag d-flex justify-content-end align-items-center">
                      <span className="trend-tag">{blog?.category?.name}</span>
                    </div>
                  </div>

                  <div className="p-3">
                    <div className="d-flex align-items-center mb-3">
                      <div className="d-flex align-items-center border-end pe-2">
                        <span className="avatar avatar-sm me-2">
                          <img
                            src="/assets/img/favicon.jpg"
                            className="rounded-circle"
                            alt="user"
                          />
                        </span>
                        <h6 className="fs-14 text-gray-6">Green India Team</h6>
                      </div>

                      <div className="d-flex align-items-center ps-2">
                        <span>
                          <i className="ti ti-calendar me-2"></i>
                        </span>
                        <span className="fs-14">{formatDate(blog.createdAt)}</span>
                      </div>
                    </div>

                    <div>
                      <h6 className="fs-16 text-truncate mb-1">
                        <Link to={'/blog/'+blog.slug}>
                          {blog.title}
                        </Link>
                      </h6>

                      <p className="fs-14">
                        {blog.shortDescription}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </>
        ))}
      </div>

      <Pagination handlePagination={handlePagination} />

    </div>
    </>
  );
};

export default BlogPage;
