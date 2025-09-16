import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

import AddressModal from "../../components/Modal/AddressModal";
import GoogleMapPicker from "../../components/Google/GoogleMapPicker";
// import MapSelector from "../../components/Google/MapSelector";



const LocationBooking = () => {
 

    const {steps,toggleStep, Urls, postData, toast, generateUniqueId, toggleModal, setbookingAddress } = useContext(AppContext);
    const [addresses, setaddresses] = useState([]);
    const [selectedaddress, setselectedaddress] = useState();
    
    const fetchAddresses = async () => {
      try {   
        let userId = generateUniqueId();  
        const response = await postData({userId:userId}, Urls.addressList, "GET", 0, 1);
        
          setaddresses(response.data);
          
         
      } catch (error) { 
        console.error("Cart API Error:", error);
      }
    } 
      
  useEffect(() => {  
    fetchAddresses(); 
  }, []);  


      const handleRemoveAddress = async (id) => {
      try {   
        let userId = generateUniqueId();  
        const response = await postData({userId:userId}, Urls.removeAddress+'/'+id, "delete");
        
          fetchAddresses()
          
         
      } catch (error) { 
        console.error("Cart API Error:", error);
      }
    } 

 
  const selectAddress = (id) => {
    setselectedaddress(id);
    setbookingAddress(id);
  };
  



  const handleNext = () => {
    if(!selectedaddress) {
      toast.error("Select Address")
      return false;
    }
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
            <button className="btn btn-success" onClick={()=>toggleModal('addressModal',true)}>Add New Address</button>
          </div>

          
        </div>

        {/* Locations Grid */}
        <div className="row g-3">
         
          
          {addresses.map((value, index)=>(
            <div className="col-lg-4 col-md-6" key={index} onClick={()=>selectAddress(value._id)}>
              <div className={`card location-card mb-0 ${selectedaddress==value._id?'active':''}`}>
                <i className="fa fa-times addres-remove" onClick={()=>handleRemoveAddress(value._id)}></i>
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
      <AddressModal fetchAddresses={fetchAddresses} />
    </fieldset>
  );
};

export default LocationBooking;
