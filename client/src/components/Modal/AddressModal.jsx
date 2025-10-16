import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import GoogleMapPicker from "../Google/GoogleMapPicker";
import { Link } from "react-router-dom";

const AddressModal = ({ fetchAddresses, selectedAddress }) => {
  const { modals, toggleModal, postData, Urls } = useContext(AppContext);
  const [latLng, setLatLng] = useState({ lat: null, lng: null });
  const [houseNumber, sethouseNumber] = useState("");
  const [landmark, setlandmark] = useState("");
  const [addresstype, setaddresstype] = useState("");

  useEffect(() => {
    // अगर selectedAddress है, तो preview में show करो
    if (selectedAddress) {
      sethouseNumber(selectedAddress.houseNumber || "");
      setlandmark(selectedAddress.landmark || "");
      setaddresstype(selectedAddress.type || "");
      setLatLng({ lat: selectedAddress.lat || null, lng: selectedAddress.long || null });
    }
  }, [selectedAddress]);

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatLng({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to fetch your location. Please enable GPS.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await postData(
        {
          lat: latLng?.lat,
          long: latLng?.lng,
          houseNumber,
          landmark,
          addresstype,
        },
        Urls.addAddress,
        "POST"
      );
      if (response.success) {
        fetchAddresses();
        sethouseNumber("");
        setlandmark("");
        setaddresstype("");
        toggleModal("addressModal", false);
      }
    } catch (error) {
      console.error("Cart API Error:", error);
    }
  };

  return (
    <div className={`modal fade ${modals.addressModal ? "show" : ""}`} id="provider">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content" style={{ background: 'transparent', border: 0 }}>

          <div className="card shadow-lg border-0 m-0 p-4 rounded-4" style={{ width: "100%" }}>
            <Link
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                zIndex: 1,
              }}
              onClick={() => toggleModal("addressModal", false)}
            >
              <i className="ti ti-circle-x-filled fs-20"></i>
            </Link>
            {/* Use Current Location */}
            <div className="mb-3">
              <button className="btn btn-outline-primary" onClick={handleUseCurrentLocation}>
                <i className="fa fa-location-arrow me-2"></i> Use Current Location
              </button>
            </div>

            <div className="row g-4">
              {/* Map Picker */}
              <div className="col-lg-6">
                <GoogleMapPicker setLatLng={setLatLng} latLng={latLng} />
              </div>

              {/* Address Form */}
              <div className="col-lg-6">
                {/* Preview */}
                {selectedAddress && (
                  <div className="mb-3">
                    <h6 className="fw-bold">Selected Address</h6>
                    <p className="text-muted">
                      {selectedAddress.houseNumber} {selectedAddress.landmark} ({selectedAddress.type})
                    </p>
                  </div>
                )}

                <input
                  type="text"
                  placeholder="House/Flat Number*"
                  className="form-control mb-3"
                  value={houseNumber}
                  onChange={(e) => sethouseNumber(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Landmark (Optional)"
                  className="form-control mb-3"
                  value={landmark}
                  onChange={(e) => setlandmark(e.target.value)}
                />

                <div className="mb-3 d-flex gap-3">
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      value="home"
                      name="addresstype"
                      checked={addresstype === "home"}
                      onChange={(e) => setaddresstype(e.target.value)}
                    />
                    <label className="form-check-label">Home</label>
                  </div>

                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      value="other"
                      name="addresstype"
                      checked={addresstype === "other"}
                      onChange={(e) => setaddresstype(e.target.value)}
                    />
                    <label className="form-check-label">Other</label>
                  </div>
                </div>

                <button className="btn btn-success w-100" onClick={handleSubmit}>
                  Save and Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
