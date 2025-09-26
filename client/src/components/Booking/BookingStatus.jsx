import { Link } from "react-router-dom";

const BookingStatus = ({ value = '' }) => {
  return (
    
    <>
        {(value=='new')?(
            <span className="badge badge-soft-info ms-2">{value}</span>
        )
        :
        (value=='accept')?(
            <span className="badge badge-soft-success ms-2">{value}</span>
        )
        :
        (value=='reject')?(
            <span className="badge badge-soft-danger ms-2">{value}</span>
        )
        :
        (value=='ongoing')?(
            <span className="badge badge-soft-success ms-2">{value}</span>
        )
        :
        (value=='complete')?(
            <span className="badge badge-soft-success ms-2">{value}</span>
        )
        :
        (value=='cancel')?(
            <span className="badge badge-soft-success ms-2">{value}</span>
        ):(null)
        }
        
    </>

  );
};

export default BookingStatus;





