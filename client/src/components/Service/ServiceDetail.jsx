import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

const ServiceDetail = () => {
  const { handleRateCardDetail, serviceDetailData, PriceFormat, imageCheck, handleCartAddRemove, serviceDetailDataItem, toggleModal, SERVER_BASE_URL } = useContext(AppContext);
  const data = serviceDetailData;
  const rating = data.ratings;
  const ratingCount = rating?.ratingCount;
  let ratingArray = [1, 2, 3, 4, 5];

  const count1 = 0;
  const count2 = 0;
  const count3 = 0;
  const count4 = 0;
  const count5 = 0;

  const percent1 = 0;
  const percent2 = 0;
  const percent3 = 0;
  const percent4 = 0;
  const percent5 = 0;

  if (ratingCount) {
    const count1 = ratingCount["1"] || 0;
    const count2 = ratingCount["2"] || 0;
    const count3 = ratingCount["3"] || 0;
    const count4 = ratingCount["4"] || 0;
    const count5 = ratingCount["5"] || 0;

    // Step 2: Total ratings
    const totalRatings = count1 + count2 + count3 + count4 + count5 || 1; // prevent division by 0

    // Step 3: Calculate percentage for each
    const percent1 = ((count1 / totalRatings) * 100).toFixed(1);
    const percent2 = ((count2 / totalRatings) * 100).toFixed(1);
    const percent3 = ((count3 / totalRatings) * 100).toFixed(1);
    const percent4 = ((count4 / totalRatings) * 100).toFixed(1);
    const percent5 = ((count5 / totalRatings) * 100).toFixed(1);

    // console.log(percent5);
  }



  return (

    <div className="row">
      <div className="col-xl-12">
            {/* Slider */}
            <div className="service-wrap mb-4">
              <div
                className="service-img position-relative overflow-hidden rounded mb-3"
                style={{ height: "220px" }}
              >
                <img
                  src={imageCheck(data.image)}
                  className="w-100 h-100"
                  alt="Service"
                />
              </div>
            </div>
            {/* /Slider */}
        <div className="card border-0 shadow-none">
          <div className="card-body">


            <div className="service-head mb-2">
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <h3 className="mb-2">{data?.name}</h3>
              </div>
              <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                <div className=" align-items-center flex-wrap">
                  <p className="mb-2"><i className="ti ti-star-filled text-warning me-2" /><span className="text-gray-9">{data?.ratings?.averageRating} </span>({data?.ratings?.totalRatings} reviews)</p>
                  <p className="m-0">
                    {PriceFormat(data?.salePrice)}&nbsp;
                    <span className="fs-12">
                      <span className="old-price text-muted text-decoration-line-through">{PriceFormat(data?.mrpPrice)}</span>
                      &nbsp;(Approximate time {data?.timeTaking})
                    </span>
                  </p>
                </div>
              </div>
            </div>

            

            <div style={{    marginTop: '-30px'}}> 
              <div className="mb-5 mt-5">
                <h4 className="fw-bold mb-2">Service Overview</h4>
                <div>
                  <div
                  className="mt-1"
                  dangerouslySetInnerHTML={{ __html: data?.shortDescription }}
                  ></div>
                  
                  <div className="col-md-2">
                    <div className=" mt-1 justify-content-around align-items-center service-item-add-btn-section mb-0 mt-0">
                        {(serviceDetailDataItem?.quantity) ? (
                            <>
                              <button
                                className="btn btn-light border cart-item-btn"
                                onClick={() => handleCartAddRemove(serviceDetailDataItem, 2)}
                                disabled={serviceDetailDataItem?.quantity <= 0}
                              >
                                -
                              </button>

                              <span className="mx-3 item-qty">
                                {serviceDetailDataItem?.quantity || 0}
                              </span>

                              <button
                                className="btn btn-light border cart-item-btn"
                                onClick={() => handleCartAddRemove(serviceDetailDataItem, 1)}
                                disabled={serviceDetailDataItem?.quantity >= serviceDetailDataItem?.maxBookingQuantity}
                              >
                                +
                              </button>
                            </>
                        ) : (
                            <button
                              className="btn btn-light border cart-item-btn"
                              onClick={() => handleCartAddRemove(serviceDetailDataItem, 1)}
                            >
                              <i className="fa fa-shopping-cart"></i>&nbsp;Add
                            </button>
                        )}
                    </div>
                  </div>

                  <br />

                  {data?.rateCard ? (
                      <button
                          className="btn btn-primary-ghost w-50 d-flex justify-content-between align-items-center"
                          onClick={() =>
                              handleRateCardDetail(data._id, data)
                          }
                      >
                          Standard Transparent Rate List
                          <i className="fa fa-angle-right"></i>
                      </button>
                  ) : null}
                  
                  <div
                  className="mt-1"
                  dangerouslySetInnerHTML={{ __html: data?.fullDescription }}
                  ></div>
                </div>
              </div>

              {data.serviceIncluded && (
                <div className="mb-5">
                  <div className="bg-light-500 p-5 pb-5 br-10">
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <h3
                        style={{
                          fontSize: "28px",
                          fontWeight: "600",
                          color: "#00522c",
                          marginBottom: "30px",
                          backgroundColor: "#c7d7cd",
                          padding: "15px 25px",
                          borderRadius: "12px",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          display: "inline-block",
                        }}
                      >
                        {data.serviceIncluded?.mainTitle}
                      </h3>
                    </div>
                    <div>
                      {data.serviceIncluded.titles.map((item, index) => (
                        <div key={index} className="d-flex mb-3">
                          <i className="feather-check-circle text-success me-2" style={{ fontSize: "30px" }} />
                          <span style={{ fontSize: "15px", color: "#00522c" }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {data?.requirementFromCustomer && (
                <div className="mb-5">
                  <div className="bg-light-500 p-5 br-10 text-center">
                    {/* Title */}
                    <h3
                      style={{
                        fontSize: "32px",
                        fontWeight: "600",
                        color: "#00522c",
                        marginBottom: "30px",
                      }}
                    >
                      {data.requirementFromCustomer.mainTitle}
                    </h3>

                    {/* Requirements*/}
                    <div className="row justify-content-center g-4">
                      {data?.requirementFromCustomer?.requirements?.map((req) => (
                        <div
                          key={req?._id}
                          className="col-6 col-sm-6 col-md-3 d-flex justify-content-center"
                        >
                          <div
                            className="d-flex flex-column align-items-center justify-content-center bg-gray-100 "
                            style={{
                              borderRadius: "12px",
                              width: "100px",
                              height: "100px",
                              objectFit: "contain",
                              boxShadow: '3px 3px 0px rgb(0 0 0 / 22%)',
                            }}
                          >
                            <img
                              src={`${SERVER_BASE_URL}${req?.icon}`}
                              alt={req?.name}
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "contain",
                              }}
                            />
                            <span style={{ fontSize: "14px", fontWeight: "500", color: "#00522c" }}>
                              {req?.name}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {
                (data?.whyChooseUs) && (
                  <div className="container bg-light-500 p-3 mb-5 rounded-3">
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <h3
                        style={{
                          fontSize: "28px",
                          fontWeight: "600",
                          color: "#00522c",
                          marginBottom: "30px",
                          backgroundColor: "#c7d7cd",
                          padding: "15px 25px",
                          borderRadius: "12px",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          display: "inline-block",
                          marginTop: "16px"
                        }}
                      >
                        {data?.whyChooseUs?.mainTitle}
                      </h3>
                    </div>

                    <div className="row">
                      {data?.whyChooseUs?.reasons?.map((reason, index) => (
                        <div className="col-md-6 mb-4" key={reason?._id}>
                          <div className="d-flex">
                            <div className="me-3">
                              <span className="">
                                {index + 1}.
                              </span>
                            </div>
                            <div>
                              <h6 className="fw-bold text-primary mb-1">{reason?.title}</h6>
                              <p className="mb-0">{reason?.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }

              {data?.expertTechnician && (
                <div className="mb-5">
                  <div className="bg-light-500 p-5 pb-5 br-10">
                    <div className="row align-items-stretch">
                      {/* Left Section*/}
                      <div className="col-md-7 d-flex flex-column justify-content-center">
                        <h3
                          style={{
                            fontSize: "40px",
                            fontWeight: "700",
                            color: "#00522c",
                            marginBottom: "20px",
                          }}
                        >
                          {data?.expertTechnician?.mainTitle}
                        </h3>

                        {data?.expertTechnician?.points?.map((item, index) => (
                          <div key={index} className="d-flex align-items-center mb-3">
                            <img
                              src={`${SERVER_BASE_URL}${item?.icon}`}
                              alt="icon"
                              className="me-3"
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "contain",
                              }}
                            />
                            <span style={{ fontSize: "20px", color: "#00522c" }}>
                              {item?.title}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Right Section */}
                      <div className="col-md-5 p-0">
                        <div
                          style={{
                            height: "100%",
                            width: "100%",
                            borderRadius: "12px",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={`${SERVER_BASE_URL}${data?.expertTechnician?.image}`}
                            alt="technician"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {data?.brandLogo && (
                <div className="mb-5">
                  <div className="bg-light-500 p-5 pb-4 br-10 text-center">
                    {/* Title */}
                    <h3
                      style={{
                        fontSize: "28px",
                        fontWeight: "600",
                        color: "#00522c",
                        marginBottom: "20px",
                      }}
                    >
                      {data?.brandLogo?.mainTitle}
                    </h3>

                    {/* Logos Grid */}
                    <div className="row justify-content-center g-1">
                      {data?.brandLogo?.icons?.map((icon, index) => (
                        <div
                          key={index}
                          className="col-6 col-sm-6 col-md-4 d-flex justify-content-center"
                        >
                          <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                              borderRadius: "12px",
                              padding: "15px 25px",
                              height: "70px",
                              width: "150px",
                            }}
                          >
                            <img
                              src={`${SERVER_BASE_URL}${icon}`}
                              alt={`brand-${index}`}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                boxShadow: '3px 3px 0px rgb(0 0 0 / 22%)',
                                borderRadius: '5px',
                                background: 'white',
                                padding: '5px 5px',
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Description */}
                    <p
                      className="mt-4 mb-0"
                      style={{
                        fontSize: "14px",
                        color: "#555",
                      }}
                    >
                      {data?.brandLogo?.description}
                    </p>
                  </div>
                </div>
              )}

              {data?.gIPromise && (
                <div className="mb-5">
                  <div className="bg-light-500 p-5 pb-5 br-10">
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <h3
                        style={{
                          fontSize: "28px",
                          fontWeight: "600",
                          color: "#00522c",
                          marginBottom: "30px",
                          backgroundColor: "#c7d7cd",
                          padding: "15px 25px",
                          borderRadius: "12px",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          display: "inline-block",
                        }}
                      >
                        {data?.gIPromise?.mainTitle}
                      </h3>
                    </div>
                    <div>
                      {data?.gIPromise?.titles?.map((item, index) => (
                        <div key={index} className="d-flex mb-3">
                          <i className="feather-x-circle text-danger me-2" style={{ fontSize: "30px" }} />
                          <span style={{ fontSize: "15px", color: "#00522c" }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}


              {(data?.serviceFaq) ? (
                <>
                  <h2 className="">
                    {data?.serviceFaq?.mainTitle}
                  </h2>
                  <div id="faq" className="accordion-collapse collapse show">
                    <div className="accordion-body border-0 p-0 pt-3">
                      <div className="accordion accordion-customicon1 faq-accordion" id="accordionfaq">

                        {data.serviceFaq.faqs.map((item, index) => (
                          <div className="accordion-item bg-light-500 mb-3" key={index}>
                            <h2 className="accordion-header">
                              <button className={`accordion-button bg-light-500 br-10 fs-16 fw-medium ${index == 0 ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target={`#faq${index}`} aria-expanded="false">
                                {item.question}
                              </button>
                            </h2>
                            <div id={`faq${index}`} className={`accordion-collapse collapse ${index == 0 ? 'show' : ''}`} data-bs-parent="#accordionfaq">
                              <div className="accordion-body border-0 pt-0">
                                <p>{item.answer}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (null)}
            </div>
          </div>
        </div>


        <div className="card border-0 mb-xl-0 mb-4">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-5">
                <div className="rating-item bg-light-500 text-center mb-3">
                  <h5 className="mb-3">Customer Reviews &amp; Ratings</h5>
                  <div className="d-inline-flex align-items-center justify-content-center">

                    {ratingArray.map((item, index) =>
                      <span key={index + '' + item}>
                        {(item <= data?.averageRating) ? (
                          <i className="ti ti-star-filled text-warning me-1" key={index} />
                        ) : (<i className="ti ti-star text-warning me-1" key={index} />)}
                      </span>
                    )}

                  </div>
                  <p className="mb-3">({rating?.averageRating} out of 5.0)</p>
                  <p className="text-gray-9">Based On {data?.totalRatings || 0} Reviews</p>
                </div>
              </div>
              <div className="col-md-7">
                <div className="rating-progress mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <p className="me-2 text-nowrap mb-0">5 Star Ratings</p>
                    <div className="progress w-100" role="progressbar" aria-valuenow={90} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar bg-warning" style={{ width: percent5 + '%' }} />
                    </div>
                    <p className="progress-count ms-2">{count5}</p>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <p className="me-2 text-nowrap mb-0">4 Star Ratings</p>
                    <div className="progress mb-0 w-100" role="progressbar" aria-valuenow={80} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar bg-warning" style={{ width: percent4 + '%' }} />
                    </div>
                    <p className="progress-count ms-2">{count4}</p>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <p className="me-2 text-nowrap mb-0">3 Star Ratings</p>
                    <div className="progress mb-0 w-100" role="progressbar" aria-valuenow={70} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar bg-warning" style={{ width: percent3 + '%' }} />
                    </div>
                    <p className="progress-count ms-2">{count3}</p>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <p className="me-2 text-nowrap mb-0">2 Star Ratings</p>
                    <div className="progress mb-0 w-100" role="progressbar" aria-valuenow={90} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar bg-warning" style={{ width: percent2 + '%' }} />
                    </div>
                    <p className="progress-count ms-2">{count2}</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <p className="me-2 text-nowrap mb-0">1 Star Ratings</p>
                    <div className="progress mb-0 w-100" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar bg-warning" style={{ width: percent1 + '%' }} />
                    </div>
                    <p className="progress-count ms-2">{count1}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="card review-item mb-3">
              <div className="card-body p-3">
                <div className="review-info">
                  <div className="d-flex align-items-center justify-content-between flex-wrap">
                    <div className="d-flex align-items-center mb-2">
                      <span className="avatar avatar-lg me-2 flex-shrink-0">
                        <img src="/assets/img/profiles/avatar-01.jpg" className="rounded-circle" alt="img" />
                      </span>
                      <div>
                        <h6 className="fs-16 fw-medium">Adrian Hendriques</h6>
                        <div className="d-flex align-items-center flex-wrap date-info">
                          <p className="fs-14 mb-0">2 days ago</p>
                          <p className="fs-14 mb-0">Excellent service!</p>
                        </div>
                      </div>
                    </div>
                    <span className="badge bg-success d-inline-flex align-items-center mb-2">
                      <i className="ti ti-star-filled me-1" />5
                    </span>
                  </div>
                  <p className="mb-2">The electricians were prompt, professional, and resolved our issues quickly.did a
                    fantastic job upgrading our electrical panel. Highly recommend them for any electrical work.</p>

                </div>

              </div>
            </div>

            <div className="text-center">
              <Link className="btn btn-light btn-sm">Load More</Link>
            </div> */}
          </div>
        </div>
      </div>
    </div >
  );
};

export default ServiceDetail;