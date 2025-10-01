import { Link } from "react-router-dom";
import Pagination from "../../../components/Pagination/Pagination";
import { AppContext } from "../../../context/AppContext";
import { useContext, useEffect, useState } from "react";

const ReviewCard = ({ data=[], handleRemoveReview, handlePagination }) => {

    const {imageCheck } = useContext(AppContext);
    return(

        <>
        {data.map((item, index)=>(
            <div className="col-xxl-12 col-lg-12" key={index}>
                <div className="card shadow-none">
                    <div className="card-body">
                    <div className="d-md-flex align-items-center">
                        <div className="review-widget d-sm-flex flex-fill">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="d-flex">
                            <span className="review-img me-2">
                                <img src={imageCheck(item.booking?.bookingItems[0]?.service?.image)} className="rounded img-fluid" alt="User Image" />
                            </span>
                            <div>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                <div className="d-flex align-items-center">
                                    <h6 className="fs-14 me-2">{item.booking?.bookingItems[0]?.service?.name}</h6>
                                    <div className="rating">
                                {(item?.rating)?(
                                    <>
                                        {[1,2,3,4,5].map((value) =>
                                            <span key={index+''+value}>
                                                {(value<=item?.rating)?(
                                                    <i className="fas fa-star filled" key={index}></i>
                                                ):(<i className="fas fa-star" key={index}></i>)}
                                            </span>
                                        )}
                                    </>
                                ):(null)}
                                </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="user-icon d-inline-flex">
                        <Link className="" onClick={()=>handleRemoveReview(item._id)}><i className="ti ti-trash" /></Link>
                        </div>
                    </div>
                    <div>
                        <p className="fs-14">
                        {item.description}
                        </p>
                    </div>
                    </div>
                </div>
            </div>
        ))}
        
        <Pagination handlePagination={handlePagination} />

        </>
    )

}

export default ReviewCard;