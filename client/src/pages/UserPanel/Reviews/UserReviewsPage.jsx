import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";

import ReviewCard from './ReviewCard';

const UserReviewsPage = () => {

  const {steps,toggleStep, Urls, postData, toast, generateUniqueId, toggleModal, setbookingAddress } = useContext(AppContext);
  const [reviews, setreviews] = useState([]);
  const [selectedaddress, setselectedaddress] = useState();
  
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
  }, []);  

  const handlePagination = async (page, limit) => {
    setpage(page);
    if(limit) setlimit(limit);
}


  const handleRemoveReview = async (id) => {
  try {   
    let userId = generateUniqueId();  
    const response = await postData({userId:userId}, Urls.myReviewRemove, "delete");
    
      fetchReviews()
      
    
  } catch (error) { 
    console.error("Cart API Error:", error);
  }
} 



  return (
    <div className="col-xl-9 col-lg-8">
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
        <h4 className="mb-3">Reviews</h4>
        <div className="d-flex align-items-center">
          <p className="text-gray-6 me-2 fs-14 mb-0">Sort</p>
          <div className="dropdown me-2">
            <a href="javascript:void(0);" className="dropdown-toggle " data-bs-toggle="dropdown">
              Most helful
            </a>
            <div className="dropdown-menu">
              <a href="javascript:void(0);" className="dropdown-item active">Recently Added</a>
            </div>
          </div>
        </div>
      </div>
      <div className="row ">
       
       <ReviewCard 
       data={reviews}
       handleRemoveReview={handleRemoveReview}
       handlePagination={handlePagination}
        />

      </div>
    
    </div>
  );
};

export default UserReviewsPage;