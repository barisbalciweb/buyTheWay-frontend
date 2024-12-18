import { useState } from "react";
// REDUX
import { useDispatch } from "react-redux";
import { setCheckoutActiveComponent } from "../../features/ui/uiSlice";
import { adressInputs } from "../../data/data";

const Adress = () => {
  const dispatch = useDispatch();

  // LOCAL STATES

  const [formValues, setFormValues] = useState({
    title: "",
    firstName: "",
    lastName: "",
    street: "",
    houseNumber: "",
    zip: "",
    city: "",
    country: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(id, value);

    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setCheckoutActiveComponent("payment"));
  };

  return (
    <section className="w-full flex justify-center">
      <form className="w-[90%] flex flex-col gap-[2vw] bg-gray-200 p-[6vw]">
        {adressInputs.map(
          ({ label, inputId, type, value, placeholder, setValue }) => {
            return type === "select" ? (
              <>
                <label htmlFor={inputId}>{label}</label>
                <select id={inputId} className="h-[12vw]"></select>
              </>
            ) : (
              <>
                <label htmlFor={inputId}>{label}</label>
                <input
                  id={inputId}
                  value={formValues[inputId]}
                  className="h-[12vw] p-[3vw]"
                  placeholder={placeholder}
                  onChange={handleChange}
                />
              </>
            );
          }
        )}
        <button onClick={handleSubmit} className="h-input bg-black text-white">
          Weiter
        </button>
      </form>
    </section>
  );
};

export default Adress;
