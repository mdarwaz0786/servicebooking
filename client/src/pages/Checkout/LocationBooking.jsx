import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

import AddressModal from "../../components/Modal/AddressModal";
import GoogleMapPicker from "../../components/Google/GoogleMapPicker";
// import MapSelector from "../../components/Google/MapSelector";



const LocationBooking = () => {


    const {steps,toggleStep, Urls, postData, generateUniqueId, toggleModal } = useContext(AppContext);
    const [addresses, setaddresses] = useState([]);
    const [selectedaddress, setselectedaddress] = useState([]);
    const [addressSectionShow, setaddressSectionShow] = useState(false);
    const [latLng, setLatLng] = useState({ lat: null, lng: null });
    const fetchAddresses = async () => {
      try {   
        let userId = generateUniqueId();  
        const response = await postData({userId:userId}, Urls.addressList, "GET");
        
          setaddresses(response.data);
          
         
      } catch (error) { 
        console.error("Cart API Error:", error);
      }
    } 
   
  useEffect(() => {  
    fetchAddresses(); 
  }, []);  

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
  const selectAddress = (id) => {
    setselectedaddress(id);
  };
  



  const handleNext = () => {
    toggleStep('location',false)
    // toggleStep('additionalservice',true)
    toggleStep('datetime',true)
  }

  return (
    <fieldset className={`booking-content wizard-fieldset ${steps.location ? "d-flex" : "d-none"}`} id="first-field">
      
      <div className="book-card">
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between flex-wrap booking-title">
          <div className="d-flex align-items-center mb-2">
            <h6 className="fs-16 me-2 mb-2">Select Location</h6>
            <span className="badge badge-info-transparent mb-2">Total : {addresses.length}</span>
          </div>
          <div className="d-flex align-items-center mb-2">
            <button className="btn btn-success" onClick={()=>setaddressSectionShow(true)}>Add Address</button>
          </div>

          
        </div>

        {/* Locations Grid */}
        <div className="row g-3">
         
          
          {addresses.map((value, index)=>(
            <div className="col-lg-4 col-md-6" key={index} onClick={()=>selectAddress(value._id)}>
              <div className={`card location-card mb-0 ${selectedaddress==value._id?'active':''}`}>
                <div className="card-body p-3 text-center">
                  <div className="trend-icon">
                    <span className="bg-info">
                      <img src="assets/img/icons/loc-icon.svg" alt="icon" />
                    </span>
                  </div>
                  <span className="avatar avatar-lg mx-auto mb-2">
                    {/* <img src="assets/img/icons/service-01.svg" alt="img" /> */}
                    <i className="fa fa-map-marker-alt" style={{color:'green',fontSize:'35px'}}></i>
                  </span>
                  <h6 className="mb-2 fw-medium">
                    {value.type}
                  </h6>
                  <p className="d-flex align-items-center justify-content-center mb-2">
                    <i className="ti ti-map-pin-check me-1"></i>{value.houseNumber} {value.landmark}
                  </p>
                </div>
              </div>
            </div>
            ))}

            
            <div className={`address-add-section ${addressSectionShow?'d-block':'d-none'}`}>
              <input type="text" className="form-control" placeholder="Search by location..." />
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
                  <GoogleMapPicker setLatLng={setLatLng} />
                  </div>
                  <div className="col-6">
                      <h2>Dr KB Hedgewar Marg</h2>
                      <p>Dr KB Hedgewar Marg, Block GH 4, Meera Bagh, Tilak Nagar, New Delhi, Delhi, 110087, India</p>
                      <input type="text" placeholder="House/Flat Number*" className="form-control" />
                      <input type="text" placeholder="Landmark (Optional)*" className="form-control mt-3" />
                      <label>
                        <input type="radio" value="home" name="addresstype" />
                        Home
                      </label>
                      <label>
                        <input type="radio" value="other" name="addresstype"/>
                        Other
                      </label>
                      <br/>
                      <button className="btn btn-success">Save and proceed</button>

                  </div>
              </div>
            </div>


          {/* Repeat same for other locations... */}
        </div>
      </div>

      {/* Footer */}
      <div className="booking-footer d-flex align-items-center justify-content-end">
        <Link
          className="btn btn-sm btn-dark d-inline-flex align-items-center next_btn"
          onClick={handleNext}
        >
          Next <i className="ti ti-arrow-right ms-1"></i>
        </Link>
      </div>
      {/* <AddressModal/> */}
    </fieldset>
  );
};

export default LocationBooking;
