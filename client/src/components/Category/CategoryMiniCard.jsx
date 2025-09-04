import { Link } from "react-router-dom";

const CategoryMiniCard = ({ value = [] }) => {
  return (
    
    <>    
        <div className="col d-flex">
            <div className="category-item text-center flex-fill wow fadeInUp" data-wow-delay="0.2s">
              <div className="mx-auto mb-3">
                <img src="assets/img/icons/category-01.svg" className="img-fluid" alt="img" />
              </div>
              <h6 className="fs-14 mb-1">Construction</h6>
              <p className="fs-14 mb-0">9874 Listings</p>
              <Link to="/categories" className="link-primary text-decoration-underline fs-14">View All</Link>
            </div>
          </div> 
    </>

  );
};

export default CategoryMiniCard;
