
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import Services from "./Services";

import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ServicesPage = () => {    
 const { slug } = useParams();
  const { Urls, postData, setserviceListData, setservicePageCategoryData, setservicePageName, generateUniqueId } = useContext(AppContext);
  const fetchData = async () => {
    try { 

      let userId = generateUniqueId();

      const response = await postData({slug:slug,userId:userId}, Urls.serviceList, "GET", 0, 1);
      
        setserviceListData(response.data?response.data:[]);
        setservicePageCategoryData(response.categoryList?response.categoryList:[]);
        setservicePageName(response.name?response.name:'');
       
    } catch (error) { 
      console.error("Cart API Error:", error);
    }
  }

 
useEffect(() => {  
  fetchData(); 
}, []);  



  return (
    <>
      <BreadCrumb />
      <Services />
    </>
  );
};

export default ServicesPage;