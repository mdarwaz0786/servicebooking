import React, { useState } from "react";

const AdditionalServices = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      img: "assets/img/services/addservice-01.jpg",
      name: "Ceiling Fans Repairs",
      price: 400,
      duration: "30 min",
      rating: 4.9,
      added: false,
    },
    {
      id: 2,
      img: "assets/img/services/addservice-02.jpg",
      name: "Switches Changes",
      price: 250,
      duration: "30 min",
      rating: 4.9,
      added: false,
    },
    {
      id: 3,
      img: "assets/img/services/addservice-03.jpg",
      name: "Outlets & Wiring",
      price: 300,
      duration: "30 min",
      rating: 4.9,
      added: true,
    },
    {
      id: 4,
      img: "assets/img/services/addservice-04.jpg",
      name: "Fixing Faulty Wiring",
      price: 300,
      duration: "30 min",
      rating: 4.5,
      added: false,
    },
    {
      id: 5,
      img: "assets/img/services/addservice-05.jpg",
      name: "Lighting Fixtures",
      price: 1500,
      duration: "20 min",
      rating: 4.9,
      added: false,
    },
  ]);

  // Toggle Add/Added
  const toggleService = (id) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, added: !s.added } : s
      )
    );
  };

  return (
    <fieldset className="booking-content">
      <div className="book-card">
        {/* Title */}
        <div className="d-flex align-items-center justify-content-between flex-wrap booking-title">
          <div className="d-flex align-items-center mb-2">
            <h6 className="fs-16 me-2 mb-2">Select Additional Service</h6>
            <span className="badge badge-info-transparent mb-2">
              Total : {services.length}
            </span>
          </div>

          {/* Cart Dropdown */}
          <div className="d-flex align-items-center mb-2">
            <div className="dropdown me-2 mb-2">
              <a
                href="#"
                className="bg-light-500 d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
              >
                <i className="ti ti-shopping-cart me-1"></i>
                Cart<span className="bg-primary num-count ms-1">
                  {services.filter((s) => s.added).length}
                </span>
              </a>
              <div className="dropdown-menu dropdown-sm p-3">
                <h6 className="fs-13 mb-3">
                  Added In Cart ({services.filter((s) => s.added).length})
                </h6>
                {services
                  .filter((s) => s.added)
                  .map((s) => (
                    <div key={s.id} className="mb-2">
                      <div className="d-flex align-items-center p-2 bg-light rounded mb-2">
                        <span className="avatar avatar-lg">
                          <img src={s.img} alt={s.name} />
                        </span>
                        <div className="ms-2">
                          <h6 className="mb-1">{s.name}</h6>
                          <p className="fs-12">
                            <i className="ti ti-star-filled text-warning me-1"></i>
                            <span className="text-gray-9">{s.rating}</span>
                          </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <h6 className="fw-medium">{s.name}</h6>
                          <p className="fs-10">{s.duration}</p>
                        </div>
                        <h6 className="fs-12 fw-medium">${s.price}</h6>
                      </div>
                    </div>
                  ))}
                {/* Total */}
                {services.filter((s) => s.added).length > 0 && (
                  <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                    <div>
                      <h6 className="fw-medium">Total</h6>
                    </div>
                    <h6 className="fw-medium">
                      $
                      {services
                        .filter((s) => s.added)
                        .reduce((acc, s) => acc + s.price, 0)}
                    </h6>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Services List */}
        <div className="row g-3">
          {services.map((service) => (
            <div key={service.id} className="col-md-6">
              <div className="select-item d-flex align-items-center justify-content-between flex-wrap border p-2 pb-0 mb-0">
                <div className="d-flex align-items-center pb-2">
                  <span className="avatar avatar-lg">
                    <img
                      src={service.img}
                      alt={service.name}
                      className="br-5"
                    />
                  </span>
                  <div className="ms-2">
                    <h6 className="mb-1 fs-12 fw-medium">{service.name}</h6>
                    <p className="fs-10">
                      <span className="fs-12 text-gray-9 fw-medium">
                        ${service.price}
                      </span>{" "}
                      / {service.duration}
                    </p>
                  </div>
                </div>
                <div className="d-flex align-items-center pb-2">
                  <p className="mb-0 d-flex align-items-center fs-12 me-2">
                    <i className="ti ti-star-filled text-warning me-1"></i>
                    {service.rating}
                  </p>
                  <button
                    onClick={() => toggleService(service.id)}
                    className={`btn btn-light btn-sm btn-addon d-inline-flex align-items-center ${
                      service.added ? "active" : ""
                    }`}
                  >
                    <i
                      className={`me-1 ${
                        service.added
                          ? "feather-check-circle"
                          : "feather-plus-circle"
                      }`}
                    ></i>
                    {service.added ? "Added" : "Add"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="booking-footer d-flex align-items-center justify-content-end">
        <div className="d-flex align-items-center">
          <a
            href="#"
            className="btn btn-sm btn-light d-inline-flex align-items-center prev_btn me-2"
          >
            <i className="ti ti-arrow-left me-1"></i>Prev
          </a>
          <a
            href="#"
            className="btn btn-sm btn-dark d-inline-flex align-items-center next_btn"
          >
            Next<i className="ti ti-arrow-right ms-1"></i>
          </a>
        </div>
      </div>
    </fieldset>
  );
};

export default AdditionalServices;
