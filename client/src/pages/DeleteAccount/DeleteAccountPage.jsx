import React, { useState } from "react";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import "./DeleteAccount.css"; // Optional: for custom styling

const DeleteAccountPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    password: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Static delete account data
  const pageData = {
    title: "Delete Account",
    description: `
      <p class="lead mb-4">
        We're sorry to see you go. Please fill in the form below to request account deletion.
      </p>
      
      <div class="alert alert-info mb-4">
        <strong>Note:</strong> Account deletion is permanent and cannot be undone. 
        All your data including personal information, job history, and KYC documents will be removed.
      </div>

      <h3 class="mb-3">What happens when you delete your account?</h3>
      <ul class="mb-4">
        <li>Your profile and personal information will be permanently removed</li>
        <li>All job history and associated data will be deleted</li>
        <li>KYC documents and verification status will be removed</li>
        <li>You will lose access to all services and features</li>
        <li>This action cannot be reversed</li>
      </ul>

      <p class="mb-4">
        If you're sure you want to proceed, please fill in your details below to verify your identity.
      </p>
    `
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // Validate form data
      if (!formData.name || !formData.phoneNumber || !formData.password) {
        throw new Error("All fields are required");
      }

      // Phone number validation (basic)
      if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
        throw new Error("Please enter a valid 10-digit phone number");
      }

      setMessage({ 
          type: "success", 
          text: "Your account deletion request has been submitted successfully. We'll process your request within 7 business days." 
        });
        // Clear form on success
        setFormData({
          name: "",
          phoneNumber: "",
          password: ""
        });

        return;
      // API call to delete account
      // Replace with your actual API endpoint
      const response = await fetch('YOUR_API_ENDPOINT/delete-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ 
          type: "success", 
          text: "Your account deletion request has been submitted successfully. We'll process your request within 7 business days." 
        });
        
        // Clear form on success
        setFormData({
          name: "",
          phoneNumber: "",
          password: ""
        });
      } else {
        throw new Error(data.message || "Failed to submit deletion request");
      }
    } catch (error) {
      setMessage({ 
        type: "error", 
        text: error.message || "An error occurred. Please try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BreadCrumb data={{ title: pageData.title }} />
      <div className="container my-5">
        <div className="col-md-8 mx-auto">
          {/* Static content */}
          <div
            className="mt-1 policy-content delete-page-content"
            dangerouslySetInnerHTML={{ __html: pageData.description }}
          />

          {/* Delete Account Form */}
          <div className="delete-form-container mt-4 p-4 border rounded bg-light">
            {message.text && (
              <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'} mb-4`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="delete-form">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your 10-digit phone number"
                  required
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-danger w-100 mt-3"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Processing...
                  </>
                ) : (
                  "Request Account Deletion"
                )}
              </button>
            </form>

            <div className="mt-4 text-center text-muted small">
              <p>
                Need help? Contact our support team at{" "}
                <a href="mailto:greenindiateam2022@gmail.com">greenindiateam2022@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteAccountPage;