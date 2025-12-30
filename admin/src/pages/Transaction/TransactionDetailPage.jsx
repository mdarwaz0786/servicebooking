/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";

const TransactionDetailPage = () => {
  const { validToken } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${apis.transaction.getSingle}/${id}`, {
          headers: { Authorization: validToken },
        });

        if (res?.data?.success) {
          setTransaction(res.data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTransaction();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!transaction) {
    return <div className="text-center mt-5">Transaction not found</div>;
  }

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card shadow-sm">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Transaction Details</h5>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
          </div>

          <div className="card-body">
            <h6 className="mb-3">Basic Information</h6>
            <div className="row mb-4">
              <Detail label="Transaction ID" value={transaction.transactionId || "-"} />
              <Detail label="Product Name" value={transaction.productName} />
              <Detail label="Product Type" value={transaction.productType || "-"} />
              <Detail label="Payment By" value={transaction.paymentBy} />
              <Detail label="Status" value={transaction.status?.toUpperCase()} />
              <Detail label="From" value={transaction.from} />
            </div>

            <h6 className="mb-3">User Information</h6>
            <div className="row mb-4">
              <Detail label="Name" value={transaction.name || transaction.user?.name || "-"} />
              <Detail label="Email" value={transaction.email || transaction.user?.email || "-"} />
              <Detail label="Phone" value={transaction.phone || transaction.user?.mobile || "-"} />
            </div>

            <h6 className="mb-3">Payment Information</h6>
            <div className="row mb-4">
              <Detail label="Amount" value={`₹ ${transaction.amount}`} />
              <Detail label="GST %" value={transaction.gstPercent} />
              <Detail label="Final Amount" value={`₹ ${transaction.finalAmount}`} />
              <Detail
                label="Payment Date"
                value={
                  transaction.paymentDate
                    ? new Date(transaction.paymentDate).toLocaleDateString()
                    : "-"
                }
              />
              <Detail label="Payment Time" value={transaction.paymentTime || "-"} />
            </div>

            {/* ================= TYPE ================= */}
            <h6 className="mb-3">Transaction Type</h6>
            <div className="row mb-4">
              <Detail
                label="Type"
                value={transaction.type === 1 ? "Add" : transaction.type === 2 ? "Deduct" : "-"}
              />
              <Detail label="PID" value={transaction.PID || "-"} />
            </div>

            {/* ================= ITEM DATA ================= */}
            {transaction.itemData && (
              <>
                <h6 className="mb-3">Item Data</h6>
                <pre className="bg-light p-3 rounded">
                  {JSON.stringify(transaction.itemData, null, 2)}
                </pre>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= REUSABLE FIELD ================= */
const Detail = ({ label, value }) => (
  <div className="col-md-4 mb-3">
    <div className="text-muted small">{label}</div>
    <div className="fw-semibold">{value}</div>
  </div>
);

export default TransactionDetailPage;
