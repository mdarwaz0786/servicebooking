import React, { useEffect, useState } from "react";

const GoogleReviews = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [placeDetails, setPlaceDetails] = useState(null);

  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  const PLACE_ID = import.meta.env.VITE_PLACE_ID;

  // Load Google Maps Script Dynamically
  const loadGoogleScript = () => {
    return new Promise((resolve) => {
      if (window.google) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;

      script.onload = resolve;

      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadGoogleScript().then(() => {
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!isLoaded || !window.google) return;

    const dummyDiv = document.createElement("div");
    const service = new window.google.maps.places.PlacesService(dummyDiv);

    service.getDetails(
      {
        placeId: PLACE_ID,
        fields: ["name", "rating", "reviews"],
      },
      (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setPlaceDetails(place);
          setReviews(place.reviews || []);
        } else {
          console.error("Error:", status);
        }
      }
    );
  }, [isLoaded]);

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>{placeDetails?.name || "Loading..."}</h2>
      {placeDetails && <p>Rating: ⭐ {placeDetails.rating}</p>}

      {reviews.map((r, i) => (
        <div key={i} style={{ borderBottom: "1px solid #ddd", padding: 10 }}>
          <div style={{ display: "flex", gap: 15 }}>
            <img
              src={r.profile_photo_url}
              alt=""
              style={{ width: 50, height: 50, borderRadius: "50%" }}
            />
            <div>
              <strong>{r.author_name}</strong>
              <p>⭐ {r.rating}</p>
            </div>
          </div>
          <p>{r.text}</p>
          <small>{r.relative_time_description}</small>
        </div>
      ))}
    </div>
  );
};

export default GoogleReviews;
