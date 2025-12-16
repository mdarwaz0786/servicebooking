import React, { useEffect, useState } from "react";
import axios from "axios";

const GoogleReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/common/review/google-reviews");
        setReviews(res.data.reviews);
        setLoading(false);
      } catch (err) {
        setError("Failed to load reviews");
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <div>Loading Google Reviews...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Google Reviews ({reviews.length})</h2>

      {reviews.map((rev, index) => (
        <div
          key={index}
          style={{
            background: "#fff",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={rev.profile_photo_url}
              alt=""
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                marginRight: "10px"
              }}
            />
            <div>
              <strong>{rev.author_name}</strong>
              <div style={{ fontSize: "14px", color: "#777" }}>
                ⭐ {rev.rating?.replace("Rated ", "")}
              </div>
            </div>
          </div>

          <p style={{ marginTop: "10px" }}>{rev.text}</p>

          <div style={{ color: "#777", fontSize: "13px" }}>
            {rev.relative_time_description}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GoogleReviews;
