import React from "react";

import { AppContext } from "../../context/AppContext";
import { useContext } from "react";


import ServiceManJoinForm from "../../pages/Login/ServiceManJoinForm";
import { Link } from "react-router-dom";

const ServiceManJoinModal = () => {

  const { modals,toggleModal } = useContext(AppContext);

  return (
    <div
        className={`modal fade ${modals.serviceManJoinModal ? "show" : ""}`}
    >


      <div className="modal-dialog modal-md modal-dialog-centered">
        <div className="modal-content" style={{background: 'transparent', border: 0}}>

          <div className="wizard-fieldset">
          

            <Link
              className="modal-close-btn"
              onClick={() => toggleModal("serviceManJoinModal", false)}
            >
              <i className="fa fa-times"></i>
            </Link>
            
            <ServiceManJoinForm />
            
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default ServiceManJoinModal;
