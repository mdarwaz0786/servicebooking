import React from "react";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import "./GiPrivacyPolicy.css"; // Optional: for custom styling

const GiPrivacyPolicyPage = () => {
  // Static privacy policy data
  const policyData = {
    title: "Privacy Policy",
    effectiveDate: "2026-02-26",
    description: `
      <p><strong>App Name:</strong> GI Team</p>

      <p>
        GI Team ("we", "our", "us") respects your privacy. This Privacy Policy explains how we collect,
        use, and protect your information when you use our mobile application.
      </p>

      <h2>1. Information We Collect</h2>

      <h3>Personal Information</h3>
      <ul>
        <li>Name</li>
        <li>Phone Number</li>
        <li>Profile Information</li>
        <li>KYC Documents (if submitted)</li>
      </ul>

      <h3>Location Information</h3>
      <p>
        We may collect precise and approximate location to assign nearby jobs,
        verify service completion, and improve service accuracy.
      </p>

      <h3>Camera Access</h3>
      <p>
        Used for uploading profile photos, KYC documents, and service proof images.
        We do not access the camera without user action.
      </p>

      <h3>Storage / Media Access</h3>
      <p>
        Used to upload images, documents, and selected media files.
        We do not access unrelated personal files.
      </p>

      <h3>Phone Permissions</h3>
      <p>
        Used to enable direct calling between service partners and customers.
        We do not record calls.
      </p>

      <h3>Notifications</h3>
      <p>
        Used to send job alerts, updates, and important account notifications.
        Users may disable notifications anytime in device settings.
      </p>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To provide and manage service jobs</li>
        <li>To verify identity (KYC)</li>
        <li>To improve app performance</li>
        <li>To prevent fraud and ensure security</li>
      </ul>

      <h2>3. Data Sharing</h2>
      <p>
        We do not sell your personal information.
        Data may be shared with customers for service fulfillment,
        legal authorities if required by law, or trusted service providers.
      </p>

      <h2>4. Data Security</h2>
      <p>
        We implement reasonable security measures to protect your data.
        However, no online transmission method is 100% secure.
      </p>

      <h2>5. Data Retention</h2>
      <p>
        We retain data as long as your account is active or as required by law.
        You may request account deletion by contacting support.
      </p>

      <h2>6. Children's Privacy</h2>
      <p>
        This app is not intended for children under 18 years of age.
      </p>

      <h2>7. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time.
        Updates will be posted on this page.
      </p>

      <h2>8. Contact Us</h2>
      <p>
        If you have any questions regarding this Privacy Policy:
      </p>
      <p>
        <strong>GI Team Support</strong><br />
        Email: greenindiateam2022@gmail.com<br />
        Phone: +91-9555541415
      </p>

      
    `
  };

  return (
    <>
      <BreadCrumb data={{ title: policyData.title }} />
      <div className="container my-5">
        <div className="col-md-10 mx-auto">
          <p className="text-muted mb-4">
            Effective Date: {new Date(policyData.effectiveDate).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>

          <div
            className="mt-1 policy-content"
            dangerouslySetInnerHTML={{ __html: policyData.description }}
          />
        </div>
      </div>
    </>
  );
};

export default GiPrivacyPolicyPage;