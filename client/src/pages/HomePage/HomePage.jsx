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


import AcServices from "./AcServices";
import KitchenServices from "./KitchenServices";
import TvServices from "./TvServices";
import EpServices from "./EpServices";


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
      <PopularServices />
      <HowWorks />
      {/* <FeaturedServices /> */}
      <AcServices />
      <div className="container">
        <img src="/assets/img/home/acbanner.jpg" className="img-fluid" alt="img" />
      </div>
      <KitchenServices />
      <div className="container">
        <img src="/assets/img/home/kitchenbanner.jpg" className="img-fluid" alt="img" />
      </div>
      <TvServices />
      <div className="container">
        <img src="/assets/img/home/tvbanner.jpg" className="img-fluid" alt="img" />
      </div>
      <EpServices />
      <div className="container">
        <img src="/assets/img/home/epbanner.jpg" className="img-fluid" alt="img" />
      </div>
      
      <Links />
      <CategoryModal />
    </>
  );
};

export default HomePage;