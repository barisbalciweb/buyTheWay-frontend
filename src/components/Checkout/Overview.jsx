import ProductInOverview from "./ProductInOverview";
import { useEffect } from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAccountInfo,
  getUserData,
} from "../../features/account/accountSlice";
import _ from "lodash";

const Overview = () => {
  const dispatch = useDispatch();

  // GLOBAL STATES
  const { cartItems } = useSelector((state) => state.cart);
  const { userData } = useSelector((state) => state.account);
  const { userAccountInfo } = useSelector((state) => state.account);
  const {
    title,
    firstName,
    lastName,
    street,
    houseNumber,
    zipCode,
    city,
    country,
  } = useSelector((state) => state.checkout.addressFormValues);

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

  return (
    <section className="text-[4vw]">
      <h2 className="text-[5vw] font-bold mb-[5vw]">Zusammenfassung</h2>
      <div className="flex flex-col justify-center gap-[5vw] bg-gray-100 p-[4vw]">
        {/* USER DATA */}
        <div>
          <h3 className="font-bold">Kundendaten</h3>
          <p>
            {_.capitalize(userAccountInfo.result?.data.firstname)}{" "}
            {_.capitalize(userAccountInfo.result?.data.lastname)}
          </p>
          <p> {userAccountInfo.result?.data.email}</p>
        </div>
        {/* INVOICE ADRESS */}
        <div>
          <h3 className="font-bold">Rechnungsadresse</h3>
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
        {/* SHIPPING ADRESS */}
        <div className="">
          <h3 className="text-[4vw] font-bold">Lieferadresse</h3>
          <p>Lieferung an Rechnungsadresse</p>
        </div>
        {/* PAYMENT METHOD */}
        <div>
          <h3 className="font-bold">Zahlungsart</h3>
          <p>Rechnung</p>
        </div>
      </div>
      {/* ORDER SUMMARY */}
      <div>
        <h3 className="font-bold">Warenkorb</h3>
        {cartItems.map((item) => (
          <ProductInOverview key={item.item.id + item.size} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Overview;
