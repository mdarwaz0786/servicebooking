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
import { useContext, useState } from "react";
 
const HomePage = () => {

  const [categoryData, setcategoryData] = useState(
    [
      {
        id: "1",
        name: "Women's Salon & Spa",
        icon: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg",
        image: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg",
        subCategory: [] // add subcategories if needed
      },
      {
        id: "2",
        name: "Men's Salon & Massage",
        icon: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg",
        image: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg",
        subCategory: []
      },
      {
        id: "3",
        name: "AC & Appliance Repair",
        icon: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg",
        image: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg",
        subCategory: [
          // Sub-categories examples (optional)
          {
            id: "3-1",
            name: "AC Service & Repair",
            icon: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg",
            image: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg",
            subSubCategory: [
              { id: "3-1-1", name: "Gas Refill", icon: "", image: "" },
              { id: "3-1-2", name: "Foam-jet Service", icon: "", image: "" }
            ]
          },
          {
            id: "3-2",
            name: "Washing Machine Repair",
            icon: "", image: "", subSubCategory: []
          }
        ]
      },
      {
        id: "4",
        name: "Cleaning & Pest Control",
        icon: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg",
        image: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg",
        subCategory: []
      },
      {
        id: "5",
        name: "Electrician, Plumber & Carpenter",
        icon: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg",
        image: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg",
        subCategory: []
      },
      {
        id: "6",
        name: "Native Water Purifier",
        icon: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg",
        image: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg",
        subCategory: []
      },
      {
        id: "7",
        name: "Painting & Waterproofing",
        icon: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg",
        image: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg",
        subCategory: []
      }
    ]
  );
  
  return ( 
    <>
      <HeroSection />
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
      <CategoryModal categoryData={categoryData} />
    </>
  );
};

export default HomePage;