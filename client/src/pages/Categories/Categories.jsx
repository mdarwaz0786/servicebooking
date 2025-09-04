import { Link } from "react-router-dom";
import CategoryCard from "../../components/Category/CategoryCard";
const categoriesData = [
  {
    id: "1",
    name: "Women's Salon & Spa",
    icon: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg",
    image: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg",
    subCategory: [] // add subcategories if needed
  },
  {
    id: "2",
    name: "Men's Salon & Massage",
    icon: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg",
    image: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg",
    subCategory: []
  },
  {
    id: "3",
    name: "AC & Appliance Repair",
    icon: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg",
    image: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg",
    subCategory: [
      // Sub-categories examples (optional)
      {
        id: "3-1",
        name: "AC Service & Repair",
        icon: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg",
        image: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg",
        subSubCategory: [
          { id: "3-1-1", name: "Gas Refill", icon: "", image: "" },
          { id: "3-1-2", name: "Foam-jet Service", icon: "", image: "" }
        ]
      },
      {
        id: "3-2",
        name: "Washing Machine Repair",
        icon: "", image: "", subSubCategory: []
      }
    ]
  },
  {
    id: "4",
    name: "Cleaning & Pest Control",
    icon: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg",
    image: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg",
    subCategory: []
  },
  {
    id: "5",
    name: "Electrician, Plumber & Carpenter",
    icon: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg",
    image: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg",
    subCategory: []
  },
  {
    id: "6",
    name: "Native Water Purifier",
    icon: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg",
    image: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg",
    subCategory: []
  },
  {
    id: "7",
    name: "Painting & Waterproofing",
    icon: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg",
    image: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg",
    subCategory: []
  }
];



const Categories = () => {
  return (
    <div className="page-wrapper">
      <div className="content content-two">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-12 col-md-6">
              <div className="mb-3 pb-3 border-bottom">
                <label className="form-label">Search By Keyword</label>
                <input type="text" className="form-control" placeholder="What are you looking for?" />
              </div>
            </div>

            {categoriesData.map((cat) => (
              <>
                {cat.subCategory && cat.subCategory.length > 0 ? (
                  <>
                    <div className="col-lg-12 col-md-6">
                      <h2 class="breadcrumb-title mb-2 text-center">{cat.name}</h2>
                    </div>
                    {cat.subCategory.map((subCat) => (
                      <>
                        {subCat.subSubCategory && subCat.subSubCategory.length > 0 ? (
<<<<<<< HEAD
                          <>
                            <div className="col-lg-12 col-md-6">
                              <h6 class="breadcrumb-title mb-2 text-center">{subCat.name}</h6>
                            </div>
                            {subCat.subSubCategory.map((subSubCat) => (
                              <CategoryCard value={subSubCat} />
                            ))}
                          </>
                        ) : (
                          <>
=======
                            <>
                              <div className="col-lg-12 col-md-6">
                                <h6 class="breadcrumb-title mb-2 text-center">{subCat.name}</h6>
                              </div>
                              {subCat.subSubCategory.map((subSubCat) => (
                                <CategoryCard value={subSubCat} />
                              ))}
                            </>
                        ) : (
                          <> 
>>>>>>> 3b3bdd40175d71129bdafa60573b79152d406b95
                            {cat.subCategory.map((subCat) => (
                              <CategoryCard value={subCat} />
                            ))}
                          </>
<<<<<<< HEAD
                        )}
                      </>

=======
                        )}    
                      </>
                      
>>>>>>> 3b3bdd40175d71129bdafa60573b79152d406b95
                    ))}
                  </>
                ) : (
                  <CategoryCard value={cat} />
<<<<<<< HEAD
                )}
=======
                )}               

                
>>>>>>> 3b3bdd40175d71129bdafa60573b79152d406b95
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
