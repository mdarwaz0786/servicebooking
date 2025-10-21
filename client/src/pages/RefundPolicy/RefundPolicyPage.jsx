const RefundPolicyPage = () => {
  return (
    <div className="container my-5">
      <h2 className="mb-3">Refund Policy</h2>
      <p><strong>Effective Date:</strong> 04-December-2022</p>

      <p>
        At Green India Team, we strive to provide high-quality services across various categories such as AC repair, TV repair, RO purifiers, home decor, plumbing, painting, and more. Your satisfaction is important to us, and we want to ensure that you are completely satisfied with the services we provide.
      </p>

      <p>
        However, if you are not satisfied with the service provided, please refer to the following refund policy:
      </p>

      {/* Section 1 */}
      <h5 className="mt-4">1. Service Refunds</h5>
      <p>We offer refunds under the following conditions:</p>
      <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
        <li>
          <strong>Service Not Provided or Incomplete:</strong> If the service you requested was not provided or was incomplete due to reasons on our part, you are entitled to a full refund.
        </li>
        <li>
          <strong>Faulty or Unsatisfactory Service:</strong> If the service performed was not up to the expected standard, we will either fix the issue or provide a partial or full refund depending on the severity of the issue. Refund requests must be made within [insert number of days, e.g., 7 days] from the service date.
        </li>
      </ul>

      {/* Section 2 */}
      <h5 className="mt-4">2. Non-Refundable Services</h5>
      <p>The following services are non-refundable:</p>
      <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
        <li>
          <strong>Services Already Performed:</strong> Once a service has been completed and you have signed off on the work or made payment, no refund will be issued unless there is a valid issue with the service.
        </li>
        <li>
          <strong>Damage Due to Customer Negligence:</strong> If the issue arises due to negligence or misuse on the part of the customer after the service has been completed, a refund will not be issued.
        </li>
        <li>
          <strong>Customized or Non-Returnable Goods:</strong> If you have requested custom products (e.g., home decor items or handicrafts), these items are non-refundable unless they are faulty or damaged.
        </li>
      </ul>

      {/* Section 3 */}
      <h5 className="mt-4">3. Refund Process</h5>
      <p>To request a refund, please follow these steps:</p>
      <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
        <li>
          <strong>Contact Us:</strong> Reach out to our customer service team at <a href="mailto:helpdesk@greenindiateam.com">helpdesk@greenindiateam.com</a>. Provide details of the service and the reason for your refund request.
        </li>
        <li>
          <strong>Investigation:</strong> Once we receive your request, we will investigate the issue and assess whether a refund is applicable based on the circumstances. We may require you to provide additional documentation or information.
        </li>
        <li>
          <strong>Approval:</strong> If your refund is approved, we will process the refund within 15 days. The refund will be issued to the original payment method.
        </li>
      </ul>

      {/* Section 4 */}
      <h5 className="mt-4">4. Charges Deduction</h5>
      <p>
        In some cases, we may deduct a small administrative or service charge from the refund if applicable. You will be notified of any such deductions before the refund is processed.
      </p>

      {/* Section 5 */}
      <h5 className="mt-4">5. Cancellations</h5>
      <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
        <li>If you cancel the service before it has been provided, you will be entitled to a full refund.</li>
        <li>If you cancel the service after it has been provided or is in progress, you will be subject to a cancellation fee, and the remaining balance will be refunded, if applicable.</li>
      </ul>

      {/* Section 6 */}
      <h5 className="mt-4">6. Contact Us</h5>
      <p>If you have any questions or concerns about this Refund Policy or how we handle your personal information, please contact us at:</p>
      <p><strong>Green India Team</strong></p>
      <p>
        Address: Kh.No-365, 1st Floor, Lotus Building, Sultanpur, South Delhi-110030<br />
        Email: <a href="mailto:helpdesk@greenindiateam.com">helpdesk@greenindiateam.com</a>
      </p>
    </div>
  );
};

export default RefundPolicyPage;
