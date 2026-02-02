/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect, useRef } from "react";
import {
  GoogleMap,
  DrawingManager,
  LoadScript,
  Polygon,
  Autocomplete,
} from "@react-google-maps/api";
import axios from "axios";
import { toast } from "react-toastify";
import apis from "../../apis/apis";
import { useAuth } from "../../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";

const libraries = ["drawing", "places"];

const containerStyle = {
  width: "100%",
  height: "300px",
};

const fallbackCenter = { lat: 28.6139, lng: 77.2090 };

const UpdateZonePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { validToken } = useAuth();
  const [oldZones, setOldZones] = useState([]);

  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const [oldCoordinates, setOldCoordinates] = useState([]);
  const [isRedrawing, setIsRedrawing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [center, setCenter] = useState(fallbackCenter);

  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);

  const fetchZone = async () => {
    try {
      const res = await axios.get(
        `${apis.zone.get}/${id}`,
        { headers: { Authorization: validToken } }
      );

      const zone = res?.data?.data;
      setName(zone?.name);
      setSearch(zone?.search);

      const cleanedCoords = zone?.geometry?.coordinates[0]
        .slice(0, -1)
        .map(([lng, lat]) => ({ lat, lng }));

      setCoordinates(cleanedCoords);
      setOldCoordinates(cleanedCoords);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load zone");
    }
  };

  useEffect(() => {
    fetchZone();
  }, [id]);

  useEffect(() => {
    if (!mapRef.current || !oldCoordinates.length) return;

    const bounds = new window.google.maps.LatLngBounds();
    oldCoordinates.forEach((c) => bounds.extend(c));
    mapRef.current.fitBounds(bounds);
  }, [oldCoordinates]);

  const onPlaceChanged = () => {
    if (!autocompleteRef.current || !mapRef.current) return;

    const place = autocompleteRef.current.getPlace();
    if (!place.geometry) return;

    const location = place.geometry.location;
    const newCenter = {
      lat: location.lat(),
      lng: location.lng(),
    };

    setCenter(newCenter);
    mapRef.current.panTo(newCenter);
    mapRef.current.setZoom(14);
  };

  const onPolygonComplete = useCallback((polygon) => {
    const path = polygon.getPath().getArray().map((p) => ({
      lat: p.lat(),
      lng: p.lng(),
    }));

    setCoordinates(path);
    setIsRedrawing(false);
    polygon.setMap(null);

    toast.success("New zone drawn");
  }, []);

  const handleUpdate = async () => {
    if (!name) return toast.error("Zone name is required");
    if (!coordinates.length)
      return toast.error("Please draw zone area");

    try {
      setLoading(true);

      const geoCoords = coordinates.map((p) => [p.lng, p.lat]);
      geoCoords.push(geoCoords[0]);

      await axios.patch(
        `${apis.zone.update}/${id}`,
        { name, search, coordinates: geoCoords },
        { headers: { Authorization: validToken } }
      );

      toast.success("Zone updated successfully");
      navigate(-1);
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchOldZone = async () => {
    try {
      const res = await axios.get(apis.zone.get, {
        headers: { Authorization: validToken },
      });

      if (res?.data?.success) {
        const zones = res?.data?.data?.map((zone) => {
          const coords = zone?.geometry?.coordinates[0]?.map(([lng, lat]) => ({ lat, lng }));

          return {
            id: zone?._id,
            name: zone?.name,
            search: zone?.search,
            paths: coords,
          };
        });

        setOldZones(zones);
      };
    } catch (err) {
      console.error(err);
      toast.error("Failed to load zones");
    }
  };

  useEffect(() => {
    fetchOldZone();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Update Zone</h4>
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>

        <input
          className="form-control mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Zone name"
        />

        <button
          className="btn btn-warning mb-3"
          onClick={() => setIsRedrawing(true)}
        >
          Redraw Zone
        </button>

        <LoadScript
          googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_KEY}
          libraries={libraries}
        >
          <Autocomplete
            onLoad={(ref) => (autocompleteRef.current = ref)}
            onPlaceChanged={onPlaceChanged}
          >
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search place"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Autocomplete>

          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onLoad={(map) => (mapRef.current = map)}
            options={{
              gestureHandling: "greedy",
              scrollwheel: true,
              draggable: true,
              keyboardShortcuts: true,
            }}
          >
            {oldCoordinates.length > 0 && (
              <Polygon
                paths={oldCoordinates}
                options={{
                  fillColor: "#9e9e9e",
                  fillOpacity: 0.2,
                  strokeColor: "#757575",
                  strokeWeight: 2,
                }}
              />
            )}

            {coordinates.length > 0 && !isRedrawing && (
              <Polygon
                paths={coordinates}
                options={{
                  fillColor: "#2196f3",
                  fillOpacity: 0.35,
                  strokeColor: "#2196f3",
                  strokeWeight: 2,
                }}
              />
            )}
            {oldZones?.map((zone) => (
              <Polygon
                key={zone?.id}
                paths={zone?.paths}
                options={{
                  fillColor: "#9e9e9e",
                  fillOpacity: 0.25,
                  strokeColor: "#616161",
                  strokeOpacity: 0.9,
                  strokeWeight: 2,
                  clickable: false,
                }}
              />
            ))}
            {isRedrawing && (
              <DrawingManager
                onPolygonComplete={onPolygonComplete}
                options={{
                  drawingControl: true,
                  drawingControlOptions: {
                    drawingModes: ["polygon"],
                  },
                }}
              />
            )}
          </GoogleMap>
        </LoadScript>

        <div className="text-center">
          <button
            className="btn btn-primary mt-3 mb-3"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateZonePage;
