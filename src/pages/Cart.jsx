import React from "react";
// REDUX
import { useSelector } from "react-redux";
import ProductInCart from "../components/Cart/ProductInCart";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);

  console.log(cartItems);

  return (
    <div>
      <section>
        <h1>WARENKORB</h1>
        {/* PRODUCTS IN CART */}
        <div>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <ProductInCart key={item.id} product={item} />
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
      </section>
      <section>
        <h2>Bestellübersicht</h2>
        <button>ZUR KASSE</button>
      </section>
    </div>
  );
};

export default Cart;
