import React from "react";

import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

import Categories from "../Category/Categories";

const CategoryModal = ({categoryData = []}) => {

  const { modals,toggleModal } = useContext(AppContext);

  

  return (
    <div
        className={`modal fade ${modals.homeCategoryModal ? "show" : ""}`}
        id="provider"
    >

      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header d-flex align-items-center justify-content-between">
            <h5></h5>
            <a
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => toggleModal("homeCategoryModal",false)}
            >
              <i className="ti ti-circle-x-filled fs-20"></i>
            </a>
          </div>

          <div className="wizard-fieldset">
            
            <Categories categoryData={categoryData} />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
