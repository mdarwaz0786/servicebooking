import { AppContext } from "../../context/AppContext";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import React, { useContext, useEffect, useState } from "react";

import Pagination from "../../components/Pagination/Pagination";
import { Link } from "react-router-dom";


const GreenIndiaTeamReviewPage = () => {
  
  const GOOGLE_API_KEY  = import.meta.env.VITE_GOOGLE_API_KEY;

  const {steps,toggleStep, Urls, postData, toast, generateUniqueId, toggleModal, setbookingAddress, imageCheck  } = useContext(AppContext);
  const [reviews, setreviews] = useState([]);
  const [selectedaddress, setselectedaddress] = useState();
  const [page, setpage] = useState();
  const [limit, setlimit] = useState();
  
  const fetchReviews = async () => {
      try {    
        let userId = generateUniqueId();  
        const response = await postData({userId:userId}, Urls.myReview, "GET", 0, 1);
        
          setreviews(response.data);          
        
      } catch (error) { 
        console.error("Cart API Error:", error);
      }
    } 
      
  useEffect(() => {  
    fetchReviews(); 
  }, [page, limit]);  

  const handlePagination = async (page, limit) => {
    setpage(page);
    if(limit) setlimit(limit);
  }


  return (
    <>
      <BreadCrumb data={{title:' GREEN INDIA TEAM REVIEWS'}} />
      <div className="container mt-4">

        <div className="row mt-5">
          <div className="col-md-6 m-auto">

              <>
              {reviews.map((item, index)=>(
                  <div className="col-xxl-12 col-lg-12" key={index}>
                      <div className="card shadow-none">
                          <div className="card-body">
                          <div className="d-md-flex align-items-center">
                              <div className="review-widget d-sm-flex flex-fill">
                              <div className="d-flex justify-content-between align-items-center">
                                  <div className="d-flex">
                                  {/* <span className="review-img me-2">
                                      <img src={imageCheck(item.booking?.bookingItems[0]?.service?.image)} className="rounded img-fluid" alt="User Image" />
                                  </span> */}
                                  <div>
                                      <div className="d-flex justify-content-between align-items-center">
                                      <div className="d-flex align-items-center">
                                          {/* <h6 className="fs-14 me-2">{item.booking?.bookingItems[0]?.service?.name}</h6> */}
                                          <div className="rating">
                                            {(item?.rating)?(
                                                <>
                                                    {[1,2,3,4,5].map((value) =>
                                                        <span key={index+''+value}>
                                                            {(value<=item?.rating)?(
                                                                <i className="fas fa-star filled" key={index}></i>
                                                            ):(<i className="fas fa-star" key={index}></i>)}
                                                        </span>
                                                    )}
                                                </>
                                            ):(null)}
                                      </div>
                                      </div>
                                      </div>
                                  </div>
                                  </div>
                              </div>
                              </div>
                              
                          </div>
                          <div>
                              <p className="fs-14">
                              {item.description}
                              </p>
                          </div>
                          </div>
                      </div>
                  </div>
              ))}
              
              <Pagination handlePagination={handlePagination} />

              </>


          </div>          
        </div>
      </div>
    </>
  );
};

export default GreenIndiaTeamReviewPage;
