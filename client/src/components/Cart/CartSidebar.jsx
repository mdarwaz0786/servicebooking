
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";

const CartSidebar = () => {
  const { cartAmount, PriceFormat } = useContext(AppContext);

  
  return (
    <div className="cart-sidebar p-3 shadow rounded bg-white">
      {/* Cart Section */}
      <h5 className="fw-bold mb-3">Cart</h5>
      
      <CartItem />
    
      

      

      {/* View Cart Button */}
      <Link to={`../checkout`} className="btn btn-primary w-100 mb-4">
        {PriceFormat(cartAmount.amount)}
        <span className="ms-2">View Cart</span>
      </Link>

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
