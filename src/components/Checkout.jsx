import Adress from "./Checkout/Adress";
// REDUX
import { useDispatch, useSelector } from "react-redux";

const Checkout = () => {
  const dispatch = useDispatch();

  // GLOBAL STATES
  const { checkoutActiveComponent } = useSelector((state) => state.ui);

  return (
    <div className="w-full flex flex-col flex-grow">
      <h1 className="text-[7vw] font-bold m-[4vw]">Kasse</h1>
      <Adress />
    </div>
  );
};

export default Checkout;
