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

  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(e.target);

    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setCheckoutActiveComponent("payment"));
    console.log(formValues);
  };

  return (
    <section className="w-full flex justify-center">
      <form className="w-[90%] flex flex-col gap-[2vw] bg-gray-200 p-[6vw]">
        {adressInputs.map(({ label, inputId, type, placeholder, options }) => {
          return type === "select" ? (
            <div key={inputId} className="flex flex-col gap-[2vw]">
              <label htmlFor={inputId}>{label}</label>
              <select
                id={inputId}
                className="h-[12vw]"
                value={formValues[inputId]}
                onChange={handleChange}>
                <option value="Bitte wählen" selected hidden>
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
        <button onClick={handleSubmit} className="h-input bg-black text-white">
          Weiter
        </button>
      </form>
    </section>
  );
};

export default Adress;
