import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";


const ServiceListCard = () => {
    const { handleServiceDetail, serviceListData, PriceFormat, handleCartAddRemove, imageCheck, toggleModal } = useContext(AppContext);



    return (
        <>
            {serviceListData.map((value, index) => (


                <div className="service-list" key={index} id={value.categoryId}>
                    <div className="service-cont row">
                        <div className="service-cont-img col-4">
                            <Link>
                                <img
                                    className="img-fluid serv-img"
                                    alt="Service Image"
                                    src={imageCheck(value.image)}
                                />
                            </Link>
                            <div className="d-flex mt-1 justify-content-around align-items-center service-item-add-btn-section m-3 mb-0 mt-0">
                                <button
                                    className="btn btn-light border cart-item-btn"
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#serviceDetailModal"
                                    onClick={() =>
                                        handleServiceDetail(value._id,value)
                                    }
                                >
                                    <i className="fa fa-info"></i>
                                </button>

                                {(value?.quantity) ? (
                                    <>
                                        <button className="btn btn-light border cart-item-btn" onClick={() => handleCartAddRemove(value, 2)} >-</button>
                                        <span className="mx-3 item-qty">{value?.quantity ? value?.quantity : 0}</span>
                                        <button className="btn btn-light border cart-item-btn" onClick={() => handleCartAddRemove(value, 1)}>+</button>
                                    </>
                                ) : (
                                    <button
                                        className="btn btn-light border cart-item-btn"
                                        onClick={() => handleCartAddRemove(value, 1)}
                                    >
                                        <i className="fa fa-shopping-cart"></i>&nbsp;Add
                                    </button>
                                )}
                            </div>

                        </div>
                        <div className="service-cont-info col-8">
                            {/* <span className="badge bg-light fs-14 mb-2">Car Wash</span> */}
                            <h3 className="title">
                                <Link>{value.name}</Link>
                            </h3>
                            <div className="service-pro-img">
                                <span>
                                    <i className="fas fa-star filled" />
                                    {value?.ratings?.averageRating} ({value?.ratings?.totalRatings} reviews)
                                </span>
                            </div>
                            <p className="m-0"><i className="fa fa-inr" />
                                {PriceFormat(value.salePrice)}&nbsp;
                                <span className="fs-12">
                                    <span className="old-price text-muted text-decoration-line-through">{PriceFormat(value.mrpPrice)}</span>
                                    &nbsp;(Approximate time {value.timeTaking} )
                                </span>
                            </p>
                            {/* <p><i className="fa fa-tag" />499 per AC</p> */}
                            <p className="m-0"><span className="badge badge-success fs-15 mb-2">{PriceFormat(value.salePrice)} OFF</span></p>

                            {value.shortDescription}

                        </div>
                    </div>
                </div>
            ))}
        </>

    );
};

export default ServiceListCard;





