import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";
const CategoryMiniCard3 = ({ data = [], handleSubCategory }) => {
  const { Urls, postData, toggleModal, handleCategoryClick } = useContext(AppContext);
  
    

  return (
    
    <>    
      {data.map((value, index) => (
            <div className="col d-flex mb-4" onClick={() => handleCategoryClick(value)} 
            >
                <div className="category-item text-center flex-fill wow fadeInUp" data-wow-delay="0.2s">
                  <div className="mx-auto mb-3">
                    <img src="assets/img/icons/category-01.svg" className="img-fluid" alt="img" />
                  </div>
                  <h6 className="fs-14 mb-1">{value.name}</h6>              
                </div>
              </div> 
      ))}
    </>

  );
};

export default CategoryMiniCard3;
