import Business from "./Business";
import FeaturedServices from "./FeaturedServices";
import HeroSection from "./HeroSection";
import HighRatedServices from "./HighRatedServices";
import HowWorks from "./HowWorks";
import Links from "./Links";
import OurCategories from "./OurCategories";
import PopularProviders from "./PopularProviders";
import PopularServices from "./PopularServices";
import PreferredServices from "./PreferredServices";
import Provider from "./Provider";
import RecentBlog from "./RecentBlog";
import Testimonial from "./Testimonial";


import CategoryModal from "../../components/Modal/CategoryModal";


import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";

 
const HomePage = () => {


  const { categoryListData, handleHome, toggleModal } = useContext(AppContext);


useEffect(() => {
  toggleModal("homeCategoryModal", false); 
  handleHome();
}, []);  


  return ( 
    <>
      <HeroSection categoryData={categoryListData}  />
      <OurCategories />
      <FeaturedServices />
      <PopularServices />
      <HowWorks />
      <PopularProviders />
      <PreferredServices />
      <HighRatedServices />
      <Testimonial />
      <Provider />
      <RecentBlog />
      <Business />
      <Links />
      <CategoryModal />
    </>
  );
};

export default HomePage;