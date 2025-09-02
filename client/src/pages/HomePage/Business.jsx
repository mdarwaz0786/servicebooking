const Business = () => {
  return (
    <section className="section business-section bg-black">
      <div className="container">
        <div className="row align-items-center bg-01">
          <div className="col-md-6 wow fadeInUp" data-wow-delay="0.2s">
            <div className="section-header mb-md-0 mb-4">
              <h2 className="text-white display-4">Add Services &amp; Grow your <span className="text-linear-primary">business with
                us</span></h2>
              <p className="text-light">A versatile platform that connects you with local professionals across
                various categories, from home services like plumbing and electrical work to personal
                services like photography and tutoring.</p>
              <a href="javascript:void(0);" className="btn btn-linear-primary"><i className="ti ti-user-filled me-2" />Join
                Us</a>
            </div>
          </div>
          <div className="col-md-6 text-md-end wow fadeInUp" data-wow-delay="0.2s">
            <div className="business-img">
              <img src="assets/img/business.jpg" className="img-fluid" alt="img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Business;