import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";

import ReviewCard from './ReviewCard';

const UserReviewsPage = () => {

  const {steps,toggleStep, Urls, postData, toast, generateUniqueId, toggleModal, setbookingAddress } = useContext(AppContext);
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


  const handleRemoveReview = async (id) => {
  try {   
    let userId = generateUniqueId();  
    const response = await postData({userId:userId}, Urls.myReviewRemove+'/'+id, "delete");
    
      fetchReviews()
      
    
  } catch (error) { 
    console.error("Cart API Error:", error);
  }
} 



  return (
    <div className="col-xl-9 col-lg-8">
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
        <h4 className="mb-3">Reviews</h4>
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