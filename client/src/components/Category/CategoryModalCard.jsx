import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

const CategoryCard = ({ value = [] }) => {
  const { handleCategoryClick, imageCheck } = useContext(AppContext);

  return (
    <div 
      className="col-lg-12 col-md-12 col-sm-12 col-12 m-1" 
      onClick={() => handleCategoryClick(value)}
    >
      <div className="category rounded-4 overflow-hidden cursor-pointer mb-4" style={{boxShadow: '0px 0px 17px -9px rgba(0, 0, 0, 0.5)'}}>
        <div className="card-body d-flex align-items-center gap-3 modal-category-card ">

          {/* Right Side Content */}
          <div className="d-flex align-items-center">
            
            <div>
                <img
                src={imageCheck(value.icon)}
                className="img-fluid rounded-3"
                alt={value.name}
                style={{ maxHeight: "120px", objectFit: "cover" }}
                />
            </div>
            <div className="p-2">
                <h6 className="fw-bold mb-1 fs-3 me-2 d-block">{value.name}</h6>
                <p>{value.sort_description}</p>
            </div>
            <div>
                <i className="fa fa-angle-double-right fs-4 text-success"></i>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
