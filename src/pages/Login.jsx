import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();

  // LOCAL STATES
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [warning, setWarning] = useState(null);
  const [waiting, isWaiting] = useState(false);

  // GLOBAL STATES

  const { login } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (isSubmitted) {
      dispatch(login({ email: emailValue, password: passwordValue }));
    }
  }, [isSubmitted]);

  return (
    <div className="w-full flex justify-center">
      <section className="w-[80%] flex flex-col items-center">
        <h1 className="w-[85%] text-[7vw] font-bold py-[4vw]">Anmeldung</h1>
        <form className="w-[85%] flex flex-col gap-[5vw]">
          <div className="flex flex-col gap-[2vw]">
            <label htmlFor="e-mail" className="flex flex-col">
              E-Mail
              <input
                value={emailValue}
                type="email"
                id="e-mail"
                className="bg-[#F4F4F4] p-[4vw] outline-none"
                placeholder="E-Mail-Adresse"
                onChange={(e) => setEmailValue(e.target.value)}
              />
            </label>

            <label htmlFor="password" className="flex flex-col">
              Passwort
              <input
                value={passwordValue}
                type="password"
                id="password"
                className="bg-[#F4F4F4] p-[4vw] outline-none"
                placeholder="Passwort"
                onChange={(e) => setPasswordValue(e.target.value)}
              />
            </label>
            <p className="w-full text-end underline">Passwort vergessen</p>
          </div>

          <div className="flex flex-col">
            <button
              type="submit"
              className="bg-black text-white p-[4vw]"
              onClick={handleLogin}
              disabled={waiting}>
              {waiting ? <BeatLoader size={"2vw"} color="white" /> : "ANMELDEN"}
            </button>
            <p className="w-full text-center mt-[10vw]">Hast du kein Konto?</p>
            <button
              type="button"
              className="border-customBorder border-black p-[4vw]">
              <Link to={"/register"}>REGISTRIEREN</Link>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
