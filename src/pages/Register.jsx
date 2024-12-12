import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/auth/authSlice";
import { BeatLoader } from "react-spinners";

const Register = () => {
  const dispatch = useDispatch();

  // LOCAL STATES
  const [firstnameValue, setFirstnameValue] = useState("");
  const [lastnameValue, setLastnameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordRepeatValue, setPasswordRepeatValue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [warning, setWarning] = useState(false);
  const [registerMessage, setRegisterMessage] = useState(null);
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [waiting, isWaiting] = useState(false);

  // GLOBAL STATES
  const { registration } = useSelector((state) => state.auth);

  // SANITIZE INPUTS
  const firstname = firstnameValue.trim().toUpperCase();
  const lastname = lastnameValue.trim().toUpperCase();
  const email = emailValue.trim().toLowerCase();
  const password = passwordValue.trim();

  const labelStyle = "flex flex-col";
  const inputStyle = "h-input bg-[#F4F4F4] p-[4vw] outline-none";
  const inputs = [
    {
      labelText: "Vorname",
      value: firstnameValue,
      id: "register-name",
      type: "text",
      setter: setFirstnameValue,
    },
    {
      labelText: "Nachname",
      value: lastnameValue,
      id: "register-lastname",
      type: "text",
      setter: setLastnameValue,
    },
    {
      labelText: "E-Mail",
      value: emailValue,
      id: "register-e-mail",
      type: "email",
      placeholder: "E-Mail-Adresse",
      setter: setEmailValue,
    },
    {
      labelText: "Passwort",
      value: passwordValue,
      id: "register-password",
      type: "password",
      setter: setPasswordValue,
    },
    {
      labelText: "Passwort (Wiederholung)",
      value: passwordRepeatValue,
      id: "register-password-repeat",
      type: "password",
      placeholder: "Passwort",
      setter: setPasswordRepeatValue,
    },
  ];

  useEffect(() => {
    if (isSubmitted) {
      dispatch(
        register({
          firstname: firstnameValue,
          lastname: lastnameValue,
          email: emailValue,
          password: passwordValue,
        })
      );
    }
  }, [isSubmitted]);

  useEffect(() => {
    if (registration.status === "loading") {
      isWaiting(true);
    } else {
      isWaiting(false);
    }
  }, [registration]);

  const handleRegister = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="w-full flex justify-center">
      <section className="w-[80%] flex flex-col items-center">
        <h1 className="w-[85%] text-[7vw] font-bold py-[4vw]">Registrierung</h1>
        <form className="w-[85%] flex flex-col gap-[5vw]">
          <div className="flex flex-col gap-[2vw]">
            {inputs.map(
              ({ labelText, value, id, type, setter, placeholder }) => (
                <label key={id} className={labelStyle}>
                  {labelText}
                  <input
                    value={value}
                    id={id}
                    type={type}
                    className={inputStyle}
                    placeholder={placeholder || labelText}
                    onChange={(e) => setter(e.target.value)}
                  />
                </label>
              )
            )}
          </div>
          <div className="flex flex-col">
            <button
              type="submit"
              className="h-input flex justify-center items-center bg-black text-white"
              onClick={handleRegister}
              disabled={waiting}>
              {waiting ? (
                <BeatLoader size={"2vw"} color="white" />
              ) : (
                "REGISTRIEREN"
              )}
            </button>

            {/* SHOW REGISTER FEEDBACK */}
            {registerMessage && <p>{registerMessage}</p>}

            <p className="w-full text-center mt-[10vw]">
              Hast du schon ein Konto?
            </p>
            <button
              type="button"
              className="h-input border-customBorder border-black p-[4vw]">
              <Link to={"/login"}>LOGIN</Link>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Register;
