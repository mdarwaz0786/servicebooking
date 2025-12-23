import { useState, useCallback } from "react";
import { GoogleMap, DrawingManager, LoadScript } from "@react-google-maps/api";
import axios from "axios";
import { toast } from "react-toastify";
import apis from "../../apis/apis";
import { useAuth } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";

const libraries = ["drawing"];

const containerStyle = {
  width: "100%",
  height: "500px"
};

const center = { lat: 28.6139, lng: 77.2090 };

const CreateZonePage = () => {
  const navigate = useNavigate();
  const { validToken } = useAuth();
  const [name, setName] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const [loading, setLoading] = useState(false);

  const onPolygonComplete = useCallback((polygon) => {
    const path = polygon.getPath().getArray().map(p => [
      p.lng(),
      p.lat()
    ]);

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
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Add Zone</h4>
          <button className="btn btn-primary" onClick={() => navigate(-1)}>Back</button>
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
