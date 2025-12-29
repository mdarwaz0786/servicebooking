import React, { useState, useEffect, useRef } from "react";
import "./GoogleMapPicker.css"; // Create this CSS file

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "8px"
};

const center = {
  lat: 28.6139,
  lng: 77.2090,
};

const GoogleMapPicker = ({ setLatLng, latLng }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isAutocompleteReady, setIsAutocompleteReady] = useState(false);
  const mapRef = useRef(null);
  const inputRef = useRef(null);
  const searchContainerRef = useRef(null);

  // Load Google Maps script with better handling
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
      alert("Failed to load Google Maps. Please check your API key.");
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
    };
  }, []);

  // Initialize Autocomplete with proper styling
  useEffect(() => {
    if (isScriptLoaded && inputRef.current && !autocomplete) {
      setTimeout(() => initAutocomplete(), 500); // Small delay to ensure DOM is ready
    }
  }, [isScriptLoaded, inputRef.current]);

  // Initialize Autocomplete - FIXED VERSION
  const initAutocomplete = () => {
    if (!window.google || !window.google.maps.places || !inputRef.current) {
      console.log("Required Google APIs not available");
      return;
    }

    try {
      console.log("Initializing Autocomplete...");
      
      // Create a new input element for autocomplete
      const autocompleteInput = inputRef.current;
      
      // Ensure proper z-index and positioning
      const container = searchContainerRef.current;
      if (container) {
        container.style.position = 'relative';
        container.style.zIndex = '1000';
      }

      // Create autocomplete with minimal configuration
      const autocompleteInstance = new window.google.maps.places.Autocomplete(
        autocompleteInput,
        {
          // Use one of these types (not mixed):
          // types: ['geocode'], // For addresses
          // types: ['address'], // For addresses
          // types: ['establishment'], // For businesses
          // types: ['(cities)'], // For cities
          // types: ['(regions)'], // For regions
          
          // SIMPLEST: Use geocode alone
          types: ['geocode'],
          componentRestrictions: { country: 'in' },
          fields: ['geometry', 'formatted_address', 'name', 'place_id', 'address_components'],
        }
      );

      console.log("Autocomplete instance created");

      // Bind the autocomplete to the input
      autocompleteInstance.bindTo('bounds', new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(8.0, 68.0),
        new window.google.maps.LatLng(37.0, 97.0)
      ));

      // Add place changed listener
      autocompleteInstance.addListener('place_changed', () => {
        console.log("Place changed event triggered");
        const place = autocompleteInstance.getPlace();
        
        if (!place.geometry) {
          console.log("No geometry found for place:", place);
          return;
        }

        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const newPosition = { lat, lng };
        
        console.log("Place selected:", place.formatted_address);
        
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
        
        setIsAutocompleteReady(true);
      });

      // Fix for z-index issue with dropdown
      const pacContainer = document.querySelector('.pac-container');
      if (pacContainer) {
        pacContainer.style.zIndex = '9999';
        pacContainer.style.position = 'fixed';
      }

      // Add event listeners to input
      autocompleteInput.addEventListener('focus', () => {
        console.log("Input focused");
        // Ensure dropdown is visible
        const pacContainer = document.querySelector('.pac-container');
        if (pacContainer) {
          pacContainer.style.display = 'block';
          pacContainer.style.zIndex = '9999';
        }
      });

      autocompleteInput.addEventListener('blur', () => {
        setTimeout(() => {
          const pacContainer = document.querySelector('.pac-container');
          if (pacContainer) {
            pacContainer.style.display = 'none';
          }
        }, 300);
      });

      setAutocomplete(autocompleteInstance);
      setIsAutocompleteReady(true);
      
      console.log("Autocomplete initialized successfully");

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
      });

      // Marker drag listener
      markerInstance.addListener('dragend', (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        const newPosition = { lat, lng };
        
        setLatLng(newPosition);
        setSearchInput("");
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

  // Handle input change
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Handle search button click
  const handleSearchClick = () => {
    if (!searchInput.trim()) return;
    
    if (autocomplete) {
      // Try to trigger autocomplete
      console.log("Manually triggering search");
    }
    
    // Use geocoding as fallback
    performGeocoding(searchInput);
  };

  // Perform geocoding
  const performGeocoding = (address) => {
    if (!window.google?.maps?.Geocoder) return;
    
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
        }
        
        setLatLng(newPosition);
        setSearchInput(results[0].formatted_address);
      }
    });
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchClick();
    }
  };

  // Debug function
  const checkStatus = () => {
    console.log("=== DEBUG INFO ===");
    console.log("Google loaded:", !!window.google);
    console.log("Maps loaded:", !!window.google?.maps);
    console.log("Places loaded:", !!window.google?.maps?.places);
    console.log("Autocomplete:", !!autocomplete);
    console.log("Input ref:", !!inputRef.current);
    console.log("Script loaded:", isScriptLoaded);
    console.log("Autocomplete ready:", isAutocompleteReady);
    
    // Check for pac-container
    const pacContainer = document.querySelector('.pac-container');
    console.log("PAC Container found:", !!pacContainer);
    if (pacContainer) {
      console.log("PAC Container style:", pacContainer.style.cssText);
    }
    
    // Check input styles
    if (inputRef.current) {
      const styles = window.getComputedStyle(inputRef.current);
      console.log("Input position:", styles.position);
      console.log("Input z-index:", styles.zIndex);
    }
  };

  // Force show suggestions
  const forceShowSuggestions = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.click();
      
      // Trigger input event
      const event = new Event('input', { bubbles: true });
      inputRef.current.dispatchEvent(event);
    }
  };

  return (
    <div className="google-map-picker" ref={searchContainerRef}>
      {/* Debug section */}
      <div className="mb-2 p-2 bg-light rounded">
        <button 
          className="btn btn-sm btn-outline-primary me-2" 
          onClick={checkStatus}
          type="button"
        >
          Check Status
        </button>
        <button 
          className="btn btn-sm btn-outline-success" 
          onClick={forceShowSuggestions}
          type="button"
        >
          Test Suggestions
        </button>
      </div>

      {/* Search Box with better styling */}
      <div className="mb-3">
        <div className="input-group google-map-search-container">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type address here (e.g., Connaught Place, Delhi)..."
            className="form-control google-map-search-input"
            value={searchInput}
            onChange={handleSearchInputChange}
            onKeyPress={handleKeyPress}
            onFocus={() => {
              console.log("Input focused - suggestions should appear");
              // Ensure dropdown shows
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
        
        {/* Instructions */}
        <div className="mt-2">
          <small className="text-muted">
            <i className="fa fa-info-circle me-1"></i>
            Start typing an address - suggestions will appear in dropdown
          </small>
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
          {isAutocompleteReady && (
            <small className="text-success">
              <i className="fa fa-check-circle me-1"></i>
              Address search ready - start typing
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
          <div className="alert alert-success py-2">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <i className="fa fa-map-marker-alt me-2"></i>
                <strong>Location Selected</strong>
              </div>
              <div>
                <code className="bg-white p-1 rounded">
                  {latLng.lat.toFixed(6)}, {latLng.lng.toFixed(6)}
                </code>
              </div>
            </div>
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

export default GoogleMapPicker;