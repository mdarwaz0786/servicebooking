import CategoryCard from "../../components/Category/CategoryCard";

const Categories = ({categoryData = []}) => {
  return (
    <>
    
     
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center mt-4">
            
                {categoryData.map((cat) => (
                    <>
                    {cat.subCategory && cat.subCategory.length > 0 ? (
                        <>
                        <div className="col-lg-12 col-md-6">
                            <h2 class="breadcrumb-title mb-2 text-center">{cat.name}</h2>
                        </div>
                        {cat.subCategory.map((subCat) => (
                            <>
                            {subCat.subSubCategory && subCat.subSubCategory.length > 0 ? (
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
                                {cat.subCategory.map((subCat) => (
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
