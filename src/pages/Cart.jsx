import { Link, useNavigate } from "react-router-dom";
import ProductInCart from "../components/Cart/ProductInCart";
import OrderSummary from "../components/OrderSummary";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { toggleProceedOptionsModal } from "../features/ui/uiSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // GLOBAL STATES
  const { authentication } = useSelector((state) => state.auth);
  const { cartItems, cartItemsCount, total } = useSelector(
    (state) => state.cart
  );

  const handleCheckoutButton = () => {
    // IF USER IS NOT LOGGED IN SHOW PROCEED OPTIONS
    if (authentication.status !== "succeeded") {
      dispatch(toggleProceedOptionsModal());
    } else {
      // IF USER IS LOGGED IN NAVIGATE TO CHECKOUT
      navigate("/checkout");
    }
  };

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
                onClick={handleCheckoutButton}>
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
