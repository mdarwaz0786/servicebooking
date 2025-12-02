import { AppContext } from "../../context/AppContext";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import React, { useContext, useEffect, useState } from "react";
import ReviewCard from "../UserPanel/Reviews/ReviewCard";


const GreenIndiaTeamReviewPage = () => {
  

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


  return (
    <>
      <BreadCrumb data={{title:' GREEN INDIA TEAM REVIEWS'}} />
      <div className="container mt-4">

        <div className="row mt-5">
          <div className="col-md-6">

              <ReviewCard 
                data={reviews}
                handlePagination={handlePagination}
                />


          </div>          
        </div>
      </div>
    </>
  );
};

export default GreenIndiaTeamReviewPage;
