import styles from "./Invoice.module.css";
import logo from "../../assets/logo.png";

const Invoice = () => {
  return (
    <div className={styles.invoice}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.logoSection}>
          <img src={logo} alt="logo" className={styles.logoImg} />
          <div className={styles.companyInfo}>
            7TH and 8TH Floor, Plot No 183, Udyog Vihar<br />
            Sector 20, Rajiv Nagar, Gurugram, Haryana – 122016<br />
            GSTIN: 06AABCU7755Q1ZK
          </div>
        </div>
        <div className={styles.title}>TAX INVOICE</div>
      </div>

      {/* GRID */}
      <div className={styles.grid}>
        {/* LEFT */}
        <div>
          <div className={styles.label}>Customer Name</div>
          <div className={styles.value}>sarvesh mishra</div>

          <div className={styles.label}>Invoice no.</div>
          <div className={styles.value}>UCIC240009711819</div>

          <div className={styles.label}>Delivery Address</div>
          <div className={styles.value}>
            Flat No-10, Upper Ground Floor, Daisy Apartment,<br />
            Gadaipur, DLF Farms, New Delhi, Delhi, India,<br />
            Landmark : Near NCC School
          </div>

          <div className={styles.label}>Invoice Date</div>
          <div className={styles.value}>13 Aug, 2024</div>

          <div className={styles.label}>State name & Code</div>
          <div className={styles.value}>Delhi, 07</div>

          <div className={styles.label}>Place of Supply</div>
          <div className={styles.value}>Delhi, 07</div>
        </div>

        {/* RIGHT */}
        <div>
          <div className={styles.sectionTitle}>DELIVERY SERVICE PROVIDER</div>

          <div className={styles.label}>Business GSTIN</div>
          <div className={styles.value}>06AABCU7755Q1ZK</div>

          <div className={styles.label}>Business Name</div>
          <div className={styles.value}>
            Urbanclap Technologies India Pvt. Ltd.
          </div>

          <div className={styles.label}>Address</div>
          <div className={styles.value}>
            7TH and 8TH Floor, Plot No 183, Udyog Vihar<br />
            Sector 20, Rajiv Nagar, Gurugram,<br />
            Haryana – 122016
          </div>
        </div>
      </div>

      {/* ITEMS */}
      <div className={styles.items}>
        <div className={styles.itemsHeader}>
          <div className={styles.label}>Items</div>
          <div className={styles.label}>Taxable Value</div>
        </div>

        <div className={styles.itemsBody}>
          <div>
            <div className={styles.itemName}>
              Convenience and Platform Fee
            </div>
            <div className={styles.itemSac}>SAC: 999799</div>
          </div>

          <div>
            <div className={styles.breakupRow}>
              <span>Gross Amount</span>
              <span>Rs. 5143.22</span>
            </div>

            <div className={styles.breakupRow}>
              <span>Discount</span>
              <span>- Rs. 0</span>
            </div>

            <div className={styles.breakupRow}>
              <span>
                Taxable Value
                <small>
                  (five thousand one hundred forty three point two only)
                </small>
              </span>
              <span>Rs. 5143.22</span>
            </div>

            <div className={styles.breakupRow}>
              <span>
                IGST @18%
                <small>
                  (nine hundred and twenty five point seven eight only)
                </small>
              </span>
              <span>Rs. 925.78</span>
            </div>
          </div>
        </div>

        <div className={styles.totalBar}>
          <span>TOTAL AMOUNT</span>
          <span>Rs. 6069</span>
        </div>
      </div>

      {/* FOOTER */}
      <div className={styles.footer}>
        <div>* Reverse Charge mechanism not applicable</div>
        <div>Signature of supplier / authorized representative</div>
      </div>
    </div>
  );
};

export default Invoice;
