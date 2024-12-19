import ProductInOverview from "./ProductInOverview";
import { useEffect, useState } from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAccountInfo,
  getUserData,
} from "../../features/account/accountSlice";
import _ from "lodash";
import { postOrder } from "../../features/checkout/checkoutSlice";

const Overview = () => {
  const dispatch = useDispatch();

  // LOCAL STATES
  const [success, setSuccess] = useState(false);

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

  useEffect(() => {
    if (order.status === "succeeded") {
      setSuccess(true);
    }
  }, [order.status]);

  const handleOrder = () => {
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
        className="h-input w-full items-center bg-black text-white mt-[5vw]"
        onClick={handleOrder}>
        ZAHLUNGSPFLICHTIG BESTELLEN
      </button>
      <p className="bg-green-200 p-[2vw] mt-[5vw]">
        Ihre Bestellung wurde erfolgreich aufgegeben! Wir haben Ihnen eine
        E-Mail mit den Auftragsdetails gesendet. Sie werden in ... Sekunden
        weitergeleitet.
      </p>
    </section>
  );
};

export default Overview;
