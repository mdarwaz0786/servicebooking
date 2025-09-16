import React from "react";

import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

import Categories from "../Category/Categories";

const CategoryModal = () => {

  const { modals,toggleModal, categoryModalListData, categoryModalItemData, categoryModalImage, SERVER_BASE_URL } = useContext(AppContext);

  return (
    <div
        className={`modal fade ${modals.homeCategoryModal ? "show" : ""}`}
        id="provider"
    >

      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header d-flex align-items-center justify-content-between">
            <h5>{categoryModalItemData.name}</h5>
            <a
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => toggleModal("homeCategoryModal",false)}
            >
              <i className="ti ti-circle-x-filled fs-20"></i>
            </a>
          </div>

          <div className="wizard-fieldset">
            <div className="modal-category-banner">
              <img src={SERVER_BASE_URL+''+categoryModalImage} />
            </div>
            
            <Categories categoryData={categoryModalListData} />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
