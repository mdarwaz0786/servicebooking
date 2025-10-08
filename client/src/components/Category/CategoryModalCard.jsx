import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

const CategoryCard = ({ value = [] }) => {
  const { handleCategoryClick, imageCheck } = useContext(AppContext);

  return (
    <div 
      className="col-2 p-1 mb-1" 
      onClick={() => handleCategoryClick(value)}
    >
      
        <div className="card-body modal-category-card ">
          <img
          src={imageCheck(value.icon)}
          className="img-fluid rounded-3"
          alt={value.name}
          />
          <h6 className="">{value.name}</h6>
        </div>
      
    </div>
  );
};

export default CategoryCard;
