import { Link } from "react-router-dom";

const KycAlert = ({ value = '' }) => {
  return (
    
    <>
        
        {
        (value=='')?(
            <div className="alert alert-info">
                <strong>Information! </strong> Update your kyc first.
            </div>
        )
        :
        (value=='new')?(
            <div className="alert alert-success">
                <strong>Success! </strong> Your Kyc Approved.
            </div>
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

export default KycAlert;





