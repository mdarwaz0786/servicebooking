import React, { useState } from "react";

const CartItem = () => {
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity(quantity + 1);
  const decrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <>
        <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
                <p className="mb-1 cart-item-name">Foam-jet service <br /> (2 ACs)</p>
            </div>
            
            <div className="d-flex align-items-center mb-3">
                <button className="btn btn-light border cart-item-btn" onClick={decrease}>-</button>
                <span className="mx-3">{quantity}</span>
                <button className="btn btn-light border cart-item-btn" onClick={increase}>+</button>
            </div>

            <div className="text-end">
                <p className="text-decoration-line-through small text-muted mb-0 cart-item-price">
                    ₹1,198
                </p>
                <p className="fw-bold text-dark mb-0 cart-item-price">₹998</p>
            </div>
        </div>

        
    </>
  );
};

export default CartItem;
