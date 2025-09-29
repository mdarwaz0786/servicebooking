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
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                zIndex: 1,
              }}
              onClick={() => toggleModal("serviceManJoinModal",false)}
            >
              <i className="ti ti-circle-x-filled fs-20"></i>
            </Link>
            
            <ServiceManJoinForm />
            
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default ServiceManJoinModal;
