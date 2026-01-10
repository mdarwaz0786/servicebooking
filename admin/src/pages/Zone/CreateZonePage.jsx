/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  DrawingManager,
  LoadScript,
  Autocomplete,
  Polygon,
} from "@react-google-maps/api";
import axios from "axios";
import { toast } from "react-toastify";
import apis from "../../apis/apis";
import { useAuth } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";

const libraries = ["drawing", "places"];

const containerStyle = {
  width: "100%",
  height: "300px",
};

const defaultCenter = { lat: 28.6139, lng: 77.2090 };

const CreateZonePage = () => {
  const navigate = useNavigate();
  const { validToken } = useAuth();
  const [oldZones, setOldZones] = useState([]);

  const [name, setName] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [center, setCenter] = useState(defaultCenter);

  const autocompleteRef = useRef(null);

  const onPolygonComplete = useCallback((polygon) => {
    const path = polygon.getPath().getArray().map((p) => [
      p.lng(),
      p.lat(),
    ]);

    path.push(path[0]);

    setCoordinates(path);
    polygon.setMap(null);

    toast.success("Zone area selected");
  }, []);

  const onPlaceChanged = () => {
    if (!autocompleteRef.current) return;

    const place = autocompleteRef.current.getPlace();
    if (!place.geometry) return;

    const location = place.geometry.location;
    setCenter({
      lat: location.lat(),
      lng: location.lng(),
    });
  };

  const handleSubmit = async () => {
    if (!name) return toast.error("Zone name is required");
    if (!coordinates.length)
      return toast.error("Please draw zone area on map");

    try {
      setLoading(true);
      await axios.post(
        apis.zone.create,
        { name, coordinates },
        { headers: { Authorization: validToken } }
      );

      toast.success("Zone created successfully");
      navigate(-1);
      setName("");
      setCoordinates([]);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
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
            paths: coords,
          };
        });

        setOldZones(zones);
      }
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
          <h4>Add Zone</h4>
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
            />
          </Autocomplete>

          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            options={{
              gestureHandling: "greedy",
              scrollwheel: true,
              draggable: true,
              keyboardShortcuts: true,
            }}
          >
            {oldZones?.map((zone) => (
              <Polygon
                key={zone.id}
                paths={zone.paths}
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
            <DrawingManager
              onPolygonComplete={onPolygonComplete}
              options={{
                drawingControl: true,
                drawingControlOptions: {
                  drawingModes: ["polygon"],
                },
              }}
            />
          </GoogleMap>
        </LoadScript>

        <div className="text-center">
          <button
            className="btn btn-primary mt-3 mb-3"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateZonePage;
