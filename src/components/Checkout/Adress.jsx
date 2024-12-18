import { useState } from "react";
// REDUX
import { useDispatch } from "react-redux";
import { setCheckoutActiveComponent } from "../../features/ui/uiSlice";

const Adress = () => {
  const dispatch = useDispatch();

  // LOCAL STATES
  const [titleValue, setTitleValue] = useState("");
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [streetValue, setStreetValue] = useState("");
  const [houseNumberValue, setHouseNumberValue] = useState("");
  const [zipValue, setZipValue] = useState("");
  const [cityValue, setCityValue] = useState("");
  const [countryValue, setCountryValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setCheckoutActiveComponent("payment"));
  };

  const adressInputs = [
    {
      label: "Anrede",
      inputId: "adress-title",
      type: "select",
      value: titleValue,
      setValue: setTitleValue,
    },
    {
      label: "Vorname",
      inputId: "adress-firstname",
      type: "text",
      value: firstNameValue,
      placeholder: "Vorname",
      setValue: setFirstNameValue,
    },
    {
      label: "Nachname",
      inputId: "adress-lastname",
      type: "text",
      value: lastNameValue,
      placeholder: "Nachname",
      setValue: setLastNameValue,
    },
    {
      label: "Straße",
      inputId: "adress-street",
      type: "text",
      value: streetValue,
      placeholder: "Straße",
      setValue: setStreetValue,
    },
    {
      label: "Hausnummer",
      inputId: "adress-house-number",
      type: "number",
      value: houseNumberValue,
      placeholder: "Hausnummer",
      setValue: setHouseNumberValue,
    },
    {
      label: "PLZ",
      inputId: "adress-zip-code",
      type: "text",
      value: zipValue,
      placeholder: "PLZ",
      setValue: setZipValue,
    },
    {
      label: "Stadt",
      inputId: "adress-city",
      type: "text",
      value: cityValue,
      placeholder: "Stadt",
      setValue: setCityValue,
    },
    {
      label: "Land",
      inputId: "adress-country",
      type: "select",
      value: countryValue,
      setValue: setCountryValue,
    },
  ];

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
                  value={value}
                  className="h-[12vw] p-[3vw]"
                  placeholder={placeholder}
                  onChange={(e) => setValue(e.target.value)}
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
