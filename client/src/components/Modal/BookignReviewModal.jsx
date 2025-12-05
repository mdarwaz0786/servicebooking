import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { FaStar } from "react-icons/fa";

const BookignReviewModal = ({ bookingId }) => {
  const { modals, toggleModal, Urls, postData, toast } = useContext(AppContext);

  

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    

    setLoading(true);

    try {
      const payload = {
        bookingId: bookingId,
        rating:rating,
        description:review,
      };
      

      // example: Urls.api + "save-review"
      const response = await postData(payload, `${Urls.myReviewAdd}`, "POST");

      if (response?.success) {
        toast.success(response.message);
        toggleModal("BookignReviewModal", false);
        setRating(0);
        setReview("");
      } else {
        // alert(response?.message || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting review!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={`modal fade ${modals.BookignReviewModal ? "show" : ""}`}
        id="provider"
        style={{ display: modals.BookignReviewModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center justify-content-between">
              <h5>Write A Review</h5>
              <a
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => toggleModal("BookignReviewModal", false)}
                style={{ cursor: "pointer" }}
              >
                <i className="ti ti-circle-x-filled fs-20"></i>
              </a>
            </div>

            <div className="wizard-fieldset p-4 text-center">
              <div className="write-review">
                

                <div className="form-info d-flex align-items-center justify-content-center mb-3">
                  
                  <div className="rating-select mb-0">
                    {[...Array(5)].map((_, index) => {
                      const currentRating = index + 1;
                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setRating(currentRating)}
                          onMouseEnter={() => setHover(currentRating)}
                          onMouseLeave={() => setHover(0)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: 0,
                          }}
                        >
                          <FaStar
                            size={35}
                            color={
                              currentRating <= (hover || rating)
                                ? "#ffc107"
                                : "#e4e5e9"
                            }
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mb-0 text-start">
                  {/* <label className="col-form-label">Write your Review</label> */}
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Please write your review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  />
                </div>

                <div className="mt-3 text-center">
                  <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit Review"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookignReviewModal;
