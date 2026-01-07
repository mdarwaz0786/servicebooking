
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import Services from "./Services";

import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RateCardModal from "../../components/Modal/RateCardModal";
import FullPageLoader from "../../components/Loader/FullPageLoader";

import { useLocation } from "react-router-dom";

const ServicesPage = () => {    
 const { slug, search } = useParams();

 const location = useLocation();

  const { Urls, postData, setserviceListData, pageLoading, setpageLoading, setservicePageCategoryData, setservicePageName, generateUniqueId } = useContext(AppContext);
  const fetchData = async () => {
    try { 

      let userId = generateUniqueId();

        let payload = {userId:userId,limit:5000};
        if(search) 
        {          
          payload = {search:search,userId:userId,limit:5000};
        }
        else if(slug)
        {
          payload = {slug:slug,userId:userId,limit:5000};
        }
        const response = await postData(payload, Urls.serviceList, "GET", 0, 0);

          
        
        setserviceListData(response.data?response.data:[]);
        setservicePageCategoryData(response.categoryList?response.categoryList:[]);
        setservicePageName(response.name?response.name:'');

        setpageLoading(false)
       
    } catch (error) { 
      console.error("Cart API Error:", error);
    }
  }

 
useEffect(() => {  
  fetchData(); 
}, [location]);  


if(pageLoading) return(<FullPageLoader />)
 


  return (
    <>
    <style>
      {`.header {
        position: relative !important;
      }
      .provider-page .page-wrapper {
        padding-top: 5px;
      }
        @media(max-width: 767px)
        {
        .provider-page .content {
            padding: 0px;
          }
        }
      `}
    </style>
      {/* <BreadCrumb /> */}
      <Services search={search} slug={slug} />
      <RateCardModal />
    </>
  );
};

export default ServicesPage;