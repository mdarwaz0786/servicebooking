import React, { useState, useContext, useEffect, useRef } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import "./GoogleMapPicker.css";

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
  const [currentAddressDetails, setCurrentAddressDetails] = useState(null);
  const [isAutoFilled, setIsAutoFilled] = useState(false);
  const mapRef = useRef(null);
  const inputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const autocompleteServiceRef = useRef(null);
  const placesServiceRef = useRef(null);

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
      setSearchInput(selectedAddress.formattedAddress || "");
      setIsAutoFilled(false); // Edit mode में auto-fill disable
    }
  }, [selectedAddress]);

  // When location changes, fetch address details and auto-fill form
  useEffect(() => {
    if (latLng.lat && latLng.lng && !selectedAddress) {
      fetchAddressDetails(latLng);
    }
  }, [latLng]);

  // Fetch address details from coordinates
  const fetchAddressDetails = (coordinates) => {
    if (!window.google?.maps?.Geocoder) return;
    
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: coordinates }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const address = results[0];
        setCurrentAddressDetails(address);
        autoFillFormFields(address);
      }
    });
  };

  // Auto-fill form fields based on address details
  const autoFillFormFields = (address) => {
    let houseNumberTemp = "";
    let landmarkTemp = "";
    
    // Extract address components
    const addressComponents = address.address_components || [];
    
    // Find house number (street_number)
    const streetNumber = addressComponents.find(comp => 
      comp.types.includes('street_number')
    );
    
    // Find route (street name)
    const route = addressComponents.find(comp => 
      comp.types.includes('route')
    );
    
    // Find locality
    const locality = addressComponents.find(comp => 
      comp.types.includes('locality') || comp.types.includes('sublocality')
    );
    
    // Find landmark (premise, point_of_interest, establishment)
    const landmarkComp = addressComponents.find(comp => 
      comp.types.includes('premise') || 
      comp.types.includes('point_of_interest') || 
      comp.types.includes('establishment')
    );
    
    // Find sublocality (for landmark)
    const sublocality = addressComponents.find(comp => 
      comp.types.includes('sublocality')
    );
    
    // Build house number field - यहाँ हम complete formatted address लेते हैं
    if (address.formatted_address) {
      // Complete formatted address को house number field में डालें
      houseNumberTemp = address.formatted_address;
    } else if (streetNumber && route) {
      houseNumberTemp = `${streetNumber.long_name}, ${route.long_name}`;
    } else if (route) {
      houseNumberTemp = route.long_name;
    } else if (streetNumber) {
      houseNumberTemp = streetNumber.long_name;
    }
    
    // Build landmark field
    if (landmarkComp) {
      landmarkTemp = landmarkComp.long_name;
    } else if (sublocality) {
      landmarkTemp = sublocality.long_name;
    } else if (locality) {
      landmarkTemp = locality.long_name;
    }
    
    // Always update house number with the formatted address from search
    if (houseNumberTemp) {
      sethouseNumber(houseNumberTemp);
    }
    
    // Update landmark if available
    if (landmarkTemp) {
      setlandmark(landmarkTemp);
    }
    
    // Mark as auto-filled
    if (!selectedAddress) {
      setIsAutoFilled(true);
    }
  };

  // Load Google Maps script
  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      console.log("Google Maps already loaded");
      setIsScriptLoaded(true);
      initGoogleServices();
      return;
    }

    if (window.initGoogleMapCallback) {
      delete window.initGoogleMapCallback;
    }

    window.initGoogleMapCallback = () => {
      console.log("Google Maps script loaded successfully");
      setIsScriptLoaded(true);
      initGoogleServices();
    };

    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      console.log("Google Maps script already loading");
      return;
    }

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

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      if (window.initGoogleMapCallback) {
        delete window.initGoogleMapCallback;
      }
    };
  }, []);

  // Initialize Google services
  const initGoogleServices = () => {
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      console.error("Google Maps API not available");
      return;
    }

    try {
      autocompleteServiceRef.current = new window.google.maps.places.AutocompleteService();
      placesServiceRef.current = new window.google.maps.places.PlacesService(document.createElement('div'));
      
      initMap();
      setIsAutocompleteReady(true);
      
      setTimeout(fixAutocompleteDropdown, 500);
      
    } catch (error) {
      console.error("Error initializing Google services:", error);
    }
  };

  // Fix autocomplete dropdown styling
  const fixAutocompleteDropdown = () => {
    const interval = setInterval(() => {
      const pacContainer = document.querySelector('.pac-container');
      if (pacContainer) {
        pacContainer.style.zIndex = '999999';
        pacContainer.style.position = 'absolute';
        pacContainer.style.borderRadius = '8px';
        pacContainer.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        pacContainer.style.border = '1px solid #e0e0e0';
        clearInterval(interval);
      }
    }, 100);
  };

  // Initialize Autocomplete
  useEffect(() => {
    if (isScriptLoaded && inputRef.current && window.google?.maps?.places) {
      setTimeout(() => initAutocomplete(), 300);
    }
  }, [isScriptLoaded, inputRef.current]);

  // Initialize Autocomplete
  const initAutocomplete = () => {
    if (!window.google || !window.google.maps.places || !inputRef.current) {
      console.log("Required Google APIs not available");
      return;
    }

    try {
      const autocompleteInstance = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ['geocode'],
          componentRestrictions: { country: 'in' },
          fields: ['geometry', 'formatted_address', 'name', 'place_id', 'address_components'],
        }
      );

      const bounds = new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(8.0, 68.0),
        new window.google.maps.LatLng(37.0, 97.0)
      );
      autocompleteInstance.setBounds(bounds);

      autocompleteInstance.addListener('place_changed', () => {
        const place = autocompleteInstance.getPlace();
        
        if (!place.geometry) {
          console.log("No geometry found for place:", place);
          if (place.place_id) {
            getPlaceDetails(place.place_id);
          }
          return;
        }

        handlePlaceSelection(place);
      });

      setAutocomplete(autocompleteInstance);
      setIsAutocompleteReady(true);
      
      fixAutocompleteDropdown();
      
    } catch (error) {
      console.error("Error in initAutocomplete:", error);
      setIsAutocompleteReady(false);
    }
  };

  // Get place details using place_id
  const getPlaceDetails = (placeId) => {
    if (!placesServiceRef.current) return;
    
    placesServiceRef.current.getDetails(
      {
        placeId: placeId,
        fields: ['geometry', 'formatted_address', 'name', 'address_components']
      },
      (place, status) => {
        if (status === 'OK' && place.geometry) {
          handlePlaceSelection(place);
        } else {
          console.error("Failed to get place details:", status);
        }
      }
    );
  };

  // Handle place selection
  const handlePlaceSelection = (place) => {
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
      // DIRECT: जो search में typed address है, उसे सीधे house number में fill करें
      sethouseNumber(place.formatted_address);
    }
    
    // Auto-fill form fields from place details
    autoFillFormFields(place);
    
    // Clear location error if any
    if (errors.location || errors.map) {
      setErrors(prev => ({ ...prev, location: null, map: null }));
    }
    
    // Mark as auto-filled
    setIsAutoFilled(true);
  };

  // Handle map click for location selection
  const handleMapClick = (event, markerInstance) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const newPosition = { lat, lng };
    
    markerInstance.setPosition(newPosition);
    setLatLng(newPosition);
    setSearchInput("");
    
    // Fetch address details for clicked location
    fetchAddressDetails(newPosition);
    
    // Clear location error if any
    if (errors.location || errors.map) {
      setErrors(prev => ({ ...prev, location: null, map: null }));
    }
  };

  // Handle marker drag
  const handleMarkerDrag = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const newPosition = { lat, lng };
    
    setLatLng(newPosition);
    setSearchInput("");
    
    // Fetch address details for dragged location
    fetchAddressDetails(newPosition);
    
    // Clear location error if any
    if (errors.location || errors.map) {
      setErrors(prev => ({ ...prev, location: null, map: null }));
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
        clickableIcons: false,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      });

      const markerInstance = new window.google.maps.Marker({
        map: mapInstance,
        draggable: true,
        animation: window.google.maps.Animation.DROP,
        position: defaultCenter,
        title: "Drag me or click map to set location"
      });

      // Map click listener
      mapInstance.addListener('click', (event) => {
        handleMapClick(event, markerInstance);
      });

      // Marker drag listener
      markerInstance.addListener('dragend', handleMarkerDrag);

      setMap(mapInstance);
      setMarker(markerInstance);

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

    // Add event listeners to new map instance
    mapInstance.addListener('click', (event) => {
      handleMapClick(event, markerInstance);
    });

    markerInstance.addListener('dragend', handleMarkerDrag);

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
    
    // First, directly fill the house number with the search input
    sethouseNumber(searchInput);
    setIsAutoFilled(true);
    
    // Then perform geocoding
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
      region: 'in',
      bounds: new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(8.0, 68.0),
        new window.google.maps.LatLng(37.0, 97.0)
      )
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
        
        // DIRECT: जो search में typed address है, उसे सीधे house number में fill करें
        sethouseNumber(results[0].formatted_address);
        
        // Auto-fill form fields from geocoding results
        autoFillFormFields(results[0]);
        
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

  // Handle input focus to show suggestions
  const handleInputFocus = () => {
    if (autocomplete && searchInput.length > 0) {
      const input = inputRef.current;
      if (input) {
        const event = new Event('input', { bubbles: true });
        input.dispatchEvent(event);
      }
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
          
          // Reverse geocode to get address and auto-fill
          reverseGeocode(newLatLng);
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

  // Reverse geocode to get address from coordinates
  const reverseGeocode = (latLng) => {
    if (!window.google?.maps?.Geocoder) return;
    
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setSearchInput(results[0].formatted_address);
        // DIRECT: जो formatted address मिला है, उसे सीधे house number में fill करें
        sethouseNumber(results[0].formatted_address);
        // Auto-fill form fields from reverse geocoding results
        autoFillFormFields(results[0]);
      }
    });
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
        setCurrentAddressDetails(null);
        setIsAutoFilled(false);
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

  // Handle house number change
  const handleHouseNumberChange = (e) => {
    sethouseNumber(e.target.value);
    setIsAutoFilled(false); // User manually edited, so remove auto-filled status
    if (errors.houseNumber) {
      setErrors(prev => ({ ...prev, houseNumber: null }));
    }
  };

  // Handle landmark change
  const handleLandmarkChange = (e) => {
    setlandmark(e.target.value);
    setIsAutoFilled(false); // User manually edited, so remove auto-filled status
  };

  // Force auto-fill button
  const handleForceAutoFill = () => {
    if (latLng.lat && latLng.lng) {
      fetchAddressDetails(latLng);
    }
  };

  // Render Google Map Picker component
  const renderMapPicker = () => {
    return (
      <div className="google-map-picker" ref={searchContainerRef}>
        {/* Search Box */}
        <div className="mb-3 position-relative">
          <div className="input-group google-map-search-container">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type address here (e.g., Connaught Place, Delhi)..."
              className="form-control google-map-search-input"
              value={searchInput}
              onChange={handleSearchInputChange}
              onKeyPress={handleSearchKeyPress}
              onFocus={handleInputFocus}
              autoComplete="off"
              style={{
                padding: "12px 16px",
                fontSize: "16px",
                border: "2px solid #4a90e2",
                borderRadius: "8px 0 0 8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                position: "relative",
                zIndex: "1000",
                backgroundColor: "white"
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
          <div className="mt-2 d-flex gap-3 align-items-center">
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
            {isAutocompleteReady && (
              <small className="text-success">
                <i className="fa fa-check-circle me-1"></i>
                Type address to auto-fill House/Flat Number
              </small>
            )}
          </div>
          
          {/* Helper text */}
          <div className="text-muted small mt-1">
            <i className="fa fa-lightbulb me-1"></i>
            Search address will be automatically filled in House/Flat Number field
          </div>
        </div>

        {/* Map Container */}
        <div 
          ref={mapRef} 
          style={containerStyle}
          className="google-map-container border"
        />

        {/* Coordinates display */}
        <div className="mt-3">
          {latLng?.lat && latLng?.lng ? (
            <div className="alert alert-info py-2">
              <i className="fa fa-map-marker-alt me-2"></i>
              Location selected: {latLng.lat.toFixed(6)}, {latLng.lng.toFixed(6)}
              {isAutoFilled && (
                <div className="mt-1 small">
                  <i className="fa fa-check-circle me-1 text-success"></i>
                  Address auto-filled in House/Flat Number
                </div>
              )}
            </div>
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
    <div 
      className={`modal fade ${modals.addressModal ? "show" : ""}`} 
      id="provider" 
      style={{ 
        display: modals.addressModal ? 'block' : 'none',
        zIndex: 1050 
      }}
    >
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

            {/* Modal Header */}
            <div className="modal-header border-bottom pb-3 mb-4">
              <h5 className="modal-title fw-bold">
                <i className="fa fa-map-marker-alt me-2 text-primary"></i>
                {selectedAddress ? "Edit Address" : "Add New Address"}
              </h5>
            </div>

            {/* Use Current Location */}
            <div className="mb-3">
              <button 
                className="btn btn-outline-primary d-flex align-items-center" 
                onClick={handleUseCurrentLocation}
                type="button"
                disabled={!isScriptLoaded}
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
                      {isAutoFilled && houseNumber && (
                        <span className="badge bg-success ms-2">
                          <i className="fa fa-magic me-1"></i>Auto-filled from search
                        </span>
                      )}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., H-123, Floor 2, Block A"
                      className={`form-control ${errors.houseNumber ? 'is-invalid' : ''}`}
                      value={houseNumber}
                      onChange={handleHouseNumberChange}
                      autoFocus
                    />
                    {errors.houseNumber && (
                      <div className="invalid-feedback">
                        <i className="fa fa-exclamation-circle me-1"></i>
                        {errors.houseNumber}
                      </div>
                    )}
                    <small className="text-muted">
                      This field is automatically filled from your search address
                    </small>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Landmark (Optional)
                      {isAutoFilled && landmark && (
                        <span className="badge bg-success ms-2">
                          <i className="fa fa-magic me-1"></i>Auto-detected
                        </span>
                      )}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Near Metro Station, Opposite Mall"
                      className="form-control"
                      value={landmark}
                      onChange={handleLandmarkChange}
                    />
                    <small className="text-muted">
                      Nearby recognizable location (auto-detected from address)
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