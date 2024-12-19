import { useState } from "react";
import { adressInputs } from "../../data/data";
// REDUX
import { useDispatch } from "react-redux";
import { setCheckoutActiveComponent } from "../../features/ui/uiSlice";

const Adress = () => {
  const dispatch = useDispatch();

  // LOCAL STATES
  const [formValues, setFormValues] = useState({
    title: "",
    firstName: "",
    lastName: "",
    street: "",
    houseNumber: "",
    zipCode: "",
    city: "",
    country: "",
  });
  const [warning, setWarning] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleNext = () => {
    const isFormValid = Object.values(formValues).every(
      (value) => value.trim() !== ""
    );
    // CHECK IF FORM IS FILLED OUT
    if (!isFormValid) {
      setWarning("Bitte füllen Sie alle Felder aus");
      return;
    }
    dispatch(setCheckoutActiveComponent("payment"));
  };

  return (
    <section className="w-full flex justify-center">
      <form className="w-[90%] flex flex-col gap-[2vw] bg-gray-200 p-[6vw]">
        <h2 className="text-[5vw] font-bold mb-[5vw]">Lieferadresse</h2>
        {adressInputs.map(({ label, inputId, type, placeholder, options }) => {
          return type === "select" ? (
            <div key={inputId} className="flex flex-col gap-[2vw]">
              <label htmlFor={inputId}>{label}</label>
              <select
                id={inputId}
                className="h-[12vw]"
                value={formValues[inputId]}
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
                value={formValues[inputId]}
                className="h-[12vw] p-[3vw]"
                placeholder={placeholder}
                onChange={handleChange}
              />
            </div>
          );
        })}
        {warning && (
          <p className="bg-red-200 text-[4vw] p-[2vw] text-center">{warning}</p>
        )}
        <button
          type="button"
          onClick={handleNext}
          className="h-input bg-black text-white">
          Weiter
        </button>
      </form>
    </section>
  );
};

export default Adress;
