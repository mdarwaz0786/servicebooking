import {
  GoogleMap,
  Marker,
  useLoadScript,
  Autocomplete,
} from "@react-google-maps/api";
import { useState, useRef } from "react";

const containerStyle = {
  width: "100%",
  height: "350px",
};

const libraries = ["places"];

const LocationPicker = ({ setFormData }) => {
  const apikey = import.meta.env.VITE_GOOGLE_MAP_KEY;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apikey,
    libraries,
  });

  const [marker, setMarker] = useState(null);
  const [map, setMap] = useState(null);

  const [center, setCenter] = useState({
    lat: 28.6139,
    lng: 77.209,
  });

  const autocompleteRef = useRef(null);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();

    if (!place.geometry) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    const newLocation = { lat, lng };

    setMarker(newLocation);
    setCenter(newLocation);

    if (map) {
      map.panTo(newLocation);
      map.setZoom(15);
    }

    let city = "";
    let state = "";
    let country = "";
    let zipCode = "";

    place.address_components?.forEach((item) => {
      if (item.types.includes("locality")) city = item.long_name;
      if (item.types.includes("administrative_area_level_1"))
        state = item.long_name;
      if (item.types.includes("country")) country = item.long_name;
      if (item.types.includes("postal_code")) zipCode = item.long_name;
    });

    setFormData((prev) => ({
      ...prev,
      lat,
      long: lng,
      city,
      state,
      country,
      zipCode,
      address: place.formatted_address || "",
    }));
  };

  const handleMapClick = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    const newLocation = { lat, lng };

    setMarker(newLocation);
    setCenter(newLocation);

    try {
      const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apikey}`);

      const data = await res.json();

      const result = data.results?.[0];
      const address = result?.address_components || [];

      let city = "";
      let state = "";
      let country = "";
      let zipCode = "";

      address.forEach((item) => {
        if (item.types.includes("locality")) city = item.long_name;
        if (item.types.includes("administrative_area_level_1"))
          state = item.long_name;
        if (item.types.includes("country")) country = item.long_name;
        if (item.types.includes("postal_code")) zipCode = item.long_name;
      });

      setFormData((prev) => ({
        ...prev,
        lat,
        long: lng,
        city,
        state,
        country,
        zipCode,
        address: result?.formatted_address || "",
      }));
    } catch (error) {
      console.log(error);
    }
  };

  if (!isLoaded) return <p>Loading Map...</p>;

  return (
    <div>
      {/* Search */}
      <Autocomplete
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          type="text"
          placeholder="Search location..."
          className="form-control mb-2"
          style={{ width: "100%", height: "40px" }}
        />
      </Autocomplete>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={(mapInstance) => setMap(mapInstance)}
        onClick={handleMapClick}
        options={{
          gestureHandling: "greedy",
          scrollwheel: true,
        }}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
    </div>
  );
};

export default LocationPicker;