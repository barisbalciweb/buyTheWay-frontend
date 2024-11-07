import { useEffect } from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import ProductInCart from "../components/Cart/ProductInCart";
import { updateTotal } from "../features/cart/cartSlice";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateTotal());
  }, [cartItems]);

  return (
    <div>
      <section>
        <h1 className="text-[8vw] font-bold m-[4vw]">WARENKORB</h1>
        {/* PRODUCTS IN CART */}
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <ProductInCart key={item.item.id} item={item} />
          ))
        ) : (
          <p className="text-[4vw]">Your cart is empty</p>
        )}
      </section>

      <section className="bg-[#D9D9D9] flex flex-col justify-center items-center gap-[2vw] px-[5vw] py-[10vw]">
        <div className="w-full mb-[5vw]">
          <h2 className="text-[6vw] font-bold ">Bestellübersicht</h2>
          <p className="text-[4.5vw] text-gray-600">
            {cartItems.length} Artikel
          </p>
        </div>
        <div className="w-full flex justify-between">
          <p className="text-[4.5vw]">Zwischensumme</p>
          <p className="text-[4.5vw]">€</p>
        </div>
        <div className="w-full flex justify-between">
          <p className="text-[4.5vw]">Lieferung</p>
          <p className="text-[4.5vw]">kostenlos</p>
        </div>
        <div className="w-full flex justify-between border-t-customBorder border-black">
          <p className="text-[4.5vw] mt-[2vw]">Gesamtsumme</p>
          <p className="text-[4.5vw]">{total} €</p>
        </div>
        <button className="bg-black text-white px-[20vw] py-[4vw] mt-[5vw]">
          ZUR KASSE
        </button>
      </section>
    </div>
  );
};

export default Cart;
