import React, { useState } from "react";

import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

import { Link } from "react-router-dom";

const RateCardModal = () => {

    const { modals, toggleModal, rateCardDetailData, PriceFormat } = useContext(AppContext);

  return (
    <div
      className={`modal fade ${modals.RateCardModal ? "show" : ""}`}
      id="provider"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered pt-5">
        <div className="modal-content" style={{ border: 0, paddingTop: "0px" }}>
            <Link
              className="modal-close-btn"
              onClick={() => toggleModal("RateCardModal", false)}
            >
              <i className="fa fa-times"></i>
            </Link>
          <div className="wizard-fieldset">

            <div className="row">
                <div className="col-xl-12" style={{minHeight:'500px'}}>
                    
                    <h1
                    style={{
                        fontSize: '20px',
                        background: 'green',
                        padding: '10px 15px',
                        color: 'white',
                    }}
                    >Rate Card</h1>


                    <div className="accordion" id="rateCard_accordion">

                        <>                                                                                
                        {rateCardDetailData?.rateGroups?.map((value, index) => (
                                
                                <div className="accordion-item" key={index}>
                                    <h2 className="accordion-header">
                                        <button
                                        className="accordion-button"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#panelsStayOpen-collapseOne${index}`}
                                        aria-expanded="true"
                                        aria-controls={`panelsStayOpen-collapseOne${index}`}
                                        >
                                        {value.title}
                                        </button>
                                    </h2>
                                    <div
                                        id={`panelsStayOpen-collapseOne${index}`}
                                        className="accordion-collapse collapse show"
                                        data-bs-parent="#rateCard_accordion"
                                    >
                                        <div className="accordion-body">
                                            <table className="table">
                                                <tr>
                                                    <th className="p-0">Description</th>
                                                    <th className="p-0">Service Charge</th>
                                                </tr>
                                                {value?.rates?.map((value2, index2) => (
                                                    <tr key={index2+index}>
                                                        <td className="p-0">{value2.description}</td>
                                                        <td className="p-0">
                                                            <span>{PriceFormat(value2.serviceCharge.price)}</span>
                                                            {(value2.serviceCharge.labourCharge)?(
                                                                <span><br></br>{PriceFormat(value2.serviceCharge.labourCharge)}  (Labour)</span>
                                                            ):(null)}
                                                            
                                                        </td>
                                                    </tr>
                                                ))}

                                            </table>
                                        </div>
                                    </div>
                                </div>
                         ))}
                         </>

                        

                        
                    </div>




                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RateCardModal;
