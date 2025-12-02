import React, { useEffect, useState } from "react";

const GoogleReviews = ({ placeId }) => {
  const [reviews, setReviews] = useState([]);
  const [placeDetails, setPlaceDetails] = useState(null);

  useEffect(() => {
    if (!window.google) return;

    const dummyDiv = document.createElement("div");
    const service = new window.google.maps.places.PlacesService(dummyDiv);

    service.getDetails(
      {
        placeId: placeId,
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
  }, [placeId]);

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>{placeDetails?.name}</h2>
      <p>Rating: ⭐ {placeDetails?.rating}</p>

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
