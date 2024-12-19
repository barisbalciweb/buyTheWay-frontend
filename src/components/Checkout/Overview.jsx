import ProductInOverview from "./ProductInOverview";
import { useEffect, useState } from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAccountInfo,
  getUserData,
} from "../../features/account/accountSlice";
import _ from "lodash";
import {
  postOrder,
  resetOrderStatus,
} from "../../features/checkout/checkoutSlice";
import { useNavigate } from "react-router-dom";

const Overview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // LOCAL STATES
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [warning, setWarning] = useState(null);

  // GLOBAL STATES
  const { cartItems } = useSelector((state) => state.cart);
  const { userData } = useSelector((state) => state.account);
  const { userAccountInfo } = useSelector((state) => state.account);
  const { selectedPaymentMethod } = useSelector((state) => state.checkout);
  const { order } = useSelector((state) => state.checkout);
  const { addressFormValues } = useSelector((state) => state.checkout);
  const {
    title,
    firstName,
    lastName,
    street,
    houseNumber,
    zipCode,
    city,
    country,
  } = addressFormValues;

  // GET USER DATA FROM COOKIES
  useEffect(() => {
    dispatch(getUserData());
  }, []);

  // GET USER ACCOUNT INFO (FIRSNAME, LASTNAME, EMAIL)
  useEffect(() => {
    if (userData.status === "succeeded") {
      dispatch(
        getUserAccountInfo({
          userId: userData.result.id,
          requestedFields: ["email", "firstname", "lastname"],
        })
      );
    }
  }, [userData.status]);

  // CHECK IF ORDER WAS SUCCESSFUL
  useEffect(() => {
    if (order.status === "succeeded") {
      setSuccess(true);
    }
    if (order.status === "failed") {
      setWarning(
        "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut."
      );
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
      navigate("/");
      dispatch(resetOrderStatus());
    }
  }, [success, countdown]);

  const handleOrder = () => {
    setWarning(null);
    dispatch(
      postOrder({
        adress: addressFormValues,
        paymentMethod: selectedPaymentMethod,
        cartItems,
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
              {zipCode} {city}
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
            <ProductInOverview key={item.item.id + item.size} item={item} />
          ))}
        </div>
      </div>
      <button
        className="h-input w-full items-center disabled:bg-green-500 bg-black text-white mt-[5vw]"
        disabled={success}
        onClick={handleOrder}>
        {success ? "BESTELLUNG ABGESCHLOSSEN!" : " ZAHLUNGSPFLICHTIG BESTELLEN"}
      </button>
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
