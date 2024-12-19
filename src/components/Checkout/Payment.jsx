import { useEffect } from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { setCheckoutActiveComponent } from "../../features/ui/uiSlice";
import {
  setIsProgressStepDisabled,
  setSelectedPaymentMethod,
} from "../../features/checkout/checkoutSlice";

const Payment = () => {
  const dispatch = useDispatch();

  // GLOBAL STATES
  const { selectedPaymentMethod } = useSelector((state) => state.checkout);

  useEffect(() => {
    // ENABLE NEXT BUTTON IF PAYMENT METHOD IS SELECTED
    dispatch(
      setIsProgressStepDisabled({
        component: "overview",
        value: selectedPaymentMethod === "",
      })
    );
  }, [selectedPaymentMethod]);

  const handleChange = (e) => {
    dispatch(setSelectedPaymentMethod(e.target.value));
  };

  const handleNext = () => {
    dispatch(setCheckoutActiveComponent("overview"));
  };

  return (
    <section className="m-[4vw]">
      <div className="bg-gray-200 p-[6vw]">
        <h2 className="text-[5vw] font-bold mb-[5vw]">Zahlungsart</h2>
        <div>
          <input
            type="radio"
            id="invoice"
            name="paymentMethod"
            value="invoice"
            checked={selectedPaymentMethod === "invoice"}
            onChange={handleChange}
          />
          <label htmlFor="invoice" className="ml-[2vw]">
            Rechnung
          </label>
        </div>
        <button
          onClick={handleNext}
          className="h-input w-full bg-black text-white mt-[10vw] disabled:bg-slate-300"
          disabled={!selectedPaymentMethod}>
          Weiter
        </button>
      </div>
    </section>
  );
};

export default Payment;
