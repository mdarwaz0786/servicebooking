import { Link } from "react-router-dom";

const CategoryMiniCard = ({ value = [] }) => {
  return (
    
    <>    
        <div className="col d-flex mb-4">
            <div className="category-item text-center flex-fill wow fadeInUp" data-wow-delay="0.2s">
              <div className="mx-auto mb-3">
                <img src="assets/img/icons/category-01.svg" className="img-fluid" alt="img" />
              </div>
              <h6 className="fs-14 mb-1">Construction</h6>              
            </div>
          </div> 
    </>

  );
};

export default CategoryMiniCard;
