import CategoryModalCard from "../../components/Category/CategoryModalCard";

const Categories = ({ categoryData = [] }) => {
  return (
    <div className="container-fluid">
      <div className="row p-4 pt-0">
        {categoryData.map((cat) =>
          cat.subcategories?.length > 0 ? (
            <div key={cat.id} className="mb-5">
              <h5 className="text-center fw-bold text-dark mb-3">{cat.name}</h5>

              {cat.subcategories.map((subCat) => (
                <div key={subCat.id} className="mb-4">
                  {subCat.subsubcategories?.length > 0 ? (
                    <>
                      <h6 className="text-center fw-semibold text-muted mb-2">
                        {subCat.name}
                      </h6>
                      <div className="row g-3 justify-content-center">
                        {subCat.subsubcategories.map((subSubCat) => (
                          <CategoryModalCard
                            key={subSubCat.id}
                            value={subSubCat}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <CategoryModalCard key={subCat.id} value={subCat} />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <CategoryModalCard key={cat.id} value={cat} />
          )
        )}
      </div>
    </div>
  );
};

export default Categories;
