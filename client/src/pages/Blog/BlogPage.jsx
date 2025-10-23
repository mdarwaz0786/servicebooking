import { useContext, useEffect, useState } from "react";
import blog from "../../assets/blog.jpg";
import { AppContext } from "../../context/AppContext";
import Pagination from '../../components/Pagination/Pagination';
import { Link } from "react-router-dom";

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
    <div className="container py-5">
      <h3 className="mb-4 fw-bold">Blogs</h3>
      <div className="row">
        {data.map((blog) => (
          <div className="col-md-4 mb-4" key={blog._id}>
            <div className="card h-100">
              <img src={imageCheck(blog.frontImage)} alt={blog.title} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body d-flex flex-column">
                <h6 className="text-muted mb-3">{blog?.category?.name}</h6>
                <h5 className="card-title">{blog.title}</h5>
                <small className="text-muted mb-2">{formatDate(blog.createdAt)}</small>
                <p className="card-text">{blog.shortDescription}</p>
                <div className="mt-auto">
                  <Link to={'/blog/'+blog.slug} className="btn btn-dark btn-sm"  >View Details</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination handlePagination={handlePagination} />

    </div>
  );
};

export default BlogPage;
