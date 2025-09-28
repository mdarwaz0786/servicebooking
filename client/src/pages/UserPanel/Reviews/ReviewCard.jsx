import { Link } from "react-router-dom";
import Pagination from "../../../components/Pagination/Pagination";
import { AppContext } from "../../../context/AppContext";
import { useContext, useEffect, useState } from "react";

const ReviewCard = ({ data=[], handleRemoveReview, handlePagination }) => {

    return(

        <>
        {data.map((item, index)=>(
            <div className="col-xxl-12 col-lg-12">
                <div className="card shadow-none">
                    <div className="card-body">
                    <div className="d-md-flex align-items-center">
                        <div className="review-widget d-sm-flex flex-fill">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="d-flex">
                            <span className="review-img me-2">
                                <img src="/assets/img/providers/provider-22.jpg" className="rounded img-fluid" alt="User Image" />
                            </span>
                            <div>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                <div className="d-flex align-items-center">
                                    <h6 className="fs-14 me-2">Building Construction Services.</h6>
                                    <span><i className="ti ti-star-filled text-warning" /></span>
                                    <span><i className="ti ti-star-filled text-warning" /></span>
                                    <span><i className="ti ti-star-filled text-warning" /></span>
                                    <span><i className="ti ti-star-filled text-warning" /></span>
                                    <span><i className="ti ti-star-filled text-warning" /></span>
                                </div>
                                </div>
                                <div className="d-flex align-items-center">
                                <span className="avatar avatar-sm me-2">
                                    <img src="/assets/img/user/user-10.jpg" className="rounded-circle " alt="Img" />
                                </span>
                                <h6 className="fs-13 me-2">Jeffrey Akridge,</h6>
                                <span className="fs-12">July 11, 2024 11:38 am</span>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="user-icon d-inline-flex">
                        <Link className><i className="ti ti-trash" /></Link>
                        </div>
                    </div>
                    <div>
                        <p className="fs-14">
                        The construction service delivered excellent craftsmanship, completing my home renovation on
                        time with clear communication throughout. Highly recommend for quality and professionalism!
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