import CategoryCard from "../../components/Category/CategoryCard";

const Categories = ({categoryData = []}) => {
  return (
    <>
    
     
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center mt-4">
            
                {categoryData.map((cat) => (
                    <>
                    {cat.subcategories && cat.subcategories.length > 0 ? (
                        <>
                        <div className="col-lg-12 col-md-6">
                            <h2 class="breadcrumb-title mb-2 text-center">{cat.name}</h2>
                        </div>
                        {cat.subcategories.map((subCat) => (
                            <>
                            {subCat.subsubcategories && subCat.subsubcategories.length > 0 ? (
                                <>
                                <div className="col-lg-12 col-md-6">
                                    <h6 class="breadcrumb-title mb-2 text-center">{subCat.name}</h6>
                                </div>
                                {subCat.subsubcategories.map((subSubCat) => (
                                    <CategoryCard value={subSubCat} />
                                ))}
                                </>
                            ) : (
                                <>
                                {cat.subcategories.map((subCat) => (
                                    <CategoryCard value={subCat} />
                                ))}
                                </>
                            )}
                            </>

                        ))}
                        </>
                    ) : (
                        <CategoryCard value={cat} />
                    )}
                    </>
                ))}
        </div>
        </div>
     
    

    </>          
  );
};

export default Categories;
