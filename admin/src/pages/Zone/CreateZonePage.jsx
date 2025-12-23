import { useState, useCallback } from "react";
import { GoogleMap, DrawingManager, LoadScript } from "@react-google-maps/api";
import axios from "axios";
import { toast } from "react-toastify";
import apis from "../../apis/apis";
import { useAuth } from "../../context/auth.context";

const libraries = ["drawing"];

const containerStyle = {
  width: "100%",
  height: "500px"
};

const center = { lat: 28.6139, lng: 77.2090 };

const CreateZonePage = () => {
  const { validToken } = useAuth();
  const [name, setName] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const [loading, setLoading] = useState(false);

  const onPolygonComplete = useCallback((polygon) => {
    const path = polygon.getPath().getArray().map(p => [
      p.lng(),
      p.lat()
    ]);

    // GeoJSON polygon must be closed
    path.push(path[0]);

    setCoordinates(path);
    polygon.setMap(null);

    toast.success("Zone area selected");
  }, []);

  const handleSubmit = async () => {
    if (!name) return toast.error("Zone name is required");
    if (!coordinates.length) return toast.error("Please draw zone area on map");

    try {
      setLoading(true);
      await axios.post(
        apis.zone.create,
        {
          name,
          coordinates
        },
        {
          headers: {
            Authorization: validToken,
          }
        }
      );

      toast.success("Zone created successfully");
      setName("");
      setCoordinates([]);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container mt-4">
        <h3>Create Zone</h3>

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
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
          >
            <DrawingManager
              onPolygonComplete={onPolygonComplete}
              options={{
                drawingControl: true,
                drawingControlOptions: {
                  drawingModes: ["polygon"]
                }
              }}
            />
          </GoogleMap>
        </LoadScript>

        <button
          className="btn btn-primary mt-3"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Create Zone"}
        </button>
      </div>
    </div>
  );
};

export default CreateZonePage;
