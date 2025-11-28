import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useRef } from "react";

const ServiceListCard = ({ slug }) => {
    const {
        handleRateCardDetail,
        selectedCategory,
        setSelectedCategory,
        handleServiceDetail,
        serviceListData,
        PriceFormat,
        handleCartAddRemove,
        imageCheck,
        toggleModal,
        servicePageCategoryData
    } = useContext(AppContext);

    // ⭐ NEW: Category refs
    const categoryRefs = useRef({});

    // 🟢 Group services by Category ID
    const groupByCategory = (services) => {
        const result = {};

        services.forEach(item => {
            const cat =
                item.subSubSubCategoryId ||
                item.subSubCategoryId ||
                item.subCategoryId ||
                item.categoryId;

            if (!result[cat]) {
                result[cat] = [];
            }
            result[cat].push(item);
        });

        return result;
    };

    const groupedServices = groupByCategory(serviceListData);
    const hasCategories = servicePageCategoryData && servicePageCategoryData.length > 0;

    // ⭐ Scroll to category only (not service item)
    useEffect(() => {
        if (selectedCategory && categoryRefs.current[selectedCategory]) {
            categoryRefs.current[selectedCategory].scrollIntoView({
                behavior: "smooth",
                block: "start",
            });

            // setTimeout(() => {
            //     window.scrollBy(0, -110);
            // }, 300);
        }
    }, [selectedCategory]);


    return (
        <>

            {/* 🔥 CASE 1 — SEARCH MODE */}
            {!hasCategories &&
                Object.values(groupedServices).flat().map((value) => (
                    <div
                        className="service-list"
                        key={value._id}
                    >
                        <div className="service-cont row">

                            <div className="service-cont-img col-md-4">
                                <Link>
                                    <img
                                        className="img-fluid serv-img"
                                        alt="Service Image"
                                        src={imageCheck(value.image)}
                                    />
                                </Link>

                                <div className="d-flex mt-1 justify-content-around align-items-center service-item-add-btn-section m-3 mb-0 mt-0">
                                    <button
                                        className="btn btn-light border cart-item-btn"
                                        type="button"
                                        onClick={() => handleServiceDetail(value._id, value)}
                                    >
                                        <i className="fa fa-info"></i>
                                    </button>

                                    {value?.quantity ? (
                                        <>
                                            <button
                                                className="btn btn-light border cart-item-btn"
                                                onClick={() => handleCartAddRemove(value, 2)}
                                                disabled={value?.quantity <= 0}
                                            >
                                                -
                                            </button>

                                            <span className="mx-3 item-qty">
                                                {value?.quantity || 0}
                                            </span>

                                            <button
                                                className="btn btn-light border cart-item-btn"
                                                onClick={() => handleCartAddRemove(value, 1)}
                                                disabled={value?.quantity >= value?.maxBookingQuantity}
                                            >
                                                +
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            className="btn btn-light border cart-item-btn"
                                            onClick={() => handleCartAddRemove(value, 1)}
                                        >
                                            <i className="fa fa-shopping-cart"></i>&nbsp;Add
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="service-cont-info col-md-8">
                                <h3 className="title">
                                    <Link>{value.name}</Link>
                                </h3>

                                <div className="service-pro-img">
                                    <span>
                                        {[1, 2, 3, 4, 5].map((ratevalue, index2) =>
                                            <span key={index2 + '' + ratevalue}>
                                                {(ratevalue <= value?.rating) ? (
                                                    <i className="fas fa-star filled"></i>
                                                ) : (
                                                    <i className="fas fa-star"></i>
                                                )}
                                            </span>
                                        )}
                                        ({value?.review} reviews)
                                    </span>
                                </div>

                                <p className="m-0">
                                    {PriceFormat(value.salePrice)}&nbsp;
                                    <span className="fs-12">
                                        <span className="old-price text-muted text-decoration-line-through">
                                            {PriceFormat(value.mrpPrice)}
                                        </span>
                                        &nbsp;(Approximate time {value.timeTaking})
                                    </span>
                                </p>

                                <p className="m-0">
                                    <span className="badge badge-success fs-15 mb-2">
                                        {PriceFormat(value.offerContent)} OFF
                                    </span>
                                </p>

                                <div
                                    className="mt-1"
                                    dangerouslySetInnerHTML={{ __html: value.shortDescription }}
                                ></div>

                            </div>

                        </div>
                    </div>
                ))
            }


            {/* 🔥 CASE 2 — CATEGORY MODE */}
            {hasCategories &&
                servicePageCategoryData
                    .filter(cat => groupedServices[cat._id])
                    .filter(cat => !slug || cat.slug === slug)
                    .map(cat => {
                        const catId = cat._id;

                        return (
                            <div
                                key={catId}
                                ref={(el) => (categoryRefs.current[catId] = el)}   // ⭐ CATEGORY REF HERE
                                style={{ marginBottom: cat.name ? "0px" : "" }}
                            >

                                {cat.name && <h3 className="fw-bold mb-3">{cat.name}</h3>}

                                {groupedServices[catId].map((value) => (
                                    <div
                                        className="service-list"
                                        key={value._id}
                                    >
                                        <div className="service-cont row">

                                            <div className="service-cont-img col-md-4">
                                                <Link>
                                                    <img
                                                        className="img-fluid serv-img"
                                                        alt="Service Image"
                                                        src={imageCheck(value.image)}
                                                    />
                                                </Link>

                                                <div className="d-flex mt-1 justify-content-around align-items-center service-item-add-btn-section m-3 mb-0 mt-0">
                                                    <button
                                                        className="btn btn-light border cart-item-btn"
                                                        type="button"
                                                        onClick={() => handleServiceDetail(value._id, value)}
                                                    >
                                                        <i className="fa fa-info"></i>
                                                    </button>

                                                    {value?.quantity ? (
                                                        <>
                                                            <button
                                                                className="btn btn-light border cart-item-btn"
                                                                onClick={() => handleCartAddRemove(value, 2)}
                                                                disabled={value?.quantity <= 0}
                                                            >
                                                                -
                                                            </button>

                                                            <span className="mx-3 item-qty">
                                                                {value?.quantity || 0}
                                                            </span>

                                                            <button
                                                                className="btn btn-light border cart-item-btn"
                                                                onClick={() => handleCartAddRemove(value, 1)}
                                                                disabled={value?.quantity >= value?.maxBookingQuantity}
                                                            >
                                                                +
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <button
                                                            className="btn btn-light border cart-item-btn"
                                                            onClick={() => handleCartAddRemove(value, 1)}
                                                        >
                                                            <i className="fa fa-shopping-cart"></i>&nbsp;Add
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="service-cont-info col-md-8">
                                                <h3 className="title">
                                                    <Link>{value.name}</Link>
                                                </h3>

                                                <div className="service-pro-img">
                                                    <span>
                                                        {[1, 2, 3, 4, 5].map((ratevalue, index2) =>
                                                            <span key={index2 + '' + ratevalue}>
                                                                {(ratevalue <= value?.rating) ? (
                                                                    <i className="fas fa-star filled"></i>
                                                                ) : (
                                                                    <i className="fas fa-star"></i>
                                                                )}
                                                            </span>
                                                        )}
                                                        ({value?.review} reviews)
                                                    </span>
                                                </div>

                                                <p className="m-0">
                                                    {PriceFormat(value.salePrice)}&nbsp;
                                                    <span className="fs-12">
                                                        <span className="old-price text-muted text-decoration-line-through">
                                                            {PriceFormat(value.mrpPrice)}
                                                        </span>
                                                        &nbsp;(Approximate time {value.timeTaking})
                                                    </span>
                                                </p>

                                                <p className="m-0">
                                                    <span className="badge badge-success fs-15 mb-2">
                                                        {PriceFormat(value.offerContent)} OFF
                                                    </span>
                                                </p>

                                                <div
                                                    className="mt-1"
                                                    dangerouslySetInnerHTML={{ __html: value.shortDescription }}
                                                ></div>

                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    })}
        </>
    );
};

export default ServiceListCard;
