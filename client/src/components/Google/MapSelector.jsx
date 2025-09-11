import React, { useEffect, useRef, useState } from "react";

const MapSelector = ({ onLocationSelect }) => {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const initMap = () => {
    if (!mapRef.current) return;

    const defaultCenter = { lat: 28.6139, lng: 77.2090 }; // Delhi

    const map = new window.google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 13,
    });

    const marker = new window.google.maps.Marker({
      position: defaultCenter,
      map: map,
      draggable: true,
    });

    // Marker drag end
    marker.addListener("dragend", (e) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      onLocationSelect({ lat, lng });
    });

    // Map click to move marker
    map.addListener("click", (e) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      marker.setPosition({ lat, lng });
      onLocationSelect({ lat, lng });
    });

    setMapLoaded(true);
  };

  useEffect(() => {
    // Make initMap available globally
    window.initMap = initMap;

    // Load script if not loaded
    if (!window.google || !window.google.maps) {
      const script = document.createElement("script");
      script.src = "https://maps.googleapis.com/maps/api/js?key=YOUR_KEY&libraries=places&callback=initMap";
      script.async = true;
      document.head.appendChild(script);
    } else {
      initMap();  // if script already loaded
    }

    // Cleanup if needed (optional)
    return () => {
      // maybe remove global
      // delete window.initMap;
    };
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default MapSelector;
