const TermsConditionsPage = () => {
  return (
    <div className="container my-5">
      <div className="col-md-10 mx-auto">
        <h4 className="fw-bold mb-3">Terms and Conditions</h4>
        <p className="text-muted mb-4">Effective Date: 04-December-2022</p>

        <p className="text-muted">
          These Terms and Conditions ("Terms") govern your use of Green India
          Team’s services, including but not limited to AC repair, TV repair, RO
          Purifiers, Home Decor, Handicraft, Plumbing, Painting, Saloon
          services, Pest Control, and more ("Services"). By using our Services,
          you agree to be bound by these Terms.
        </p>

        {/* 1. Service Availability */}
        <h6 className="fw-bold mt-4">1. Service Availability</h6>
        <p className="text-muted">
          Green India Team provides Services across various categories such as
          home maintenance, repairs, and decor. Availability of services may
          depend on location, and we reserve the right to modify, suspend, or
          discontinue services at any time without prior notice.
        </p>

        {/* 2. Service Requests and Payment */}
        <h6 className="fw-bold mt-4">2. Service Requests and Payment</h6>
        <ul className="text-muted">
          <li>
            <strong>Service Requests:</strong> When you request a service, you
            agree to provide accurate and complete information. All service
            requests will be confirmed by Green India Team, subject to
            availability.
          </li>
          <li className="mt-2">
            <strong>Payment:</strong> Payment for services is due upon
            completion, unless otherwise agreed. We accept various forms of
            payment, including credit cards, debit cards, and other online
            payment methods.
          </li>
        </ul>

        {/* 3. Service Standards */}
        <h6 className="fw-bold mt-4">3. Service Standards</h6>
        <p className="text-muted">
          We strive to provide high-quality service, but we cannot guarantee
          that every service will be free of defects. If you are dissatisfied
          with a service, please contact us, and we will work to resolve any
          issues promptly.
        </p>

        {/* 4. Limitation of Liability */}
        <h6 className="fw-bold mt-4">4. Limitation of Liability</h6>
        <p className="text-muted">
          Green India Team’s liability for any service-related issues is limited
          to the total amount paid for the specific service. We are not liable
          for indirect, incidental, or consequential damages.
        </p>

        {/* 5. Intellectual Property */}
        <h6 className="fw-bold mt-4">5. Intellectual Property</h6>
        <p className="text-muted">
          All content on our website, including logos, trademarks, text, images,
          and other materials, is the property of Green India Team and is
          protected by copyright and other intellectual property laws.
        </p>

        {/* 6. Termination of Services */}
        <h6 className="fw-bold mt-4">6. Termination of Services</h6>
        <p className="text-muted mb-0">
          We reserve the right to suspend or terminate your access to our
          Services if we believe you have violated these Terms or acted
          inappropriately.
        </p>

        {/* 7. Governing Law */}
        <h6 className="fw-bold mt-4">7. Governing Law</h6>
        <p className="text-muted">
          These Terms are governed by and construed in accordance with the laws
          of <strong>[Your Country/Region]</strong>, and any disputes will be
          subject to the exclusive jurisdiction of the courts in{" "}
          <strong>Delhi/NCR Jurisdiction</strong>.
        </p>

        {/* 8. Changes to Terms and Conditions */}
        <h6 className="fw-bold mt-4">8. Changes to Terms and Conditions</h6>
        <p className="text-muted">
          We reserve the right to modify these Terms at any time. Any changes
          will be posted on this page with an updated revision date. Continued
          use of our Services after changes indicates acceptance of the updated
          Terms.
        </p>

        {/* 9. Contact Us */}
        <h6 className="fw-bold mt-4">9. Contact Us</h6>
        <p className="text-muted">
          If you have any questions or concerns about this Privacy Policy or how
          we handle your personal information, please contact us at:
        </p>
        <p className="text-muted mb-0">
          <strong>Green India Team</strong>
          <br />
          Address: Kh.No-365, 1st Floor, Lotus Building, Sultanpur, South
          Delhi-110030
          <br />
          Email: helpdesk@greenindiateam.com
        </p>
      </div>
    </div>
  );
};

export default TermsConditionsPage;
