import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";




const CategoryMiniCard2Mobile = ({ value = [] }) => {
  const { handleCategoryClick, setSelectedCategory, imageCheck } = useContext(AppContext);
  return (

    <>
      {/* style={{boxShadow: '0px 0px 17px -9px rgba(0, 0, 0, 0.5)'}} */}
      <div className="category-service rounded-3 cursor-pointer " style={{ cursor: 'pointer' }} onClick={() => setSelectedCategory(value._id)} >
        {/* card-body d-flex align-items-center gap-3 modal-category-card */}

          {/* Right Side Content */}
          <div className="align-items-center ">
            <div className="p-2">
              <h6 className="fw-bold mb-0 d-block">{value.name}</h6>
            </div>
          </div>
        
      </div>
    </>

  );
};

export default CategoryMiniCard2Mobile;
