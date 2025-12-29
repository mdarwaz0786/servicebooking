import React, { useState, useContext, useEffect, useRef } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import "./GoogleMapPicker.css"; // Create this CSS file if needed

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const AddressModal = ({ fetchAddresses, selectedAddress }) => {
  const { modals, toggleModal, postData, Urls } = useContext(AppContext);
  const [latLng, setLatLng] = useState({ lat: null, lng: null });
  const [houseNumber, sethouseNumber] = useState("");
  const [landmark, setlandmark] = useState("");
  const [addresstype, setaddresstype] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const formRef = useRef();

  // Google Maps related states
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isAutocompleteReady, setIsAutocompleteReady] = useState(false);
  const mapRef = useRef(null);
  const inputRef = useRef(null);
  const searchContainerRef = useRef(null);

  const containerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "8px"
  };

  const center = {
    lat: 28.6139,
    lng: 77.2090,
  };

  useEffect(() => {
    // अगर selectedAddress है, तो preview में show करो
    if (selectedAddress) {
      sethouseNumber(selectedAddress.houseNumber || "");
      setlandmark(selectedAddress.landmark || "");
      setaddresstype(selectedAddress.type || "");
      setLatLng({ 
        lat: selectedAddress.lat || null, 
        lng: selectedAddress.long || null 
      });
    }
  }, [selectedAddress]);

  // Load Google Maps script
  useEffect(() => {
    // Check if already loaded
    if (window.google && window.google.maps && window.google.maps.places) {
      setIsScriptLoaded(true);
      setTimeout(() => initMap(), 100);
      return;
    }

    // Remove any existing callback
    if (window.initGoogleMapCallback) {
      delete window.initGoogleMapCallback;
    }

    // Create callback function
    window.initGoogleMapCallback = () => {
      console.log("Google Maps script loaded successfully");
      setIsScriptLoaded(true);
      setTimeout(() => initMap(), 100);
    };

    // Load the script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places&callback=initGoogleMapCallback`;
    script.async = true;
    script.defer = true;
    script.onerror = (error) => {
      console.error("Failed to load Google Maps script:", error);
      setErrors(prev => ({ 
        ...prev, 
        map: "Failed to load Google Maps. Please check your API key." 
      }));
    };

    // Add to document
    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      if (window.initGoogleMapCallback) {
        delete window.initGoogleMapCallback;
      }
      // Cleanup map event listeners
      if (map) {
        window.google.maps.event.clearInstanceListeners(map);
      }
    };
  }, []);

  // Initialize Autocomplete
  useEffect(() => {
    if (isScriptLoaded && inputRef.current && !autocomplete) {
      setTimeout(() => initAutocomplete(), 500);
    }
  }, [isScriptLoaded, inputRef.current]);

  // Initialize Autocomplete
  const initAutocomplete = () => {
    if (!window.google || !window.google.maps.places || !inputRef.current) {
      console.log("Required Google APIs not available");
      return;
    }

    try {
      // Create autocomplete instance
      const autocompleteInstance = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ['geocode'],
          componentRestrictions: { country: 'in' },
          fields: ['geometry', 'formatted_address', 'name', 'place_id', 'address_components'],
        }
      );

      // Bind the autocomplete to the input
      autocompleteInstance.bindTo('bounds', new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(8.0, 68.0),
        new window.google.maps.LatLng(37.0, 97.0)
      ));

      // Add place changed listener
      autocompleteInstance.addListener('place_changed', () => {
        const place = autocompleteInstance.getPlace();
        
        if (!place.geometry) {
          console.log("No geometry found for place:", place);
          return;
        }

        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const newPosition = { lat, lng };
        
        // Update UI
        if (marker) {
          marker.setPosition(newPosition);
        }
        if (map) {
          map.setCenter(newPosition);
          map.setZoom(17);
        } else {
          initMapWithPosition(newPosition);
        }
        
        // Update states
        setLatLng(newPosition);
        if (place.formatted_address) {
          setSearchInput(place.formatted_address);
        }
        
        // Clear location error if any
        if (errors.location || errors.map) {
          setErrors(prev => ({ ...prev, location: null, map: null }));
        }
        
        setIsAutocompleteReady(true);
      });

      // Fix for z-index issue with dropdown
      const pacContainer = document.querySelector('.pac-container');
      if (pacContainer) {
        pacContainer.style.zIndex = '9999';
        pacContainer.style.position = 'fixed';
      }

      setAutocomplete(autocompleteInstance);
      setIsAutocompleteReady(true);
      
    } catch (error) {
      console.error("Error in initAutocomplete:", error);
      setIsAutocompleteReady(false);
    }
  };

  // Initialize map
  const initMap = () => {
    if (!window.google || !mapRef.current) {
      console.log("Map container or Google Maps not available");
      return;
    }

    try {
      const defaultCenter = latLng?.lat && latLng?.lng 
        ? { lat: latLng.lat, lng: latLng.lng }
        : center;

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        gestureHandling: 'greedy',
        clickableIcons: false
      });

      const markerInstance = new window.google.maps.Marker({
        map: mapInstance,
        draggable: true,
        animation: window.google.maps.Animation.DROP,
        position: defaultCenter,
      });

      // Map click listener
      mapInstance.addListener('click', (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        const newPosition = { lat, lng };
        
        markerInstance.setPosition(newPosition);
        setLatLng(newPosition);
        setSearchInput("");
        
        // Clear location error if any
        if (errors.location || errors.map) {
          setErrors(prev => ({ ...prev, location: null, map: null }));
        }
      });

      // Marker drag listener
      markerInstance.addListener('dragend', (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        const newPosition = { lat, lng };
        
        setLatLng(newPosition);
        setSearchInput("");
        
        // Clear location error if any
        if (errors.location || errors.map) {
          setErrors(prev => ({ ...prev, location: null, map: null }));
        }
      });

      setMap(mapInstance);
      setMarker(markerInstance);

      // Initialize autocomplete if not done
      if (!autocomplete && inputRef.current) {
        setTimeout(() => initAutocomplete(), 100);
      }

    } catch (error) {
      console.error("Error in initMap:", error);
    }
  };

  // Initialize map with position
  const initMapWithPosition = (position) => {
    if (!window.google || !mapRef.current) return;

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: position,
      zoom: 17,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
    });

    const markerInstance = new window.google.maps.Marker({
      map: mapInstance,
      draggable: true,
      position: position,
    });

    setMap(mapInstance);
    setMarker(markerInstance);
  };

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Handle search button click
  const handleSearchClick = () => {
    if (!searchInput.trim()) return;
    
    // Use geocoding as fallback
    performGeocoding(searchInput);
  };
  

  // Perform geocoding
  const performGeocoding = (address) => {
    if (!window.google?.maps?.Geocoder) {
      setErrors(prev => ({ 
        ...prev, 
        map: "Google Maps geocoding service not available. Please try again." 
      }));
      return;
    }
    
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ 
      address: address,
      region: 'in'
    }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        const newPosition = { lat, lng };
        
        if (marker) marker.setPosition(newPosition);
        if (map) {
          map.setCenter(newPosition);
          map.setZoom(17);
        } else {
          initMapWithPosition(newPosition);
        }
        
        setLatLng(newPosition);
        setSearchInput(results[0].formatted_address);
        
        // Clear location error if any
        if (errors.location || errors.map) {
          setErrors(prev => ({ ...prev, location: null, map: null }));
        }
      } else {
        setErrors(prev => ({ 
          ...prev, 
          map: "Could not find the address. Please try a different search term." 
        }));
      }
    });
  };

  // Handle Enter key in search
  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchClick();
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLatLng = { 
            lat: position.coords.latitude, 
            lng: position.coords.longitude 
          };
          setLatLng(newLatLng);
          
          // Update map if exists
          if (marker) {
            marker.setPosition(newLatLng);
          }
          if (map) {
            map.setCenter(newLatLng);
            map.setZoom(17);
          } else {
            initMapWithPosition(newLatLng);
          }
          
          // Clear location error if any
          setErrors(prev => ({ ...prev, location: null, map: null }));
        },
        (error) => {
          console.error("Error getting location:", error);
          let errorMessage = "Unable to fetch your location.";
          
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Location access denied. Please enable GPS permission.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage = "Location request timed out.";
              break;
            default:
              errorMessage = "An unknown error occurred.";
              break;
          }
          
          setErrors(prev => ({ 
            ...prev, 
            location: errorMessage 
          }));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setErrors(prev => ({ 
        ...prev, 
        location: "Geolocation is not supported by this browser." 
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!latLng.lat || !latLng.lng) {
      newErrors.location = "Please select a location on the map or use current location";
    }

    if (!houseNumber.trim()) {
      newErrors.houseNumber = "House/Flat number is required";
    }

    if (!addresstype) {
      newErrors.addresstype = "Please select an address type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (isSubmitting) return;

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await postData(
        {
          lat: latLng.lat,
          long: latLng.lng,
          houseNumber: houseNumber.trim(),
          landmark: landmark.trim(),
          type: addresstype,
        },
        Urls.addAddress,
        "POST"
      );
      if (response.success) {
        fetchAddresses();
        sethouseNumber("");
        setlandmark("");
        setaddresstype("");
        setLatLng({ lat: null, lng: null });
        setSearchInput("");
        setErrors({});
        toggleModal("addressModal", false);
      }
    } catch (error) {
      console.error("Address API Error:", error);
      setErrors(prev => ({ 
        ...prev, 
        submit: error.message || "Failed to save address. Please try again." 
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form के enter key press को handle करने के लिए
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && formRef.current) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleLatLngChange = (newLatLng) => {
    setLatLng(newLatLng);
    // Clear location error when user selects a location
    if (errors.location || errors.map) {
      setErrors(prev => ({ ...prev, location: null, map: null }));
    }
  };

  // Render Google Map Picker component
  const renderMapPicker = () => {
    return (
      <div className="google-map-picker" ref={searchContainerRef}>
        {/* Search Box */}
        <div className="mb-3">
          <div className="input-group google-map-search-container">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type address here (e.g., Connaught Place, Delhi)..."
              className="form-control google-map-search-input"
              value={searchInput}
              onChange={handleSearchInputChange}
              onKeyPress={handleSearchKeyPress}
              onFocus={() => {
                setTimeout(() => {
                  const pacContainer = document.querySelector('.pac-container');
                  if (pacContainer) {
                    pacContainer.style.display = 'block';
                    pacContainer.style.zIndex = '9999';
                  }
                }, 100);
              }}
              autoComplete="off"
              style={{
                padding: "12px 16px",
                fontSize: "16px",
                border: "2px solid #4a90e2",
                borderRadius: "8px 0 0 8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                position: "relative",
                zIndex: "100"
              }}
            />
            <button 
              className="btn btn-primary google-map-search-button" 
              type="button"
              onClick={handleSearchClick}
              style={{
                borderRadius: "0 8px 8px 0",
                padding: "12px 24px",
                fontWeight: "600"
              }}
            >
              <i className="fa fa-search me-2"></i>
              Search
            </button>
          </div>
                    
          {/* Status indicators */}
          <div className="mt-2">
            {!isScriptLoaded && (
              <small className="text-warning">
                <i className="fa fa-spinner fa-spin me-1"></i>
                Loading Google Maps...
              </small>
            )}
            {isScriptLoaded && !isAutocompleteReady && (
              <small className="text-info">
                <i className="fa fa-cog fa-spin me-1"></i>
                Setting up address search...
              </small>
            )}
            
          </div>
        </div>

        {/* Map Container */}
        <div 
          ref={mapRef} 
          style={containerStyle}
          className="google-map-container"
        />

        {/* Coordinates display */}
        <div className="mt-3">
          {latLng?.lat && latLng?.lng ? (
            <></>
          ) : (
            <div className="alert alert-warning py-2">
              <i className="fa fa-exclamation-triangle me-2"></i>
              No location selected yet. Search for an address or click on the map.
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`modal fade ${modals.addressModal ? "show" : ""}`} id="provider" style={{ display: modals.addressModal ? 'block' : 'none' }}>
      <div className="modal-dialog modal-xl modal-dialog-centered" style={{maxWidth: '75%'}}>
        <div className="modal-content" style={{ background: 'transparent', border: 0 }}>
          <div className="card shadow-lg border-0 m-0 p-4 rounded-4" style={{ width: "100%" }}>
            
            <Link
              className="modal-close-btn position-absolute"
              style={{ top: '15px', right: '20px', zIndex: 10 }}
              onClick={() => toggleModal("addressModal", false)}
            >
              <i className="fa fa-times"></i>
            </Link>
            
            {/* Error messages */}
            {errors.submit && (
              <div className="alert alert-danger mb-3">
                {errors.submit}
              </div>
            )}

            {/* Use Current Location */}
            <div className="mb-3">
              <button 
                className="btn btn-outline-primary d-flex align-items-center" 
                onClick={handleUseCurrentLocation}
                type="button"
              >
                <i className="fa fa-location-arrow me-2"></i> 
                <span>Use Current Location</span>
              </button>
              {errors.location && (
                <div className="text-danger small mt-1">
                  <i className="fa fa-exclamation-circle me-1"></i>
                  {errors.location}
                </div>
              )}
            </div>

            <form ref={formRef} onSubmit={handleSubmit} onKeyPress={handleKeyPress}>
              <div className="row g-4">
                {/* Map Picker */}
                <div className="col-lg-6">                  
                  {renderMapPicker()}                  
                  {/* Map loading/error message */}
                  {errors.map && (
                    <div className="alert alert-danger mt-3">
                      <i className="fa fa-exclamation-triangle me-2"></i>
                      {errors.map}
                    </div>
                  )}
                </div>

                {/* Address Form */}
                <div className="col-lg-6">
                  {/* Preview for Edit Mode */}
                  {selectedAddress && (
                    <div className="mb-4 p-3 bg-info bg-opacity-10 rounded">
                      <h6 className="fw-bold mb-2">
                        <i className="fa fa-edit me-2"></i>
                        Editing Address
                      </h6>
                      <p className="mb-0 text-dark">
                        {selectedAddress.houseNumber} {selectedAddress.landmark} 
                        <span className="badge bg-secondary ms-2">{selectedAddress.type}</span>
                      </p>
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      House/Flat Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., H-123, Floor 2, Block A"
                      className={`form-control ${errors.houseNumber ? 'is-invalid' : ''}`}
                      value={houseNumber}
                      onChange={(e) => {
                        sethouseNumber(e.target.value);
                        if (errors.houseNumber) {
                          setErrors(prev => ({ ...prev, houseNumber: null }));
                        }
                      }}
                      autoFocus
                    />
                    {errors.houseNumber && (
                      <div className="invalid-feedback">
                        <i className="fa fa-exclamation-circle me-1"></i>
                        {errors.houseNumber}
                      </div>
                    )}
                    <small className="text-muted">
                      Include flat number, floor, building name, etc.
                    </small>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Near Metro Station, Opposite Mall"
                      className="form-control"
                      value={landmark}
                      onChange={(e) => setlandmark(e.target.value)}
                    />
                    <small className="text-muted">
                      Nearby recognizable location
                    </small>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Address Type <span className="text-danger">*</span>
                    </label>
                    <div className="d-flex gap-3">
                      <div className="form-check">
                        <input
                          type="radio"
                          className={`form-check-input ${errors.addresstype ? 'is-invalid' : ''}`}
                          value="home"
                          id="homeType"
                          name="addresstype"
                          checked={addresstype === "home"}
                          onChange={(e) => {
                            setaddresstype(e.target.value);
                            if (errors.addresstype) {
                              setErrors(prev => ({ ...prev, addresstype: null }));
                            }
                          }}
                        />
                        <label className="form-check-label" htmlFor="homeType">
                          <i className="fa fa-home me-2"></i>Home
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          type="radio"
                          className={`form-check-input ${errors.addresstype ? 'is-invalid' : ''}`}
                          value="other"
                          id="otherType"
                          name="addresstype"
                          checked={addresstype === "other"}
                          onChange={(e) => {
                            setaddresstype(e.target.value);
                            if (errors.addresstype) {
                              setErrors(prev => ({ ...prev, addresstype: null }));
                            }
                          }}
                        />
                        <label className="form-check-label" htmlFor="otherType">
                          <i className="fa fa-map-marker me-2"></i>Other
                        </label>
                      </div>
                    </div>
                    {errors.addresstype && (
                      <div className="text-danger small mt-1">
                        <i className="fa fa-exclamation-circle me-1"></i>
                        {errors.addresstype}
                      </div>
                    )}
                  </div>

                  <div className="d-grid gap-2">
                    <button 
                      className="btn btn-success btn-lg" 
                      type="submit"
                      disabled={isSubmitting || !latLng.lat || !latLng.lng}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Saving Address...
                        </>
                      ) : (
                        <>
                          <i className="fa fa-save me-2"></i>
                          Save Address
                        </>
                      )}
                    </button>
                    
                    {/* Disabled button explanation */}
                    {(!latLng.lat || !latLng.lng) && (
                      <div className="text-center small text-warning mt-2">
                        <i className="fa fa-exclamation-triangle me-1"></i>
                        Please select a location on the map first
                      </div>
                    )}
                  </div>

                 
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;