import Adress from "./Checkout/Adress";
import CheckoutProcess from "./Checkout/CheckoutProcess";
import Overview from "./Checkout/Overview";
import Payment from "./Checkout/Payment";
// REDUX
import { useSelector } from "react-redux";

const Checkout = () => {
  // GLOBAL STATES
  const { checkoutActiveComponent } = useSelector((state) => state.ui);

  const renderActiveComponent = () => {
    switch (checkoutActiveComponent) {
      case "adress":
        return <Adress />;
      case "payment":
        return <Payment />;
      case "overview":
        return <Overview />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex flex-col flex-grow p-[4vw]">
      <h1 className="text-[7vw] font-bold">Kasse</h1>
      {/* CHECHOKUT PROCESS */}
      <CheckoutProcess />
      {/* ACTIVE COMPONENT */}
      {renderActiveComponent()}
    </div>
  );
};

export default Checkout;
