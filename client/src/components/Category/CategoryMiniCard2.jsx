import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

const CategoryMiniCard = ({ value = [] }) => {
  const { handleCategoryClick, SERVER_BASE_URL } = useContext(AppContext);
  return (
    
    <>    
        <div className="col d-flex mb-4">
            <div className="category-item text-center flex-fill wow fadeInUp" data-wow-delay="0.2s">
              <div className="mx-auto mb-3">
                <img src={SERVER_BASE_URL+''+value.icon} className="img-fluid" alt="img" />
              </div>
              <h6 className="fs-14 mb-1">{value.name}</h6>              
            </div>
          </div> 
    </>

  );
};

export default CategoryMiniCard;
