const SubCategoriesPage = () => {
  const subCategoriesData = [
    { id: 1, title: "Switch & Socket", image: "/assets/image/electrical/switch.webp" },
    { id: 2, title: "Fan", image: "/assets/image/electrical/fan.webp" },
    { id: 3, title: "Light", image: "/assets/image/electrical/light.webp" },
    { id: 4, title: "Wire", image: "/assets/image/electrical/wiring.webp" },
    { id: 5, title: "MCB", image: "/assets/image/electrical/mcb.webp" },
    { id: 6, title: "Bulb", image: "/assets/image/electrical/light.webp" },
  ];

  return (
    <div className="d-flex mt-4" style={{ gap: "20px" }}>
      {/* Card List (Sticky, 30%) */}
      <div style={{ flex: "0 0 30%" }}>
        <div style={{ position: "sticky", top: "20px" }}>
          <div className="row g-2">
            {subCategoriesData.map((card) => (
              <div key={card.id} className="col-4">
                <div className="card text-center shadow-sm p-2 h-100">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="mx-auto"
                    style={{ width: "50px", height: "50px", objectFit: "contain" }}
                  />
                  <div className="card-body p-1">
                    <h6 className="card-title mb-0" style={{ fontSize: "12px" }}>
                      {card.title}
                    </h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Package List (Scrollable, 60%) */}
      <div
        style={{ flex: "0 0 60%", maxHeight: "80vh", overflowY: "auto" }}
        className="p-3 border rounded shadow-sm"
      >
        <h4>Packages list</h4>
        <p>{Array(500).fill("This is package content. ").join(" ")}</p>
      </div>
    </div>
  );
};

export default SubCategoriesPage;
