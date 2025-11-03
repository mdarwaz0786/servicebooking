import React from "react";

import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

import LoginForm from "../../pages/Login/LoginForm";
import { Link } from "react-router-dom";
import ServiceDetail from "../Service/ServiceDetail";

const ServiceDetailModal = () => {

  const { modals, toggleModal } = useContext(AppContext);

  return (
    <div
      className={`modal fade ${modals.ServiceDetailModal ? "show" : ""}`}
      id="provider"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered pt-5">
        <div className="modal-content" style={{ border: 0, paddingTop: "0px" }}>
            <Link
              className="modal-close-btn"
              onClick={() => toggleModal("ServiceDetailModal", false)}
            >
              <i className="fa fa-times"></i>
            </Link>
          <div className="wizard-fieldset">

            <ServiceDetail />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailModal;
