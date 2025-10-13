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


import AllServices from "./AllServices";
import KitchenServices from "./KitchenServices";
import TvServices from "./TvServices";
import EpServices from "./EpServices";


import CategoryModal from "../../components/Modal/CategoryModal";


import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";

 
const HomePage = () => {


  const { categoryListData, handleHome, toggleModal, homePageData, imageCheck } = useContext(AppContext);


useEffect(() => {
  toggleModal("homeCategoryModal", false); 
  handleHome();
}, []);  

  let i=0;
  return ( 
    <>
      <HeroSection categoryData={categoryListData}   />
      {homePageData.mostBookedServices && homePageData.mostBookedServices.length > 0 ? (
        <PopularServices />
      ) : null}
      <HowWorks />
      

      {homePageData.services && homePageData.services.length > 0 ? (
        homePageData.services.map((value, index) => {
          // counter maintain karo
          let bannerIndex = Math.floor((index + 1) / 2) - 1; 

          return (
            <div key={index}>
              <AllServices value={value} />

              {/* Har 2 service ke baad banner dikhana */}
              {(index + 1) % 2 === 0 && homePageData.banners && homePageData.banners[bannerIndex] && (
                <div className="container">
                  <img
                    src={imageCheck(homePageData.banners[bannerIndex].image)}
                    className="img-fluid"
                    alt={`Banner ${bannerIndex}`}
                  />
                </div>
              )}
            </div>
          );
        })
      ) : null}

        



      {/* <FeaturedServices /> */}
      {/* <KitchenServices /> */}
      {/* <div className="container">
        <img src="/assets/img/home/kitchenbanner.jpg" className="img-fluid" alt="img" />
      </div> */}
      {/* <TvServices /> */}
      {/* <div className="container">
        <img src="/assets/img/home/tvbanner.jpg" className="img-fluid" alt="img" />
      </div> */}
      {/* <EpServices /> */}
      {/* <div className="container">
        <img src="/assets/img/home/epbanner.jpg" className="img-fluid" alt="img" />
      </div> */}
      
      {/* <Links /> */}
      <CategoryModal />
    </>
  );
};

export default HomePage;