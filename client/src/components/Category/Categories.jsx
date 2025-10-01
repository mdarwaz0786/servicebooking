import CategoryCard from "../../components/Category/CategoryCard";

const Categories = ({categoryData = []}) => {
  return (
    <>
    
     
        <div className="container-fluid">
            <div className="row justify-content-center align-items-start mt-3 g-4">
                {categoryData.map((cat) => (
                <div key={cat.id} className="col-12">
                    {cat.subcategories?.length > 0 ? (
                    <>
                        <h5 className="text-center fw-bold text-dark mb-3">{cat.name}</h5>
                        {cat.subcategories.map((subCat) => (
                        <div key={subCat.id} className="mb-4">
                            {subCat.subsubcategories?.length > 0 ? (
                            <>
                                <h6 className="text-center fw-semibold text-muted mb-2">{subCat.name}</h6>
                                <div className="row g-3 justify-content-center">
                                {subCat.subsubcategories.map((subSubCat) => (
                                    <CategoryCard key={subSubCat.id} value={subSubCat} />
                                ))}
                                </div>
                            </>
                            ) : (
                            <div className="row g-3 justify-content-center">
                                <CategoryCard key={subCat.id} value={subCat} />
                            </div>
                            )}
                        </div>
                        ))}
                    </>
                    ) : (
                    <div className="row g-3 justify-content-center">
                        <CategoryCard key={cat.id} value={cat} />
                    </div>
                    )}
                </div>
                ))}
            </div>
            </div>
     
    

    </>          
  );
};

export default Categories;
