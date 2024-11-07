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
        <h1 className="text-[8vw] font-bold m-[4vw]">WARENKORB</h1>
        {/* PRODUCTS IN CART */}
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <ProductInCart key={item.id} product={item} />
          ))
        ) : (
          <p className="text-[4vw]">Your cart is empty</p>
        )}
      </section>

      <section className="bg-[#D9D9D9] flex flex-col justify-center items-center">
        <h2 className="w-full text-[6vw] font-bold">Bestellübersicht</h2>
        <button className="bg-black text-white px-[20vw] py-[4vw]">
          ZUR KASSE
        </button>
      </section>
    </div>
  );
};

export default Cart;
