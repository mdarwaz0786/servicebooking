import HeroSection from "./HeroSection";
import HowWorks from "./HowWorks";
import PopularServices from "./PopularServices";
import AllServices from "./AllServices";



import CategoryModal from "../../components/Modal/CategoryModal";


import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

 
const HomePage = () => {


  const { categoryListData, handleHome, toggleModal, homePageData, imageCheck } = useContext(AppContext);


  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


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
            <div key={index} className={`${(index + 1) % 2 !=0?'mt-4 mb-4':'mb-5'}`}>
              <AllServices value={value} position={(index + 1) % 2} />

              {/* Har 2 service ke baad banner dikhana */}
              {(index + 1) % 2 === 0 && homePageData.banners && homePageData.banners[bannerIndex] && (
                <div className="container mt-4">
                  <Link to={homePageData.banners[bannerIndex].link} target="_blank">
                    <img
                      src={imageCheck(width>767?homePageData.banners[bannerIndex].image:homePageData.banners[bannerIndex].mobileBanner)}
                      className="img-fluid w-100"
                      alt={`Banner ${bannerIndex}`}
                    />
                  </Link>
                </div>
              )}
            </div>
          );
        })
      ) : null}

        


      <CategoryModal />
    </>
  );
};

export default HomePage;