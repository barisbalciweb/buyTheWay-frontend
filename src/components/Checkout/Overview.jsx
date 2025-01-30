import ProductInOverview from "./ProductInOverview";
import { useEffect, useState } from "react";
import OrderSummary from "../OrderSummary";
import { BeatLoader } from "react-spinners";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getUserAccountInfo } from "../../features/account/accountSlice";
import _ from "lodash";
import {
  postOrder,
  resetAllStates,
} from "../../features/checkout/checkoutSlice";
import { useNavigate } from "react-router-dom";
import { emptyCart } from "../../features/cart/cartSlice";
import { resetCheckoutActiveComponent } from "../../features/ui/uiSlice";

const Overview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // LOCAL STATES
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [warning, setWarning] = useState(null);
  const [waiting, setWaiting] = useState(false);

  // GLOBAL STATES
  const { cartItems } = useSelector((state) => state.cart);
  const { userId } = useSelector((state) => state.auth.authentication);
  const { userAccountInfo } = useSelector((state) => state.account);
  const { selectedPaymentMethod } = useSelector((state) => state.checkout);
  const { total, cartItemsCount } = useSelector((state) => state.cart);
  const { order } = useSelector((state) => state.checkout);
  const { addressFormValues } = useSelector((state) => state.checkout);
  const {
    title,
    firstName,
    lastName,
    street,
    houseNumber,
    postalCode,
    city,
    country,
  } = addressFormValues;

  // GET USER ACCOUNT INFO (FIRSNAME, LASTNAME, EMAIL)
  useEffect(() => {
    if (userId) {
      dispatch(
        getUserAccountInfo({
          userId,
          requestedFields: ["email", "firstname", "lastname"],
        })
      );
    }
  }, [userId]);

  // CHECK IF ORDER WAS SUCCESSFUL
  useEffect(() => {
    if (order.status === "succeeded") {
      setSuccess(true);
      setWaiting(false);
    }
    if (order.status === "failed") {
      setWarning(
        "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut."
      );
      setWaiting(false);
    }
  }, [order.status]);

  // COUNTDOWN TO REDIRECT
  useEffect(() => {
    if (success && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    if (countdown === 0) {
      dispatch(resetAllStates());
      dispatch(emptyCart());
      dispatch(resetCheckoutActiveComponent());
      navigate("/");
    }
  }, [success, countdown]);

  const handleOrder = () => {
    setWaiting(true);
    setWarning(null);
    dispatch(
      postOrder({
        address: addressFormValues,
        paymentMethod: selectedPaymentMethod,
        cartItems,
        total,
      })
    );
  };

  return (
    <section>
      <h2 className="text-[5vw] font-bold mb-[5vw]">Zusammenfassung</h2>
      <div className="flex flex-col justify-center gap-[8vw] text-[4vw] bg-gray-200 p-[4vw]">
        {/* USER DATA */}
        <div className="flex flex-col gap-[1vw]">
          <h3 className="font-bold">Kundendaten:</h3>
          <div>
            <p>
              {_.capitalize(userAccountInfo.result?.data.firstname)}{" "}
              {_.capitalize(userAccountInfo.result?.data.lastname)}
            </p>
            <p> {userAccountInfo.result?.data.email}</p>
          </div>
        </div>
        {/* INVOICE ADRESS */}
        <div className="flex flex-col gap-[1vw]">
          <h3 className="font-bold">Rechnungsadresse:</h3>
          <div>
            <p>
              {title} {firstName} {lastName}
            </p>
            <p>
              {street} {houseNumber}
            </p>
            <p>
              {postalCode} {city}
            </p>
            <p>{country}</p>
          </div>
        </div>
        {/* SHIPPING ADRESS */}
        <div className="flex flex-col gap-[1vw]">
          <h3 className="font-bold">Lieferadresse:</h3>
          <p>Lieferung an Rechnungsadresse</p>
        </div>
        {/* PAYMENT METHOD */}
        <div className="flex flex-col gap-[1vw]">
          <h3 className="font-bold">Zahlungsart:</h3>
          <p>Rechnung</p>
        </div>
        {/* CART */}
        <div className="flex flex-col gap-[2vw] text-[4vw]">
          <h3 className="font-bold mb-[2vw]">Warenkorb:</h3>
          {cartItems.map((item) => (
            <ProductInOverview key={item.product.id + item.size} item={item} />
          ))}
        </div>
      </div>

      {/* ORDER SUMMARY */}
      <OrderSummary total={total} cartItemsCount={cartItemsCount}>
        <button
          className="w-full h-button items-center disabled:bg-green-500 bg-black text-white text-button mt-[5vw]"
          disabled={success}
          onClick={handleOrder}>
          {waiting ? (
            <BeatLoader size={"2vw"} color="white" />
          ) : success ? (
            "KAUF ABGESCHLOSSEN!"
          ) : (
            "JETZT KAUFEN"
          )}
        </button>
      </OrderSummary>

      {/* FEEDBACKS */}
      {success && (
        <div className="bg-green-200 text-[4vw] mt-[5vw] p-[2vw]">
          <p>Vielen Dank für Ihre Bestellung!</p>
          <p>Sie werden in {countdown} Sekunden weitergeleitet.</p>
        </div>
      )}
      {warning && (
        <div className="bg-red-200 text-[4vw] mt-[5vw] p-[2vw]">
          <p>{warning}</p>
        </div>
      )}
    </section>
  );
};

export default Overview;
