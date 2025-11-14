import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

import AddressModal from "../../components/Modal/AddressModal";


const LocationBooking = () => {
  const { steps, toggleStep, Urls, postData, toast, generateUniqueId, toggleModal, setbookingAddress  } =
    useContext(AppContext);
  const [addresses, setaddresses] = useState([]);
  const [selectedaddress, setselectedaddress] = useState();

  const fetchAddresses = async () => {
    try {
      let userId = generateUniqueId();
      const response = await postData({ userId: userId }, Urls.addressList, "GET", 0, 1);
      setaddresses(response.data);
      if(response?.data)
      {
        setselectedaddress(response.data[0]._id)
        setbookingAddress(response.data[0]._id)
      }
    } catch (error) {
      console.error("Address API Error:", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleRemoveAddress = async (id) => {
    try {
      let userId = generateUniqueId();
      await postData({ userId: userId }, Urls.removeAddress + "/" + id, "DELETE");
      fetchAddresses();
    } catch (error) {
      console.error("Remove Address Error:", error);
    }
  };

  const selectAddress = (id) => {
    setselectedaddress(id);
    setbookingAddress(id);
  };

  const handleNext = () => {
    if (!selectedaddress) {
      toast.error("Select Address");
      return false;
    }
    toggleStep("location", false);
    toggleStep("datetime", true);
  };

  return (
    <fieldset className={`booking-content wizard-fieldset ${steps.location ? "d-flex flex-column" : "d-none"}`}>
      <div className="book-card p-3 rounded-4 shadow-sm">
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between flex-wrap mb-3">
          <h5 className="fw-bold text-success">Select Location</h5>
          {/* <span className="badge bg-light text-success">Total: {addresses.length}</span> */}
          <button className="btn btn-success btn-sm" onClick={() => toggleModal("addressModal", true)}>
            Add New Address
          </button>
        </div>

        {/* Locations Grid */}
        <div className="row g-3">
          {addresses.map((value, index) => (
            <div className="col-lg-4 col-md-6" key={index} onClick={() => selectAddress(value._id)}>
              <div
                className={`card location-card mb-0 shadow-sm rounded-4 position-relative ${selectedaddress === value._id ? "border border-2 border-success" : ""
                  }`}
              >
                {/* Remove Icon */}
                <i
                  className="fa fa-times text-danger position-absolute top-2 end-2 p-2 cursor-pointer"
                  onClick={() => handleRemoveAddress(value._id)}
                ></i>

                <div className="card-body text-center p-3">
                  <div className="trend-icon1 mb-2">
                    <span className="bg-light rounded-circle d-inline-flex justify-content-center align-items-center p-3 shadow-sm">
                      <i className="fa fa-map-marker-alt text-success fs-4"></i>
                    </span>
                  </div>

                  <h6 className="mb-1 fw-bold text-dark">{value.type.charAt(0).toUpperCase() + value.type.slice(1)}</h6>
                  <p className="text-muted mb-0">
                    {value.houseNumber} {value.landmark}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="booking-footer d-flex justify-content-end mt-3">
        <Link className="btn btn-success d-inline-flex align-items-center" onClick={handleNext}>
          Next <i className="ti ti-arrow-right ms-2"></i>
        </Link>
      </div>

      <AddressModal fetchAddresses={fetchAddresses} />
    </fieldset>
  );
};

export default LocationBooking;
