import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import {
  missingInputMsg,
  serverErrorMsg,
  userNotFoundMsg,
} from "../utils/feedbacks";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetLogin } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();

  // LOCAL STATES
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [warning, setWarning] = useState(null);
  const [waiting, isWaiting] = useState(false);

  // GLOBAL STATES
  const { login } = useSelector((state) => state.auth);

  useEffect(() => {
    // FOCUS INPUT ON LOAD
    inputRef.current.focus();
    // RESET FEEDBACKS
    return () => {
      setWarning(null);
      dispatch(resetLogin());
    };
  }, []);

  // FETCH LOGIN DATA
  useEffect(() => {
    if (isSubmitted) {
      dispatch(loginUser({ email: emailValue, password: passwordValue }));
    }
  }, [isSubmitted]);

  // SHOW FEEDBACK
  useEffect(() => {
    if (login.status === "loading") {
      isWaiting(true);
    }
    if (login.status === "succeeded") {
      isWaiting(false);
      // REDIRECT TO HOME
      login.result?.message === "success" && navigate("/");
    }
    if (login.status === "failed") {
      isWaiting(false);
      switch (login.error) {
        case "missingInput":
          setWarning(missingInputMsg);
          break;
        case "userNotFound":
          setWarning(userNotFoundMsg);
          break;
        case "invalidCredentials":
          setWarning(userNotFoundMsg);
          break;
        default:
          setWarning(serverErrorMsg);
          break;
      }
    }
    setIsSubmitted(false);
  }, [login]);

  const handleLogin = (e) => {
    e.preventDefault();
    setWarning(null);
    setIsSubmitted(true);
  };

  const disableSubmit = waiting || emailValue === "" || passwordValue === "";

  return (
    <div className="w-full flex justify-center">
      <section className="w-[80%] flex flex-col items-center">
        <h1 className="w-[85%] text-[7vw] font-bold py-[4vw]">Anmeldung</h1>
        <form className="w-[85%] flex flex-col gap-[5vw]">
          <div className="flex flex-col gap-[2vw]">
            <label htmlFor="e-mail" className="flex flex-col">
              E-Mail
              <input
                ref={inputRef}
                value={emailValue}
                type="email"
                id="e-mail"
                className="h-input bg-[#F4F4F4] p-[4vw] outline-none"
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
                className="h-input bg-[#F4F4F4] p-[4vw] outline-none"
                placeholder="Passwort"
                onChange={(e) => setPasswordValue(e.target.value)}
              />
            </label>
            <p className="w-full text-end underline">Passwort vergessen</p>
          </div>

          <div className="w-full">
            <button
              type="submit"
              className="h-input w-full bg-black text-white disabled:bg-slate-300"
              onClick={handleLogin}
              disabled={disableSubmit}>
              {waiting ? <BeatLoader size={"2vw"} color="white" /> : "ANMELDEN"}
            </button>

            {/* SHOW LOGIN FEEDBACK */}
            {warning && (
              <div
                className={`w-full ${
                  warning && "bg-red-200"
                } p-[2vw] mt-[2vw]`}>
                <p className="text-[4vw]">{warning}</p>
              </div>
            )}
          </div>
        </form>

        <div className="w-[85%]">
          <p className="w-full text-center mt-[10vw]">Hast du kein Konto?</p>
          <button
            type="button"
            className="h-input w-full border-customBorder border-black"
            onClick={() => navigate("/register")}>
            REGISTRIEREN
          </button>
        </div>
      </section>
    </div>
  );
};

export default Login;
