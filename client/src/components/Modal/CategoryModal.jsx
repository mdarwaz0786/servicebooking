import React from "react";

import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

import Categories from "../Category/Categories";
import { Link } from "react-router-dom";

const CategoryModal = () => {

  const { modals,toggleModal, categoryModalListData, categoryModalItemData, categoryModalImage, SERVER_BASE_URL } = useContext(AppContext);

  return (
    <div
        className={`modal fade ${modals.homeCategoryModal ? "show" : ""}`}
        id="provider"
    >

      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content" style={{background: 'transparent', border: 0}}>
          

          <div className="wizard-fieldset">
            <Link
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                zIndex: 1,
              }}
              onClick={() => toggleModal("homeCategoryModal",false)}
            >
              <i className="ti ti-circle-x-filled fs-20"></i>
            </Link>


            <div className="card shadow-lg border-0 m-0 rounded-4 overflow-hidden" style={{ width: "100%" }}>
              {/* Banner */}
              <div className="modal-category-banner">
                <img 
                  src={SERVER_BASE_URL + categoryModalImage} 
                  className="img-fluid w-100" 
                  style={{ height: "180px", objectFit: "cover" }} 
                  alt="Category Banner"
                />
              </div>

              {/* Title */}
              <div className="p-3 pb-2 text-center fs-17" >
                <h4 className="fw-bold fs-18" style={{color:'#198754'}}>{categoryModalItemData.name}</h4>
              </div>

              {/* Categories List */}
              <div className="row">
                <Categories categoryData={categoryModalListData} />
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
