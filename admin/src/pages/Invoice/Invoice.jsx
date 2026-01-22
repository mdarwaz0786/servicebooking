/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./Invoice.module.css";
import { useAuth } from "../../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";
import apis, { BASE_URL } from "../../apis/apis";
import axios from "axios";
import { useEffect, useState } from "react";
import { downloadPdf } from "../../helpers/downloadPdf";
import { formatDate } from "../../helpers/formatDate";

const Invoice = () => {
  const [invoice, setInvoice] = useState({});
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${apis.invoice.get}/${id}`, {
          headers: { Authorization: validToken },
        });
        if (res?.data?.success) {
          setInvoice(res?.data?.data || {});
        }
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, [validToken]);

  const bookingItems = invoice?.bookingItemDetail || [];

  let totalAdminInvoiceAmount = 0;
  let totalProviderInvoiceAmount = 0;
  let additionalPartAmount = 0;
  let percentOfAdditionalPartAmount = 0;

  const calculatedItems = bookingItems.map((item) => {
    const service = item?.service || {};
    const qty = item?.quantity || 1;
    additionalPartAmount = invoice?.bookingDetail?.additionalPartAmount || 0;
    percentOfAdditionalPartAmount = Number(additionalPartAmount) * 0.1 || 0;

    const salePrice = Number(service?.salePrice || 0) * qty;
    const taxableValue = (Number(service?.taxablePrice || 0)) * qty;
    const taxPercent = 18;

    const gstAmount = ((taxableValue + percentOfAdditionalPartAmount) * taxPercent) / 100;
    const adminGstAmount = gstAmount;
    const adminTotalAmount = adminGstAmount + taxableValue + percentOfAdditionalPartAmount;
    totalAdminInvoiceAmount = adminTotalAmount;

    const providerGst = (((salePrice - taxableValue) + additionalPartAmount) * taxPercent) / 100;
    const isProviderGST = invoice?.kyc?.gstNumber ? providerGst : 0;

    totalProviderInvoiceAmount = Number(salePrice - taxableValue) + additionalPartAmount + Number(isProviderGST);

    return {
      id: item?._id,
      name: service?.name,
      qty,
      salePrice,
      taxableValue,
      taxPercent,
      gstAmount: adminGstAmount,
      adminTotalAmount,
      isProviderGST,
    };
  });

  return (
    <div className="page-wrapper" style={{ background: "#f1f9f9" }}>
      <div className="d-flex justify-content-between align-items-center mt-3 ps-5 pe-5">
        <h5 className="mb-0">Invoice</h5>
        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          onClick={() =>
            downloadPdf({
              elementId: "invoice-download",
              fileName: `Invoice-${invoice?.companyInvoiceNumber || "download"}.pdf`,
            })
          }
        >
          Download
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>

      <div id="invoice-download">
        {/* First Page */}
        <div className={styles.invoice}>
          {/* HEADER */}
          <div className={styles.header}>
            <div className={styles.logoSection}>
              <img src={`${BASE_URL}/${invoice?.companyDetail?.logo}`} alt="logo" className={styles.logoImg} />
              <div className={styles.companyInfo}>
                {invoice?.companyDetail?.address} <br />
                {invoice?.companyDetail?.businessGSTIN}
              </div>
            </div>
            <div className={styles.title}>ORIGINAL TAX INVOICE</div>
          </div>

          {/* GRID */}
          <div className={styles.grid}>
            {/* LEFT */}
            <div>
              <div className={styles.label}>Customer Name</div>
              <div className={styles.value}>{invoice?.customerDetail?.name}</div>

              <div className={styles.label}>Invoice no.</div>
              <div className={styles.value}>{invoice?.companyInvoiceNumber}</div>

              <div className={styles.label}>Delivery Address</div>
              <div className={styles.value}>
                {invoice?.addressDetail?.houseNumber}
                Landmark : {invoice?.addressDetail?.landmark}
              </div>

              <div className={styles.label}>Invoice Date</div>
              <div className={styles.value}>{formatDate(invoice?.createdAt)}</div>
              <div className={styles.label}>State Name & Code</div>
              <div className={styles.value}>
                {invoice?.addressDetail?.stateName && invoice?.addressDetail?.stateCode
                  ? `${invoice.addressDetail.stateName} ${invoice.addressDetail.stateCode}`
                  : "Delhi 07"}
              </div>
              <div className={styles.label}>Place of Supply</div>
              <div className={styles.value}>
                {invoice?.addressDetail?.stateName && invoice?.addressDetail?.stateCode
                  ? `${invoice.addressDetail.stateName} ${invoice.addressDetail.stateCode}`
                  : "Delhi 07"}
              </div>
            </div>

            {/* RIGHT */}
            <div>
              <div className={styles.sectionTitle}>DELIVERY SERVICE PROVIDER</div>

              <div className={styles.label}>Business GSTIN</div>
              <div className={styles.value}>{invoice?.companyDetail?.businessGSTIN}</div>

              <div className={styles.label}>Business Name</div>
              <div className={styles.value}>
                {invoice?.companyDetail?.businessName}
              </div>

              <div className={styles.label}>Address</div>
              <div className={styles.value}>
                {invoice?.companyDetail?.address}
              </div>

              <div className={styles.label}>State Name & Code</div>
              <div className={styles.value}>
                {invoice?.companyDetail?.stateName} {invoice?.companyDetail?.stateCode}
              </div>
            </div>
          </div>

          {/* ITEMS */}
          <div className={styles.items}>
            <div className={styles.itemsHeader}>
              <div className={styles.label}>Items</div>
              <div className={styles.label}>Taxable Value</div>
            </div>

            {calculatedItems?.map((item) => (
              <div key={item?.id} className={styles.itemsBody}>
                {/* LEFT */}
                <div>
                  <div className={styles.itemName}>
                    <span style={{ fontWeight: "800" }}>Convenience and Platform Fee - </span>
                    {item?.name} × {item?.qty}
                  </div>
                </div>

                {/* RIGHT */}
                <div>
                  <div className={styles.breakupRow}>
                    <span>Gross Amount</span>
                    <span>Rs. {(item?.taxableValue + percentOfAdditionalPartAmount)}</span>
                  </div>

                  <div className={styles.breakupRow}>
                    <span>Discount</span>
                    <span>- Rs. 0</span>
                  </div>

                  <div className={styles.breakupRow}>
                    <span>Taxable Value</span>
                    <span>Rs. {(item?.taxableValue + percentOfAdditionalPartAmount)}</span>
                  </div>

                  <div className={styles.breakupRow}>
                    <span>GST @{item?.taxPercent}%</span>
                    <span>Rs. {item?.gstAmount?.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* TOTAL */}
            <div className={styles.totalBar}>
              <span>TOTAL AMOUNT</span>
              <span>Rs. {totalAdminInvoiceAmount?.toFixed(2)}</span>
            </div>
          </div>

          {/* FOOTER */}
          <div className={styles.footer}>
            <div className={styles.footerItem}>
              <img
                src={`${BASE_URL}/${invoice?.companyDetail?.qrCode}`}
                alt="qr"
                className={styles.footerImg}
              />
              <p>* Reverse Charge mechanism not applicable</p>
            </div>

            <div className={styles.footerItem}>
              <img
                src={`${BASE_URL}/${invoice?.companyDetail?.authorizedSignature}`}
                alt="signature"
                className={styles.footerImg}
              />
              <p>Signature of supplier / authorized representative</p>
            </div>
          </div>
        </div>

        {/* Second Page */}
        <div className={styles.invoice}>
          {/* HEADER */}
          <div className={styles.header}>
            <div className={styles.logoSection}>
              <img src={`${BASE_URL}/${invoice?.companyDetail?.logo}`} alt="logo" className={styles.logoImg} />
              <div className={styles.companyInfo}>
                {invoice?.companyDetail?.address} <br />
                {invoice?.companyDetail?.businessGSTIN}
              </div>
            </div>
            <div className={styles.title}>RECEIPT (GI EXPERT TEAM)</div>
          </div>

          {/* GRID */}
          <div className={styles.grid}>
            {/* LEFT */}
            <div>
              <div className={styles.label}>Customer Name</div>
              <div className={styles.value}>{invoice?.customerDetail?.name}</div>

              <div className={styles.label}>Invoice no.</div>
              <div className={styles.value}>{invoice?.providerInvoiceNumber}</div>

              <div className={styles.label}>Delivery Address</div>
              <div className={styles.value}>
                {invoice?.addressDetail?.houseNumber}
                Landmark : {invoice?.addressDetail?.landmark}
              </div>

              <div className={styles.label}>Invoice Date</div>
              <div className={styles.value}>{formatDate(invoice?.createdAt)}</div>
              <div className={styles.label}>State Name & Code</div>
              <div className={styles.value}>
                {invoice?.addressDetail?.stateName && invoice?.addressDetail?.stateCode
                  ? `${invoice.addressDetail.stateName} ${invoice.addressDetail.stateCode}`
                  : "Delhi 07"}
              </div>

              <div className={styles.label}>Place of Supply</div>
              <div className={styles.value}>
                {invoice?.addressDetail?.stateName && invoice?.addressDetail?.stateCode
                  ? `${invoice.addressDetail.stateName} ${invoice.addressDetail.stateCode}`
                  : "Delhi 07"}
              </div>
            </div>

            {/* RIGHT */}
            <div>
              <div className={styles.sectionTitle}>DELIVERY SERVICE PROVIDER</div>

              <div className={styles.label}>Business GSTIN</div>
              <div className={styles.value}>{invoice?.kyc?.gstNumber}</div>

              <div className={styles.label}>Business Name</div>
              <div className={styles.value}>
                {invoice?.latestServicemanDetail?.name}
              </div>

              <div className={styles.label}>Address</div>
              <div className={styles.value}>
                {invoice?.latestServicemanDetail?.currentAddress}
              </div>

              <div className={styles.label}>State Name & Code</div>
              <div className={styles.value}>
                {invoice?.companyDetail?.stateName} {invoice?.companyDetail?.stateCode}
              </div>
            </div>
          </div>

          {/* ITEMS */}
          <div className={styles.items}>
            <div className={styles.itemsHeader}>
              <div className={styles.label}>Items</div>
              <div className={styles.label}>Taxable Value</div>
            </div>

            {calculatedItems?.map((item) => (
              <div key={item?.id} className={styles.itemsBody}>
                {/* LEFT */}
                <div>
                  <div className={styles.itemName}>
                    <span style={{ fontWeight: "800" }}>Service Charge - </span>
                    {item?.name} × {item?.qty}
                  </div>
                </div>

                {/* RIGHT */}
                <div>
                  <div className={styles.breakupRow}>
                    <span>Gross Amount</span>
                    <span>Rs. {Number(item?.salePrice) - Number(item?.taxableValue) + Number(additionalPartAmount)}</span>
                  </div>

                  <div className={styles.breakupRow}>
                    <span>Discount</span>
                    <span>- Rs. 0</span>
                  </div>

                  <div className={styles.breakupRow}>
                    <span>Taxable Value</span>
                    <span>Rs. {Number(item?.salePrice) - Number(item?.taxableValue) + Number(additionalPartAmount)}</span>
                  </div>

                  {
                    invoice?.kyc?.gstNumber && (
                      <div className={styles.breakupRow}>
                        <span>GST @{item?.taxPercent}%</span>
                        <span>Rs. {item?.isProviderGST?.toFixed(2)}</span>
                      </div>
                    )
                  }
                </div>
              </div>
            ))}

            {/* TOTAL */}
            <div className={styles.totalBar}>
              <span>TOTAL AMOUNT</span>
              <span>Rs. {totalProviderInvoiceAmount?.toFixed(2)}</span>
            </div>
          </div>

          {/* FOOTER */}
          <div className={styles.footer}>
            <div className={styles.footerItem}>
              <img
                src={`${BASE_URL}/${invoice?.companyDetail?.qrCode}`}
                alt="qr"
                className={styles.footerImg}
              />
              <p>* Reverse Charge mechanism not applicable</p>
            </div>

            <div className={styles.footerItem}>
              <img
                src={`${BASE_URL}/${invoice?.companyDetail?.authorizedSignature}`}
                alt="signature"
                className={styles.footerImg}
              />
              <p>Signature of supplier / authorized representative</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
