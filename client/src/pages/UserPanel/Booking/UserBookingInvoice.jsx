import { useContext, useEffect, useState } from "react";

import { AppContext } from "../../../context/AppContext";
import { Link, useParams } from "react-router-dom";
import BookignReviewModal from "../../../components/Modal/BookignReviewModal";

const UserBookingInvoice = () => {
    const { bookingId } = useParams();
  const { Urls, postData, formatDateTime, formatDate, PriceFormat, imageCheck, bookingStatus, toggleModal } = useContext(AppContext);
  const [data, setdata] = useState([]);
  const [items, setitems] = useState([]);
  const fetchData = async () => {
      try { 
      const response = await postData({}, Urls.myBookingDetail+'/'+bookingId, "GET", 0, 1);
      
          setdata(response.data.booking?response.data.booking:[]);
          setitems(response.data.items?response.data.items:[]);
      
      } catch (error) { 
      console.error("Cart API Error:", error);
      }
  }

  
  useEffect(() => {  
  fetchData(); 
  }, []);  

  return (
    <>

        <div className="col-lg-9 mx-auto card" style={{padding: '15px 15px'}}> 
            

            {/* Invoice Header */}
            <div className="row invoice-details">
                <div className="col-md-4">
                <div>
                    <img src="/assets/img/logo.png" alt="logo" className="img-fluid" />
                </div>
                </div>
                <div className="col-md-8">
                <div className="text-end">
                    <h5 className="mb-1">Invoice</h5>
                    <div className="d-flex gap-3 justify-content-end">
                    <span className="fs-12 d-flex align-items-center">
                        <i className="ti ti-file-text me-1"></i>#{data.bookingId}
                    </span>
                    <span className="fs-12 d-flex align-items-center">
                        <i className="ti ti-calendar me-1"></i>{formatDateTime(data.createdAt)}
                    </span>
                    
                    </div>
                </div>
                </div>
            </div>

            {/* Invoice Content */}
            <div className="invoice-wrap">
                <div className="row">
                {/* From */}
                <div className="col-md-6">
                    <div className="invoice-address">
                    <h6 className="mb-2">Invoice From:</h6>
                    <ul>
                        <li>Truelysell</li>
                        <li>367 Hillcrest Lane, Irvine, California, United States</li>
                        <li className="mb-0">truelysell@example.com</li>
                    </ul>
                    </div>
                </div>

                {/* To */}
                <div className="col-md-6">
                    <div className="invoice-address d-flex justify-content-end">
                    <div>
                        <h6 className="mb-2">Invoice To:</h6>
                        <ul>
                            <li>{data?.address?.houseNumber}</li>
                            <li>{data?.address?.landmark}</li>
                        </ul>
                    </div>
                    </div>
                </div>

                {/* Table */}
                <div className="row">
                    <div className="col-12">
                    <div className="table-responsive">
                        <table className="table datatable">
                        <thead>
                            <tr>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>

                        {items.map((value, index)=>(
                            <tr key={index}>
                                <td>
                                    <img src={imageCheck(value?.service?.image)} className="img-thumbnail w-20" alt="img" style={{width: '80px'}} />
                                </td>
                                <td>
                                    <p className="fs-14 text-gray">
                                    {value?.service?.name}
                                    </p>
                                </td>
                                <td>
                                    <span className="fs-14 text-gray">{PriceFormat(value.salePrice)}</span>
                                </td>
                                <td>
                                    <span className="fs-14 text-gray">{value.quantity}</span>
                                </td>
                                <td>
                                    <span className="fs-14 text-gray">{PriceFormat(value.salePrice*value.quantity)}</span>
                                </td>
                            </tr>
                        ))}                            
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>

                {/* Payment Info */}
                <div className="col-md-6">
                    
                </div>

                {/* Totals */}
                <div className="col-md-6">
                    <div className="d-flex justify-content-end">
                    <div className="invoice-total">
                       <ul>
                        <li>
                            Sub Total <span className="ord-amt">{PriceFormat(data.amount)}</span>
                        </li>
                        {/* <li>
                            <p className="ord-code mb-0">
                            {" "}
                            Discount{" "}
                            <span className=" ms-2 p-2 badge badge-info-transparent">
                                NEW 2024
                            </span>
                            </p>{" "}
                            <span className="ord-amt">-$11.00</span>
                        </li> */}
                        <li>
                            GST @ {data.gstPercent} <span className="ord-amt">{PriceFormat(data.gstAmount)}</span>
                        </li>
                        <li className="ord-total mb-0">
                            Total <span className="ord-amt">{PriceFormat(data.payableAmount)}</span>
                        </li>
                        </ul>
                    </div>
                    </div>
                </div>

                {/* Terms & Conditions */}
                <div className="invoice-terms rounded">
                    <h6 className="fs-14 mb-3">Terms &amp; Conditions:</h6>
                    <ul>
                    <li>
                        All payments must be made according to the agreed schedule. Late
                        payments may incur additional fees.
                    </li>
                    <li className="mb-0">
                        Cancellations must be made within 10 days of service. Refunds
                        are subject to review and may not be granted if the service has
                        been substantially performed.
                    </li>
                    </ul>
                </div>
                </div>
            </div>
            </div>
  
    </>


  );
};

export default UserBookingInvoice;