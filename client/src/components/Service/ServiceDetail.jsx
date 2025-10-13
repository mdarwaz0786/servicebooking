import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

const ServiceDetail = () => {
  const { serviceDetailData, PriceFormat, imageCheck, toggleModal } = useContext(AppContext);
  const data = serviceDetailData;
  const rating = data.ratings;
  const ratingCount = rating?.ratingCount;
  let ratingArray = [1,2,3,4,5];

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

  if(ratingCount)
  {
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

    console.log(percent5);
  }

  

  return (   
        
    <div className="row">
      <div className="col-xl-12">
        <div className="card border-0">
          <div className="card-body">
            
            {/* Slider */}
            <div className="service-wrap mb-4">
              <div className="slider-wrap">
                <div className="nav-center mb-3" id="large-img">
                  
                  <div className="service-img">
                    <img src={imageCheck(data.image)} className="img-fluid" alt="Slider Img" />
                  </div>
                 
                </div>
              </div>
            </div>
            {/* /Slider */}

            <div className="service-head mb-2">
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <h3 className="mb-2">Lighting Services</h3>
              </div>
              <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                <div className=" align-items-center flex-wrap">
                  <p className="mb-2"><i className="ti ti-star-filled text-warning me-2" /><span className="text-gray-9">4.9</span>(255 reviews)</p>
                  <p className="m-0">
                    {PriceFormat(data.salePrice)}&nbsp;
                    <span className="fs-12">
                        <span className="old-price text-muted text-decoration-line-through">{PriceFormat(data.mrpPrice)}</span>
                        &nbsp;(Approximate time {data.timeTaking} hrs)
                    </span>
                </p>
                </div>
                
              </div>
            </div>

            <div className="accordion service-accordion">
              
              <div className="accordion-item mb-4">
                <h2 className="accordion-header">
                  <button className="accordion-button p-0" type="button" data-bs-toggle="collapse" data-bs-target="#overview" aria-expanded="false">
                    Service Overview
                  </button>
                </h2>
                <div id="overview" className="accordion-collapse collapse show">
                  <div className="accordion-body border-0 p-0 pt-3">
                    <div className="more-text">
                      {data.shortDescription}
                      <br/>
                      {data.fullDescription}
                    </div>
                  </div>
                </div>
              </div>

            {(data.serviceIncluded)?(
              <div className="accordion-item mb-4">
                <h2 className="accordion-header">
                  <button className="accordion-button p-0" type="button" data-bs-toggle="collapse" data-bs-target="#include" aria-expanded="false">
                    Includes
                  </button>
                </h2>
                <div id="include" className="accordion-collapse collapse show">
                  <div className="accordion-body border-0 p-0 pt-3">
                    <div className="bg-light-200 p-3 pb-2 br-10">
                    {data.serviceIncluded.titles.map((item, index) => (
                      <p key={index} className="d-inline-flex align-items-center mb-2 me-4">
                        <i className="feather-check-circle text-success me-2" />
                        {item}
                      </p>
                    ))}
                    </div>
                  </div>
                </div>
              </div>
              ):(null)}


              {(data.requirementFromCustomer)?(
              <div className="accordion-item mb-4">
                <h2 className="accordion-header">
                  <button className="accordion-button p-0" type="button" data-bs-toggle="collapse" data-bs-target="#what-we-need" aria-expanded="false">
                    What we need
                  </button>
                </h2>                
                <div id="what-we-need" className="accordion-collapse collapse show">
                  <div className="accordion-body border-0 p-0 pt-3">                    
                    <div className="bg-light-200 p-3 offer-wrap row">                      

                      {data.requirementFromCustomer.requirements.map((item, index) => (
                        <div className="col-md-2" key={index}>
                          <div className="offer-item bg-white mb-2 pb-1">
                            <div className="text-center mb-2">
                              <span className="">
                                <img src={imageCheck(item.icon)} alt="img" className="br-10" />
                              </span>
                              <div className="mb-2 mt-2">
                                <h6 className="fs-16 fw-medium">{item.name}</h6>
                              </div>
                            </div>                        
                          </div>
                        </div> 
                      ))}                      

                    </div>
                  </div>
                </div>
              </div>
              ):(null)}

              {(data.whyChooseUs)?(
              <div className="accordion-item mb-4">
                <h2 className="accordion-header">
                  <button className="accordion-button p-0" type="button" data-bs-toggle="collapse" data-bs-target="#what-we-need" aria-expanded="false">
                    Why Go for This
                  </button>
                </h2>
                <div id="what-we-need" className="accordion-collapse collapse show">
                  <div className="accordion-body border-0 p-0 pt-3">                    
                    <div className="bg-light-200 p-3 offer-wrap row">                      

                      <ol>
                        {data.whyChooseUs.reasons.map((item, index) => (
                          <li key={index}>
                            {item.title}
                            {item.description}
                          </li>
                        ))}  
                      </ol>

                    </div>
                  </div>
                </div>
              </div>
              ):(null)}

              
              {(data.expertTechnician)?(
              <div className="accordion-item mb-4">
                <h2 className="accordion-header">
                  <button className="accordion-button p-0" type="button" data-bs-toggle="collapse" data-bs-target="#include" aria-expanded="false">
                    Expert Technicians
                  </button>
                </h2>
                <div id="include" className="accordion-collapse collapse show">
                  <div className="accordion-body border-0 p-0 pt-3">
                    <div className="bg-light-200 p-3 pb-2 br-10">
                      {data.expertTechnician.points.map((item, index) => (
                        <p className="d-inline-flex align-items-center mb-2 me-4" key={index}>
                          <img src={imageCheck(item.icon)} alt="img" className="br-10" />
                          {item.title}</p>
                      ))}  
                    </div>
                  </div>
                </div>
              </div>
              ):(null)}


              {(data.brandLogo)?(
              <div className="accordion-item mb-4">
                <h2 className="accordion-header">
                  <button className="accordion-button p-0" type="button" data-bs-toggle="collapse" data-bs-target="#what-we-need" aria-expanded="false">
                    Brands
                  </button>
                </h2>
                <div id="what-we-need" className="accordion-collapse collapse show">
                  <div className="accordion-body border-0 p-0 pt-3">
                    
                    <div className="bg-light-200 p-3 offer-wrap row">
                      {data.brandLogo.icons.map((item, index) => (
                        <div className="col-md-2" key={index}>
                          <div className="offer-item bg-white mb-2 pb-1">
                            <div className="text-center mb-2">
                              <span className="">
                                <img src={imageCheck(item)} alt="img" className="br-10" />
                              </span>
                            </div>                        
                          </div>
                        </div>
                        ))} 
                     

                    </div>

                  </div>
                </div>
              </div>
              ):(null)}


              {(data.gIPromise)?(
              <div className="accordion-item mb-4">
                <h2 className="accordion-header">
                  <button className="accordion-button p-0" type="button" data-bs-toggle="collapse" data-bs-target="#include" aria-expanded="false">
                    Excludes
                  </button>
                </h2>
                <div id="include" className="accordion-collapse collapse show">
                  <div className="accordion-body border-0 p-0 pt-3">
                    <div className="bg-light-200 p-3 pb-2 br-10">
                      {data.gIPromise.titles.map((item, index) => (
                        <p className="d-inline-flex align-items-center mb-2 me-4" key={index}>
                          <i className="feather-check-circle text-success me-2" />{item}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              ):(null)}


              {(data.serviceFaq)?(
              <div className="accordion-item mb-0">
                <h2 className="accordion-header">
                  <button className="accordion-button p-0" type="button" data-bs-toggle="collapse" data-bs-target="#faq" aria-expanded="false">
                    FAQ’s
                  </button>
                </h2>
                <div id="faq" className="accordion-collapse collapse show">
                  <div className="accordion-body border-0 p-0 pt-3">
                    <div className="accordion accordion-customicon1 faq-accordion" id="accordionfaq">
                      
                      {data.serviceFaq.faqs.map((item, index) => (
                      <div className="accordion-item bg-light-200 mb-3">
                        <h2 className="accordion-header">
                          <button className={`accordion-button bg-light-200 br-10 fs-16 fw-medium ${index==0?'collapsed':''}`} type="button" data-bs-toggle="collapse" data-bs-target={`#faq${index}`} aria-expanded="false">
                            {item.question}
                          </button>
                        </h2>
                        <div id={`faq${index}`} className={`accordion-collapse collapse ${index==0?'show':''}`} data-bs-parent="#accordionfaq">
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
              </div>
              ):(null)}


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
                        <span key={index+''+item}>
                            {(item<=data?.averageRating)?(
                                <i className="ti ti-star-filled text-warning me-1" key={index} />
                            ):(<i className="ti ti-star text-warning me-1" key={index} />)}
                        </span>
                    )}

                  </div>
                  <p className="mb-3">({rating?.averageRating} out of 5.0)</p>
                  <p className="text-gray-9">Based On {data?.totalRatings} Reviews</p>
                </div>
              </div>
              <div className="col-md-7">
                <div className="rating-progress mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <p className="me-2 text-nowrap mb-0">5 Star Ratings</p>
                    <div className="progress w-100" role="progressbar" aria-valuenow={90} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar bg-warning" style={{ width: percent5+'%' }} />
                    </div>
                    <p className="progress-count ms-2">{count5}</p>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <p className="me-2 text-nowrap mb-0">4 Star Ratings</p>
                    <div className="progress mb-0 w-100" role="progressbar" aria-valuenow={80} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar bg-warning" style={{ width: percent4+'%' }} />
                    </div>
                    <p className="progress-count ms-2">{count4}</p>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <p className="me-2 text-nowrap mb-0">3 Star Ratings</p>
                    <div className="progress mb-0 w-100" role="progressbar" aria-valuenow={70} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar bg-warning" style={{ width: percent3+'%' }} />
                    </div>
                    <p className="progress-count ms-2">{count3}</p>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <p className="me-2 text-nowrap mb-0">2 Star Ratings</p>
                    <div className="progress mb-0 w-100" role="progressbar" aria-valuenow={90} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar bg-warning" style={{ width: percent2+'%' }} />
                    </div>
                    <p className="progress-count ms-2">{count2}</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <p className="me-2 text-nowrap mb-0">1 Star Ratings</p>
                    <div className="progress mb-0 w-100" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar bg-warning" style={{ width: percent1+'%' }} />
                    </div>
                    <p className="progress-count ms-2">{count1}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card review-item mb-3">
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
            </div>
          </div>
        </div>
      </div>      
    </div>
        
     
    
  );
};

export default ServiceDetail;