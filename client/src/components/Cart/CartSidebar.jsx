import React, { useState } from "react";
import CartItem from "./CartItem";
const CartSidebar = () => {
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity(quantity + 1);
  const decrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <div className="cart-sidebar p-3 shadow rounded bg-white">
      {/* Cart Section */}
      <h5 className="fw-bold mb-3">Cart</h5>
      
    <CartItem />
    <CartItem />
      

      

      {/* View Cart Button */}
      <button className="btn btn-primary w-100 mb-4">
        ₹998 <span className="text-decoration-line-through small ms-2">₹1,198</span> 
        <span className="ms-2">View Cart</span>
      </button>

      {/* Offer Section */}
      <div className="p-3 border rounded mb-3">
        <p className="fw-bold text-purple mb-1">Save 10% on every order</p>
        <p className="small mb-1">Get Plus now</p>
        <button className="btn btn-link p-0 text-decoration-none">
          View More Offers ▼
        </button>
      </div>

      {/* UC Promise */}
      <div className="p-3 border rounded">
        <h6 className="fw-bold">UC Promise</h6>
        <ul className="list-unstyled small mb-0">
          <li>✔ Verified Professionals</li>
          <li>✔ Hassle Free Booking</li>
          <li>✔ Transparent Pricing</li>
        </ul>
      </div>
    </div>
  );
};

export default CartSidebar;
