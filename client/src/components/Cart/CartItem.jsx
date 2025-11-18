
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";

const CartItem = () => {
    const { serviceListData, PriceFormat, handleCartAddRemove, cartItems } = useContext(AppContext);


    return (
        <>
            <div className="cart-wrapper">
                <div className="cart-container">
                    {/* Header */}
                    <div className="cart-header d-flex fw-semibold mb-2">
                        <div className="cart-header-item">Item</div>
                        <div className="cart-header-qty text-center">Quantity</div>
                        <div className="cart-header-price text-end">Price</div>
                    </div>

                    {/* Cart Items */}
                    {cartItems.map((value, index) => (
                        <div
                            key={index}
                            className="cart-item d-flex align-items-start mb-2"
                        >
                            {/* Item name */}
                            <div className="cart-item-name">
                                <p className="mb-0 fw-semibold">{value.name}</p>
                            </div>

                            {/* Quantity */}
                            <div className="cart-item-qty text-center">
                                <span>{value?.quantity ? value?.quantity : 0}</span>
                            </div>

                            {/* Price */}
                            <div className="cart-item-price text-end fw-bold text-dark">
                                {PriceFormat(value.salePrice * value.quantity)}
                                <br/>
                                <span className="old-price text-muted text-decoration-line-through fs-11">
                                    {PriceFormat(value.mrpPrice * value.quantity)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CartItem;
