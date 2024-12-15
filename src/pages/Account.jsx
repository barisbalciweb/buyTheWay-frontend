import { useEffect } from "react";
import Orders from "../components/Account/Orders";
import { settings } from "../data/data";
import UserData from "../components/Account/UserData";
import AddressBook from "../components/Account/AddressBook";
import PaymentMethods from "../components/Account/PaymentMethods";
import AccountSettings from "../components/Account/AccountSettings";
import _ from "lodash";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { setActiveComponent } from "../features/ui/uiSlice";
import { getUserData } from "../features/account/accountSlice";

const Account = () => {
  const dispatch = useDispatch();

  // GET USER DATA
  useEffect(() => {
    dispatch(getUserData());
  }, []);

  // GLOBAL STATE
  const { activeComponent } = useSelector((state) => state.ui);
  const { userData } = useSelector((state) => state.account);

  const handleClick = (title, id) => {
    dispatch(setActiveComponent({ title, id }));
  };

  const renderActiveComponent = () => {
    switch (activeComponent.id) {
      case "orders":
        return <Orders />;
      case "user-data":
        return <UserData />;
      case "address-book":
        return <AddressBook />;
      case "payment-methods":
        return <PaymentMethods />;
      case "account-settings":
        return <AccountSettings />;
      default:
        return null;
    }
  };

  return (
    <main className="p-[4vw] flex flex-col flex-grow">
      <section className="mb-[10vw]">
        <h1 className="text-[7vw] font-bold mb-[4vw]">Mein Konto</h1>
        <h2 className="text-[5vw]">
          Wilkommen, {_.capitalize(userData.result?.firstname)}
        </h2>
        <p className="text-[4vw]">Kundennummer: {userData.result?.id}</p>
      </section>

      {activeComponent ? (
        renderActiveComponent()
      ) : (
        <section className="mb-[10vw]">
          <ul className="flex flex-col gap-[2vw]">
            {settings.map(({ title, id }) => (
              <li key={id}>
                <button
                  className="w-full border-gray-400 border-customBorder rounded-md text-[4vw] shadow-md font-bold text-center py-[6vw] px-[2vw]"
                  onClick={() => handleClick(title, id)}>
                  {title}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
};

export default Account;
