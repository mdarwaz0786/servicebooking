import React from "react";

import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

import LoginForm from "../../pages/Login/LoginForm";
import { Link } from "react-router-dom";

const LoginModal = () => {

  const { modals,toggleModal } = useContext(AppContext);

  return (
    <div
        className={`modal fade ${modals.loginModal ? "show" : ""}`}
        id="provider"
    >

      <div className="modal-dialog modal-md modal-dialog-centered">
        <div className="modal-content" style={{background: 'transparent', border: 0}}>

          <div className="wizard-fieldset">
          <Link
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                zIndex: 1,
              }}
              onClick={() => toggleModal("loginModal",false)}
            >
              <i className="ti ti-circle-x-filled fs-20"></i>
            </Link>
            
            <LoginForm />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
