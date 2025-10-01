
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";

const CartItem = () => {
  const { serviceListData, PriceFormat, handleCartAddRemove, cartItems } = useContext(AppContext);


  return (
    <>
        {cartItems.map((value, index)=>(
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <p className="mb-1 cart-item-name">{value.name} <br /></p>
                </div>
                
                <div className="d-flex align-items-center mb-3">
                    <button className="btn btn-light border cart-item-btn" onClick={()=> handleCartAddRemove(value,2)} >-</button>
                    <span className="mx-3 item-qty">{value?.quantity?value?.quantity:0}</span>
                    <button className="btn btn-light border cart-item-btn" onClick={()=> handleCartAddRemove(value,1)}>+</button>
                </div>

                <div className="text-end">
                    <p className="text-decoration-line-through small text-muted mb-0 cart-item-price">
                        {PriceFormat(value.mrpPrice*value.quantity)}
                    </p>
                    <p className="fw-bold text-dark mb-0 cart-item-price">{PriceFormat(value.salePrice*value.quantity)}</p>
                </div>
            </div>
        ))}
        
    </>
  );
};

export default CartItem;
