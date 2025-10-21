const PrivacyPolicyPage = () => {
  return (
    <div className="container my-5">
      <h2 className="mb-4">Privacy Policy</h2>
      <p><strong>Effective Date:</strong> 04-December-2022</p>

      <p>
        Sarv Laxmi Green India Private Limited and its affiliates (“Green India Team”, “we” or “us”) are engaged in the business of providing web-based solutions to facilitate connections between customers that seek specific services and service professionals that offer these services.
      </p>

      <p>
        This Policy outlines our practices in relation to the collection, storage, usage, processing, and disclosure of personal data that you have consented to share with us when you access, use, or otherwise interact with our website available at
        <a href="https://www.greenindiateam.com" target="_blank" rel="noopener noreferrer"> https://www.greenindiateam.com </a>
        or mobile application ‘Green India Team’ (collectively, “Platform”) or avail products or services that Green India Team offers you on or through the Platform (collectively, the “Services”).
      </p>

      <p>
        The services offered to you by service professionals on or through the Platform are referred to as “Professional Services”.
      </p>

      {/* Section 1 */}
      <h5 className="mt-5">1. App Developer and Ownership Clarification</h5>
      <p>
        This mobile application is <strong>developed and published by Mr. Sarvesh Kumar Mishra</strong> through a personal Google Play Console developer account, acting on behalf of <strong>Green India Team (Sarv Laxmi Green India Private Limited)</strong>. The developer has been authorized by the company to represent and manage the app on the Google Play Store.
      </p>
      <p>
        For all purposes related to privacy and data protection, Green India Team remains the data controller and responsible entity.
      </p>

      {/* Section 2 */}
      <h5 className="mt-4">2. Information We Collect</h5>
      <ul className="bullet-list">
        <li><strong>Personal Identification Information:</strong> Name, email address, phone number, and postal address.</li>
        <li><strong>Service Details:</strong> Information about the services you request, such as type of appliance, location, service requirements, and payment details.</li>
        <li><strong>Technical Data:</strong> IP address, browser type, and information related to your device or system.</li>
        <li><strong>Communication Data:</strong> Information you provide when contacting us, including via email, phone, or our website.</li>
      </ul>

      {/* Section 3 */}
      <h5 className="mt-4">3. How We Use Your Information</h5>
      <p>We use the information to:</p>
      <ul className="bullet-list">
        <li>Provide, maintain, and improve our services.</li>
        <li>Process payments and confirm service requests.</li>
        <li>Communicate with you, including customer support.</li>
        <li>Send updates or offers (if opted in).</li>
        <li>Comply with legal obligations.</li>
      </ul>

      <h5 className="mt-4">4. Sharing Your Information</h5>
      <ul className="bullet-list">
        <li><strong>Service Providers:</strong> With third parties like contractors or payment processors.</li>
        <li><strong>Legal Requirements:</strong> If required by law or for legal protection.</li>
        <li><strong>Business Transfers:</strong> In case of mergers or acquisitions.</li>
      </ul>

      <h5 className="mt-4">5. Data Security</h5>
      <p>
        We use encryption, secure servers, and access controls to protect your data. However, no method is 100% secure.
      </p>

      <h5 className="mt-4">6. Your Rights</h5>
      <ul className="bullet-list">
        <li>Opt-out of marketing communications.</li>
        <li>Access or update your information by contacting us.</li>
      </ul>

      <h5 className="mt-4">7. Cookies</h5>
      <p>
        We use cookies to improve user experience. You can disable cookies in your browser.
      </p>

      <h5 className="mt-4">8. Third-Party Links</h5>
      <p>
        We may link to external sites. We are not responsible for their privacy practices.
      </p>

      <h5 className="mt-4">9. Children’s Privacy</h5>
      <p>
        We do not knowingly collect data from children under 13.
      </p>

      <h5 className="mt-4">10. Changes to This Policy</h5>
      <p>
        We may update this Privacy Policy and post changes here.
      </p>

      <h5 className="mt-4">11. Contact Us</h5>
      <p><strong>Green India Team</strong></p>
      <p>
        Address: Kh.No-365, 1st Floor, Lotus Building, Sultanpur, South Delhi-110030
      </p>
      <p>
        Email: greenindiateamaap@gmail.com
      </p>
      <p>
        Developer Name: Sarvesh Kumar Mishra (Publishing on behalf of Green India Team)
      </p>
    </div>
  );
};

export default PrivacyPolicyPage;
