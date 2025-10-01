import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";
const CategoryMiniCard3 = ({ data = [], handleSubCategory, className='' }) => {
  const { Urls, postData, toggleModal, handleCategoryClick, imageCheck } = useContext(AppContext);
  
  

  return (
    
    <>    
      {data.map((value, index) => (
            <div className={className?className:'col d-flex mb-4'} onClick={() => handleCategoryClick(value)}
            key={index} 
            >
                <div className="category-item text-center flex-fill wow fadeInUp" data-wow-delay="0.2s">
                  <div className="mx-auto mb-1">
                    <img src={imageCheck(value.icon)} className="img-fluid" alt="img" />
                  </div>
                  <h6 className="fs-10 mb-1">{value.name}</h6>              
                </div>
              </div> 
      ))}
    </>

  );
};

export default CategoryMiniCard3;
