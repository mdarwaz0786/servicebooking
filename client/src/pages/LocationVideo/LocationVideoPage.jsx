import React from "react";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import "./LocationVideoPage.css"; // Optional: for custom styling

const LocationVideoPage = () => {
  // Video source path - make sure this is correct
  const videoSource = "public/location-video.mp4"; // Public folder se access ke liye

  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-10 mx-auto">
            <div className="video-wrapper text-center">
              
              
              <div className="video-container">
                <video 
                  controls 
                  autoPlay 
                  src={videoSource}
                  className="img-fluid rounded shadow"
                  style={{ maxWidth: "100%", height: "auto" }}
                >
                  Your browser does not support the video tag.
                </video>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationVideoPage;