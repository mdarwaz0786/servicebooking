import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const RateCardModal = () => {
  const { modals, toggleModal, rateCardDetailData, PriceFormat } = useContext(AppContext);

  return (
    <div
      className={`modal fade ${modals.RateCardModal ? "show" : ""}`}
      id="provider"
      style={{ display: modals.RateCardModal ? "block" : "none", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-3 overflow-hidden">
          
          {/* Header */}
          <div
            className="d-flex justify-content-between align-items-center px-4 py-3"
            style={{ background: "#196341", color: "#fff" }}
          >
            <h5 className="m-0 fw-bold text-white">Rate Card</h5>
            <Link
              className="text-white fs-4"
              onClick={() => {toggleModal("RateCardModal", false);toggleModal("ServiceDetailModal", true);}}
              style={{ cursor: "pointer" }}
            >
              <i className="fa fa-times"></i>
            </Link>
          </div>

          {/* Body */}
          <div className="modal-body p-4" style={{ maxHeight: "70vh", overflowY: "auto" }}>
            {rateCardDetailData?.rateGroups?.length > 0 ? (
              <div className="accordion" id="rateCard_accordion">
                {rateCardDetailData.rateGroups.map((group, index) => (
                  <div className="accordion-item border mb-3 rounded" key={index}>
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed fw-semibold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapseGroup${index}`}
                        aria-expanded="false"
                        aria-controls={`collapseGroup${index}`}
                      >
                        {group.title}
                      </button>
                    </h2>

                    <div
                      id={`collapseGroup${index}`}
                      className="accordion-collapse collapse"
                      data-bs-parent="#rateCard_accordion"
                    >
                      <div className="accordion-body p-0">
                        <table className="table table-bordered table-striped m-0">
                          <thead className="table-success">
                            <tr>
                              <th style={{ width: "70%" }}>Description</th>
                              <th style={{ width: "30%" }}>Service Charge</th>
                            </tr>
                          </thead>
                          <tbody>
                            {group?.rates?.map((rate, idx) => (
                              <tr key={idx}>
                                <td>{rate.description}</td>
                                <td>
                                  <strong>{PriceFormat(rate.serviceCharge.price)}</strong>
                                  {rate.serviceCharge.labourCharge && (
                                    <div className="text-muted small">
                                      + {PriceFormat(rate.serviceCharge.labourCharge)} (Labour)
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted py-5">No rate card data available.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateCardModal;
