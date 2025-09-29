import { useContext, useEffect, useState } from "react";
import BookingListCard from "./BookingListCard";
import { AppContext } from "../../../context/AppContext";
import { Link } from "react-router-dom";

import BookignStartModal from "../../../components/Modal/BookignStartModal";

const ServiceManBookingPage = () => {

  const { modals,toggleModal, Urls, postData, setmyserviceListData, generateUniqueId } = useContext(AppContext);
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(10);
  const [type, settype] = useState('new');
  const [bookingId, setbookingId] = useState('');
  const fetchData = async () => {
      try { 

      let userId = generateUniqueId();

      const response = await postData({page:page,limit:limit,status:type}, Urls.serviceManBooking, "GET", 0, 1);
      
          setmyserviceListData(response.data?response.data:[]);
       
      } catch (error) { 
      console.error("Cart API Error:", error);
      }
  }
  const handlePagination = async (page, limit) => {
      setpage(page);
      if(limit) setlimit(limit);
  }

  const handleBookingType = async (type)=>{
    settype(type);
  }

  const handleBookingAccept = async (id)=>{
    try { 
      const response = await postData({}, Urls.serviceManBookingAccept+'/'+id, "POST", 0, 1);
       
      } catch (error) { 
      console.error("Cart API Error:", error);
      }
  }; 

  const handleBookingStartOtp = async (id)=>{
    setbookingId(id)
    toggleModal('BookignStartModal',true)
  }; 
  
  useEffect(() => {  
    fetchData(); 
  }, [page, limit, type]);

  return (
    <>
      <div className="row">
        <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mb-4">
          <h4>Booking List</h4>
          <div className="d-flex align-items-center flex-wrap row-gap-3 w-100 justify-content-around">
          
            <Link
              className="btn btn-dark d-flex align-items-center"
              onClick={()=> handleBookingType('new')}
            >
              New
            </Link>
            <Link
              className="btn btn-dark d-flex align-items-center"
              onClick={()=> handleBookingType('accept')}
            >
              Accepted
            </Link>
            <Link
              className="btn btn-dark d-flex align-items-center"
              onClick={()=> handleBookingType('reject')}
            >
              Rejected
            </Link>
            <Link
              className="btn btn-dark d-flex align-items-center"
              onClick={()=> handleBookingType('ongoing')}
            >
              Ongoing
            </Link>
            <Link
              className="btn btn-dark d-flex align-items-center"
              onClick={()=> handleBookingType('complete')}
            >
              Completed
            </Link>
            <Link
              className="btn btn-dark d-flex align-items-center"
              onClick={()=> handleBookingType('cancel')}
            >
              cancel
            </Link>

          </div>
        </div>
      </div>



      <>
        <div className="row justify-content-center"> 
          <div className="col-xxl-12 col-lg-12">
            
            <BookingListCard handlePagination={handlePagination} 
            handleBookingAccept={handleBookingAccept} 
            handleBookingStartOtp={handleBookingStartOtp} 
            />
            
          </div>
        </div>
        
      </>






    <BookignStartModal bookingId={bookingId} />

    </>
  );
};

export default ServiceManBookingPage;