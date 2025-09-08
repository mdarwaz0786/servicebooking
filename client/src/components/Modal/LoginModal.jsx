import React from "react";

import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

import Categories from "../Category/Categories";
import LoginForm from "../../pages/Login/LoginForm";

const LoginModal = () => {

  const { modals,toggleModal } = useContext(AppContext);

  return (
    <div
        className={`modal fade ${modals.loginModal ? "show" : ""}`}
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
              onClick={() => toggleModal("loginModal",false)}
            >
              <i className="ti ti-circle-x-filled fs-20"></i>
            </a>
          </div>

          <div className="wizard-fieldset p-4">
            
            <LoginForm />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
