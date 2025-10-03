
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
        {PriceFormat(cartAmount.payableAmount)}
        <span className="ms-2">View Cart</span>
      </Link>

      

      
    </div>
  );
};

export default CartSidebar;
