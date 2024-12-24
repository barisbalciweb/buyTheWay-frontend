// REDUX
import { useSelector } from "react-redux";
import ProductInCart from "../components/Cart/ProductInCart";
import { Link, useNavigate } from "react-router-dom";
import OrderSummary from "../components/OrderSummary";

const Cart = () => {
  const navigate = useNavigate();

  // GLOBAL STATES
  const { cartItems, cartItemsCount, total } = useSelector(
    (state) => state.cart
  );

  return (
    <>
      <h1 className="text-[7vw] font-bold m-[4vw]">
        Warenkorb {cartItems.length > 0 && `(${cartItemsCount})`}
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
                <ProductInCart key={item.product.id + item.size} item={item} />
              ))}
            </section>

            {/* ORDER SUMMARY*/}
            <OrderSummary total={total} cartItemsCount={cartItemsCount}>
              <button
                className="bg-black text-[5vw] text-white px-[20vw] py-[4vw] mt-[5vw]"
                onClick={() => navigate("/checkout")}>
                ZUR KASSE
              </button>
            </OrderSummary>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
