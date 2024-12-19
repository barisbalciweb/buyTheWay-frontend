import { useState } from "react";
// REDUX
import { useDispatch } from "react-redux";
import { setCheckoutActiveComponent } from "../../features/ui/uiSlice";

const Payment = () => {
  const dispatch = useDispatch();

  // LOCAL STATES
  const [paymentMethodValue, setPaymentMethodValue] = useState("Rechnung");

  const handleNext = () => {
    dispatch(setCheckoutActiveComponent("overview"));
  };

  return (
    <section className="m-[4vw]">
      <div className="bg-gray-200 p-[6vw]">
        <h2 className="text-[5vw] font-bold mb-[5vw]">Zahlungsmethode</h2>
        <div>
          <input
            type="radio"
            id="paymentMethod"
            checked
            value={paymentMethodValue}
          />
          <label htmlFor="paymentMethod" className="ml-[2vw]">
            Rechnung
          </label>
        </div>
        <button
          onClick={handleNext}
          className="h-input w-full bg-black text-white mt-[10vw]">
          Weiter
        </button>
      </div>
    </section>
  );
};

export default Payment;
