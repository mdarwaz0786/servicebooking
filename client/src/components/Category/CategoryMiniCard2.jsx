import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

const CategoryMiniCard = ({ value = [] }) => {
  const { handleCategoryClick, imageCheck } = useContext(AppContext);
  return (
    
    <>    
    {/* style={{boxShadow: '0px 0px 17px -9px rgba(0, 0, 0, 0.5)'}} */}
        <div className="category p-0 rounded-3 overflow-hidden cursor-pointer mb-2" style={{cursor: 'pointer'}} >
          {/* card-body d-flex align-items-center gap-3 modal-category-card */}
        <div className=" ">

          {/* Right Side Content */}
          <div className="row align-items-center">
            
            <div className="col-3">
                <img
                src={imageCheck(value.icon)}
                className="img-fluid rounded-3"
                alt={value.name}
                style={{ maxHeight: "55px", objectFit: "cover" }}
                />
            </div>
            <div className="p-2 col-7">
                <h6 className="fw-bold mb-0 d-block"><Link to={'#'+value._id}>{value.name}</Link></h6>
                <p
                style={{
                  overflow: 'hidden',
                  whiteSpace: 'pre',
                  textOverflow: 'ellipsis',
                  width: '170px',
                  fontSize: '10px',
                  margin: '0',
                  lineHeight: 1,
                }}
                >{value.sort_description}</p>
            </div>
            <div className="col-2">
                <i className="fa fa-angle-double-right fs-4 text-success"></i>
            </div>
            
          </div>
        </div>
      </div>
    </>

  );
};

export default CategoryMiniCard;
