import { Link } from "react-router-dom";

const categoriesData = [
  {
    id: "1",
    name: "Electrical",
    icon: "assets/img/icons/category-05.svg",
    image: "assets/img/services/service-29.jpg",
  },
  {
    id: "2",
    name: "Removal",
    icon: "assets/img/icons/category-02.svg",
    image: "assets/img/services/service-28.jpg",
  },
  {
    id: "3",
    name: "Construction",
    icon: "assets/img/icons/category-01.svg",
    image: "assets/img/services/service-26.jpg",
  },
  {
    id: "4",
    name: "Furniture Assembly",
    icon: "assets/img/icons/category-03.svg",
    image: "assets/img/services/service-30.jpg",
  },
  {
    id: "5",
    name: "Mobile Barbers",
    icon: "assets/img/icons/category-08.svg",
    image: "assets/img/services/service-31.jpg",
  },
  {
    id: "6",
    name: "Deliveries",
    icon: "assets/img/icons/category-07.svg",
    image: "assets/img/services/service-01.jpg",
  },
  {
    id: "7",
    name: "Cleaning",
    icon: "assets/img/icons/category-14.svg",
    image: "assets/img/services/service-33.jpg",
  },
  {
    id: "8",
    name: "Man and Van",
    icon: "assets/img/icons/category-06.svg",
    image: "assets/img/services/service-34.jpg",
  },
  {
    id: "9",
    name: "Nail Technicians",
    icon: "assets/img/icons/category-11.svg",
    image: "assets/img/services/service-35.jpg",
  },
  {
    id: "10",
    name: "Shop & Deliver",
    icon: "assets/img/icons/category-13.svg",
    image: "assets/img/services/service-32.jpg",
  },
  {
    id: "11",
    name: "Car Transport",
    icon: "assets/img/icons/category-15.svg",
    image: "assets/img/services/service-37.jpg",
  },
  {
    id: "12",
    name: "Hairdressers",
    icon: "assets/img/icons/category-12.svg",
    image: "assets/img/services/service-38.jpg",
  },
  {
    id: "13",
    name: "Computer Service",
    icon: "assets/img/icons/category-04.svg",
    image: "assets/img/services/service-39.jpg",
  },
  {
    id: "14",
    name: "Plumbing",
    icon: "assets/img/icons/category-10.svg",
    image: "assets/img/services/service-40.jpg",
  },
  {
    id: "15",
    name: "Carpentry",
    icon: "assets/img/icons/category-16.svg",
    image: "assets/img/services/service-41.jpg",
  },
  {
    id: "16",
    name: "Interior",
    icon: "assets/img/icons/category-09.svg",
    image: "assets/img/services/service-42.jpg",
  },
  {
    id: "17",
    name: "Car Wash",
    icon: "assets/img/icons/category-17.svg",
    image: "assets/img/services/service-43.jpg",
  },
];

const Categories = () => {
  return (
    <div className="page-wrapper">
      <div className="content content-two">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            {categoriesData.map((cat) => (
              <div key={cat.id} className="col-lg-3 col-md-6">
                <div className="category card wow fadeInUp" data-wow-delay="0.3s">
                  <div className="card-body">
                    <div className="feature-icon d-flex justify-content-center align-items-center mb-2">
                      <span className="rounded-pill d-flex justify-content-center align-items-center p-3">
                        <img src={cat.icon} className="img-fluid" alt={cat.name} />
                      </span>
                    </div>
                    <h5 className="text-center">
                      <Link to={`/sub-categories/${cat?.name}/${cat.id}`}>{cat.name}</Link>
                    </h5>
                    <div className="overlay">
                      <img src={cat.image} className="img-fluid" alt={cat.name} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
