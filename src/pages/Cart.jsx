import { useEffect } from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import ProductInCart from "../components/Cart/ProductInCart";
import { updateTotal } from "../features/cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(updateTotal());
  }, [cartItems]);

  return (
    <>
      <h1 className="text-[7vw] font-bold m-[4vw]">
        Warenkorb {cartItems.length > 0 && `(${cartItems.length})`}
      </h1>

      <div className="flex flex-col flex-grow justify-center item">
        {cartItems.length === 0 ? (
          <section className="w-full h-[30vw] flex flex-col justify-center items-center gap-[5vw] text-[4vw]">
            <p>Dein Warenkorb ist leer</p>
            <button className="w-[50%] bg-black text-white p-[4vw] text-[4vw]">
              <Link to="/" className="w-full">
                JETZT SHOPPEN!
              </Link>
            </button>
          </section>
        ) : (
          <>
            <section>
              {/* PRODUCTS IN CART */}
              {cartItems.map((item) => (
                <ProductInCart key={item.item.id} item={item} />
              ))}
            </section>

            {/* TOTAL PREVIEW */}
            <section className="bg-[#D9D9D9] flex flex-col justify-center gap-[2vw] text-[4.5vw] px-[5vw] py-[10vw]">
              <div className="w-full mb-[5vw]">
                <h2 className="text-[6vw] font-bold">Bestellübersicht</h2>
                <p className="text-gray-600">{cartItems.length} Artikel</p>
              </div>
              <div className="flex justify-between">
                <p>Zwischensumme</p>
                <p>{total.toFixed(2)} €</p>
              </div>
              <div className="flex justify-between">
                <p>Lieferung</p>
                <p>kostenlos</p>
              </div>
              <hr className="border-black" />
              <div className="flex justify-between">
                <p>Gesamtsumme</p>
                <p>{total.toFixed(2)} €</p>
              </div>
              <button
                className="bg-black text-[5vw] text-white px-[20vw] py-[4vw] mt-[5vw]"
                onClick={() => navigate("/checkout")}>
                ZUR KASSE
              </button>
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
