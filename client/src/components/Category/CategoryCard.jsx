import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

const CategoryCard = ({ value = [] }) => {
  const { handleCategoryClick, imageCheck } = useContext(AppContext);

  return (
    <div 
      className="col-lg-12 col-md-12 col-sm-12 col-12 mb-3" 
      onClick={() => handleCategoryClick(value)}
    >
      <div className="category card shadow-sm border-0 rounded-4 overflow-hidden cursor-pointer">
        <div className="card-body d-flex align-items-center gap-3">
          
          {/* Left Side Image */}
          <div className="flex-shrink-0">
            <img
              src={imageCheck(value.icon)}
              className="img-fluid rounded-3"
              alt={value.name}
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
            />
          </div>

          {/* Right Side Content */}
          <div className="flex-grow-1">
            <h6 className="fw-bold text-dark mb-1">{value.name}</h6>
            {value.image && (
              <img
                src={imageCheck(value.icon)}
                className="img-fluid rounded-3"
                alt={value.name}
                style={{ maxHeight: "120px", objectFit: "cover" }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
