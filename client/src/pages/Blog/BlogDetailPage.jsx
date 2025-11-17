import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import BreadCrumb from "../BreadCrumb/BreadCrumb";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const { Urls, postData, imageCheck, formatDate } = useContext(AppContext);
  const [blog, setBlog] = useState(null);
  const [categories, setcategories] = useState([]);
  const [latestBlogs, setlatestBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogDetail = async () => {
    try {
      const response = await postData({ slug:slug }, Urls.blogDetail, "GET", 0, 1);
      if (response.data) {
        setBlog(response.data);
        setcategories(response.categories);
        setlatestBlogs(response.blogs);
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
    <>
    <BreadCrumb data={{title:blog.title}} />
    <div className="content pt-5">
        <div className="container">
          <div className="row">
            {/* LEFT SECTION */}
            <div className="col-lg-8 col-md-12 blog-details">

              {/* Blog Header */}
              <div className="blog-head">
                <div className="blog-category">
                  <ul>
                    <li>
                      <span className="badge badge-light text-dark">{blog?.category?.name}</span>
                    </li>
                    <li><i className="feather-calendar me-1"></i>{blog.createdAt ? formatDate(blog.createdAt) : ""}</li>
                    <li>
                      <div className="post-author">
                        <Link to="#">
                          <img src="/assets/img/favicon.jpg" alt="Post Author" />
                          <span>Green India Team</span>
                        </Link>
                      </div>
                    </li>
                  </ul>
                </div>

                <h4 className="mb-3">{blog.title}</h4>
              </div>

              {/* Blog Post */}
              <div className="card blog-list shadow-none">
                <div className="card-body">
                  <div className="blog-image">
                    <Link to="/blog-details">
                      <img className="img-fluid" src={imageCheck(blog.detailImage)} alt={blog.title} />
                    </Link>
                  </div>

                  <div className="blog-content">
                    
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

             


             
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="col-lg-4 col-md-12 blog-sidebar">



              {/* CATEGORIES */}
              <div className="card category-widget">
                <div className="card-body">
                  <h4 className="side-title">Categories</h4>
                  <ul className="categories">
                    {categories.map((value, index) => (
                    
                      <li className="d-flex justify-content-between p-2 bg-white" key={index}>
                        <Link >{value.name}</Link>
                      </li>
                    ))}

                  </ul>
                </div>
              </div>

              {/* LATEST POSTS */}
              <div className="card post-widget">
                <div className="card-body">
                  <h4 className="side-title">Latest News</h4>
                  <ul className="latest-posts">
                    
                    {latestBlogs.map((value, index) => (
                      <li key={index}>
                        <div className="post-thumb">
                          <Link to={'/blog/'+value.slug}>
                            <img 
                            src={imageCheck(value.frontImage)} 
                            alt={value.title} className="img-fluid" />
                          </Link>
                        </div>
                        <div className="post-info">
                          <p>{formatDate(value.createdAt)}</p>
                          <h4>
                            <Link to={'/blog/'+value.slug}>
                              {value.title}
                            </Link>
                          </h4>
                        </div>
                      </li>
                    ))}
                    
                  </ul>
                </div>
              </div>

              
            </div>
          </div>
        </div>
    </div>

    </>
  );
};

export default BlogDetailPage;
