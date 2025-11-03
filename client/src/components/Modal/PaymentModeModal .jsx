import React from "react";

import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

import LoginForm from "../../pages/Login/LoginForm";
import { Link } from "react-router-dom";

const PaymentModeModal = ({onSelect}) => {

  const { modals,toggleModal } = useContext(AppContext);
  const paymentModes = [
    { id: "online", name: "Online", icon: "💰" },
    { id: "cod", name: "Cash on Delivery", icon: "💵" },
  ];

  return (
    <div
        className={`modal fade ${modals.paymentModeModal ? "show" : ""}`}
        id="provider"
    >

      <div className="modal-dialog modal-md modal-dialog-centered">
        <div className="modal-content" style={{background: 'transparent', border: 0}}>

          <div className="wizard-fieldset">
          
            <Link
              className="modal-close-btn"
              onClick={() => toggleModal("paymentModeModal", false)}
            >
              <i className="fa fa-times"></i>
            </Link>
            
            <div className="card shadow-lg border-0 m-0 p-4 rounded-4" style={{  width: "100%" }}>
        
                {/* Payment Modes */}
                <div className="d-flex flex-column gap-2">
                    {paymentModes.map((mode) => (
                    <button
                        key={mode.id}
                        onClick={() => {
                        onSelect?.(mode.id);
                        toggleModal("paymentModal", false);
                        }}
                        className="btn btn-light border d-flex align-items-center justify-content-start gap-3 py-2 px-3 text-start shadow-sm hover-shadow"
                        style={{
                        borderRadius: "10px",
                        transition: "all 0.2s ease-in-out",
                        }}
                    >
                        <span className="fs-4">{mode.icon}</span>
                        <span className="fw-medium">{mode.name}</span>
                    </button>
                    ))}
                </div>

             </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModeModal;
