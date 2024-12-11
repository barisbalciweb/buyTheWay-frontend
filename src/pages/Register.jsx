import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();

  // LOCAL STATES
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [warning, setWarning] = useState(false);
  const [registerMessage, setRegisterMessage] = useState(null);
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [waiting, isWaiting] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    isWaiting(true);
  };

  useEffect(() => {
    if (isSubmitted) {
      dispatch();
    }
  }, [isSubmitted]);

  // TRIM & LOWERCASE EMAIL
  const email = emailValue.trim().toLowerCase();
  // TRIM PASSWORD
  const password = passwordValue.trim();

  return (
    <div className="w-full flex justify-center">
      <section className="w-[80%] flex flex-col items-center">
        <h1 className="w-[85%] text-[7vw] font-bold py-[4vw]">Registrierung</h1>
        <form className="w-[85%] flex flex-col gap-[5vw]">
          <div className="flex flex-col gap-[2vw]">
            <label htmlFor="e-mail" className="flex flex-col">
              E-Mail
              <input
                type="email"
                id="e-mail"
                className="bg-[#F4F4F4] p-[4vw] outline-none"
                placeholder="E-Mail-Adresse"
              />
            </label>

            <label htmlFor="password" className="flex flex-col">
              Passwort
              <input
                type="password"
                id="password"
                className="bg-[#F4F4F4] p-[4vw] outline-none"
                placeholder="Passwort"
              />
            </label>

            <label htmlFor="password" className="flex flex-col">
              Passwort (Wiederholung)
              <input
                type="password"
                id="password"
                className="bg-[#F4F4F4] p-[4vw] outline-none"
                placeholder="Passwort"
              />
            </label>
          </div>
          <div className="flex flex-col">
            <button
              type="submit"
              className="bg-black text-white p-[4vw]"
              onClick={handleRegister}>
              REGISTRIEREN
            </button>
            <p className="w-full text-center mt-[10vw]">
              Hast du schon ein Konto?
            </p>
            <button
              type="button"
              className="border-customBorder border-black p-[4vw]">
              <Link to={"/login"}>LOGIN</Link>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Register;
