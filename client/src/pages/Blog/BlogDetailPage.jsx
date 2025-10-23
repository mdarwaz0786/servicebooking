import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const { Urls, postData, imageCheck, formatDate } = useContext(AppContext);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlogDetail = async () => {
    try {
      const response = await postData({ slug:slug }, Urls.blogDetail, "GET", 0, 1);
      if (response.data) {
        setBlog(response.data);
      }
    } catch (error) {
      console.error("Blog Detail Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container py-5 text-center">
        <h4>Blog not found!</h4>
        <Link to="/blog" className="btn btn-dark mt-3">
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      

      <div className="card border-0 shadow-sm">
        <img
          src={imageCheck(blog.frontImage)}
          alt={blog.title}
          className="card-img-top" 
          style={{ height: "400px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h6 className="text-muted mb-2">{blog?.category?.name}</h6>
          <h3 className="fw-bold">{blog.title}</h3>
          <small className="text-muted d-block mb-3">
            {blog.createdAt ? formatDate(blog.createdAt) : ""}
          </small>
          <div
            className="mt-3"
            dangerouslySetInnerHTML={{ __html: blog.shortDescription }}
          ></div>
          <div
            className="mt-3"
            dangerouslySetInnerHTML={{ __html: blog.fullDescription }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
