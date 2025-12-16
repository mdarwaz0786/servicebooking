import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, Autocomplete } from "@react-google-maps/api";

const GOOGLE_API_KEY  = import.meta.env.VITE_GOOGLE_API_KEY;
const containerStyle = {
  width: "100%",
  height: "400px"
};

const center = {
  lat: 28.6139, // default Delhi
  lng: 77.2090,
};

const GoogleMapPicker = ({ setLatLng, latLng  }) => {
  const [position, setPosition] = useState(center);
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autoC) => {
    setAutocomplete(autoC);
  };

  useEffect(() => {
    if (latLng?.lat && latLng?.lng) {
      setPosition(latLng); // update when parent sets new coords
    }
  }, [latLng]);

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setPosition({ lat, lng });
        setLatLng({ lat, lng });
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_API_KEY} libraries={["places"]}>
      <div className="mb-3">
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Search location"
            className="form-control mb-2"
          />
        </Autocomplete>
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position}
        zoom={15}
        onClick={(e) => {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();
          setPosition({ lat, lng });
          setLatLng({ lat, lng });
        }}
      >
        <Marker
          position={position}
          draggable
          onDragEnd={(e) => {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            setPosition({ lat, lng });
            setLatLng({ lat, lng });
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapPicker;
