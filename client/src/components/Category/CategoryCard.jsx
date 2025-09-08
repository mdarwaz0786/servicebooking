import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";

const CategoryCard = ({ value = [] }) => {

    const { Urls, postData, toggleModal, handleCategoryClick } = useContext(AppContext);

  return (
    
    <>    
        <div key={value.id} className="col-lg-3 col-md-6" onClick={() => handleCategoryClick(value)}>
            <div className="category card wow fadeInUp" data-wow-delay="0.3s">
                <div className="card-body">
                <div className="feature-icon d-flex justify-content-center align-items-center mb-2">
                    <span className="rounded-pill d-flex justify-content-center align-items-center p-3">
                    <img src={value.icon} className="img-fluid" alt={value.name} />
                    </span>
                </div>
                <h5 className="text-center">
                    <Link key={value.id}>{value.name}</Link>
                </h5>
                <div className="overlay">
                    <img src={value.image} className="img-fluid" alt={value.name} />
                </div>
                </div>
            </div>
        </div>   
    </>

  );
};

export default CategoryCard;
