import React, { useState } from "react";

import { AppContext } from "../../context/AppContext";
import { useContext } from "react";


import { Link } from "react-router-dom";
import GoogleMapPicker from "../Google/GoogleMapPicker";

const AddressModal = ({fetchAddresses}) => {

  const { modals,toggleModal, postData, Urls } = useContext(AppContext);
  const [latLng, setLatLng] = useState({ lat: null, lng: null });
  const [houseNumber, sethouseNumber] = useState('');
  const [landmark, setlandmark] = useState('');
  const [addresstype, setaddresstype] = useState('');

   const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLatLng({ lat, lng });
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
      const response = await postData({lat:latLng?.lat,long:latLng?.lng,houseNumber:houseNumber,landmark:landmark,addresstype:addresstype}, Urls.addAddress, "POST");
      if (response.success) {
        fetchAddresses()
        sethouseNumber('')
        setaddresstype('')
        setlandmark('')
        toggleModal('addressModal',false)
      } 
    } catch (error) { 
      console.error("Cart API Error:", error);
    }
  }

  return (
    <div
        className={`modal fade ${modals.addressModal ? "show" : ""}`}
        id="provider"
    >

      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header d-flex align-items-center justify-content-between">
            <h5>Search and select address </h5>
            <a
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => toggleModal("addressModal",false)}
            >
              <i className="ti ti-circle-x-filled fs-20"></i>
            </a>
          </div>

          <div className="wizard-fieldset p-4">
            
            <div className={`address-add-section `}>
                <Link
                className="mt-2 b-block"
                style={{ display: "block", cursor: "pointer" }}
                onClick={handleUseCurrentLocation}
              >
                <i className="fa fa-location"></i>&nbsp;&nbsp;
                Use current location
              </Link>

              <div className="row">
                  <div className="col-6">
                  <GoogleMapPicker setLatLng={setLatLng} latLng={latLng} />
                  </div>
                  <div className="col-6">
                      <h2>Dr KB Hedgewar Marg</h2>
                      <p>Dr KB Hedgewar Marg, Block GH 4, Meera Bagh, Tilak Nagar, New Delhi, Delhi, 110087, India</p>
                      <input type="text" placeholder="House/Flat Number*" className="form-control"
                      value={houseNumber}
                      onChange={(e) => sethouseNumber(e.target.value)}
                      />
                      <input type="text" placeholder="Landmark (Optional)*" className="form-control mt-3" 
                      value={landmark}
                      onChange={(e) => setlandmark(e.target.value)}
                      />
                      <label>
                        <input type="radio" value="home" name="addresstype" 
                        checked={addresstype === "home"}
                        onChange={(e) => setaddresstype(e.target.value)}
                        />
                        Home
                      </label>
                      <label>
                        <input type="radio" value="other" name="addresstype" 
                        checked={addresstype === "other"}
                        onChange={(e) => setaddresstype(e.target.value)}
                        />
                        Other
                      </label>
                      <br/>
                      <button className="btn btn-success" onClick={handleSubmit}>Save and proceed</button>

                  </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
