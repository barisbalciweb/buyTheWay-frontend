import { useEffect, useState } from "react";
import { addressInputs } from "../../data/data";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { setCheckoutActiveComponent } from "../../features/ui/uiSlice";
import {
  setAddressFormValues,
  setIsProgressStepDisabled,
} from "../../features/checkout/checkoutSlice";

const Address = () => {
  const dispatch = useDispatch();

  // LOCAL STATES
  const [isFormValid, setIsFormValid] = useState(false);

  //GLOBAL STATES
  const { addressFormValues } = useSelector((state) => state.checkout);
  const { selectedPaymentMethod } = useSelector((state) => state.checkout);

  // CHECK IF FORM IS FILLED OUT ON EVERY CHANGE
  useEffect(() => {
    // DEBOUNCE
    const checkFormValues = setTimeout(() => {
      const formCheck = Object.values(addressFormValues).every(
        (value) => value.trim() !== ""
      );

      setIsFormValid(formCheck);

      // DISABLE NEXT BUTTON IF FORM IS NOT FILLED OUT
      dispatch(
        setIsProgressStepDisabled({ component: "payment", value: !formCheck })
      );
      if (selectedPaymentMethod) {
        dispatch(
          setIsProgressStepDisabled({
            component: "overview",
            value: !formCheck,
          })
        );
      }
    }, 300);

    return () => clearTimeout(checkFormValues);
  }, [addressFormValues]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch(setAddressFormValues({ id, value }));
  };

  const handleNext = () => {
    dispatch(setCheckoutActiveComponent("payment"));
  };

  return (
    <section className="w-full flex justify-center">
      <form className="w-full flex flex-col gap-[2vw] bg-gray-200 p-[6vw]">
        <h2 className="text-[5vw] font-bold mb-[5vw]">Lieferadresse</h2>
        {addressInputs.map(({ label, inputId, type, placeholder, options }) => {
          return type === "select" ? (
            <div key={inputId} className="flex flex-col gap-[2vw]">
              <label htmlFor={inputId}>{label}</label>
              <select
                id={inputId}
                className="h-[12vw] bg-white"
                value={addressFormValues[inputId]}
                onChange={handleChange}>
                <option value="Bitte wählen" hidden>
                  Bitte wählen
                </option>
                {options.map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div key={inputId} className="flex flex-col gap-[2vw]">
              <label htmlFor={inputId}>{label}</label>
              <input
                id={inputId}
                value={addressFormValues[inputId]}
                className="h-[12vw] p-[3vw]"
                placeholder={placeholder}
                onChange={handleChange}
              />
            </div>
          );
        })}
        <button
          type="button"
          onClick={handleNext}
          className="w-full h-input bg-black text-white text-button disabled:bg-slate-300"
          disabled={!isFormValid}>
          WEITER
        </button>
      </form>
    </section>
  );
};

export default Address;
