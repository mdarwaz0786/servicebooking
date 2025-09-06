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


  const { Urls, postData, toggleModal } = useContext(AppContext);
  const [categoryData, setcategoryData] = useState([]);
  const [subcategoryData, setsubcategoryData] = useState([]);

  const handleCategory = async () => {
    try {
      const response = await postData({}, Urls.categoryList, "GET",1, 1);
      if (response?.data.length > 0) {
        setcategoryData(response.data);
      }
    } catch (error) {
      console.error("Cart API Error:", error);
    }
  }

  const handleSubCategory = async (id) => {

    // setsubcategoryData(categoryData);
    // toggleModal("homeCategoryModal",true)
    // console.log(categoryData[id].subcategories);

    try {
      const response = await postData({id:id}, Urls.subCategoryList, "GET");
      if (response?.data.length > 0) {
        setsubcategoryData(response.data);
      }
      toggleModal("homeCategoryModal",true)
    } catch (error) {
      console.error("Cart API Error:", error);
    }
  }

useEffect(() => {
  toggleModal("homeCategoryModal", false); 
  handleCategory();
}, []);  

  return ( 
    <>
      <HeroSection categoryData={categoryData} handleSubCategory={handleSubCategory} />
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
      <CategoryModal categoryData={subcategoryData} />
    </>
  );
};

export default HomePage;