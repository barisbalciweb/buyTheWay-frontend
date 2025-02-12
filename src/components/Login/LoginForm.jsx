import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import {
  missingInputMsg,
  serverErrorMsg,
  userNotFoundMsg,
  userNotVerifiedMsg,
} from "../../utils/feedbacks";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetLogin } from "../../features/auth/authSlice";
import { toggleLoginModal } from "../../features/ui/uiSlice";

const LoginForm = ({ renderedFromLoginModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();

  // LOCAL STATES
  const [emailValue, setEmailValue] = useState("test@user.com");
  const [passwordValue, setPasswordValue] = useState("testUSER123");
  const [waiting, isWaiting] = useState(false);
  const [warning, setWarning] = useState(null);
  const [passwordHidden, setPasswordHidden] = useState(true);

  // GLOBAL STATES
  const { login } = useSelector((state) => state.auth);
  const { loginModal } = useSelector((state) => state.ui);

  useEffect(() => {
    // FOCUS INPUT ON LOAD
    inputRef.current.focus();
    // RESET FEEDBACKS
    return () => {
      setWarning(null);
      dispatch(resetLogin());
    };
  }, []);

  // SHOW FEEDBACK
  useEffect(() => {
    if (login.status === "loading") {
      isWaiting(true);
    }
    if (login.status === "succeeded") {
      isWaiting(false);
      // REDIRECT TO LAST LOCATION OR TOGGLE AFTER LOGIN
      const lastLocation = localStorage.getItem("lastLocation");
      if (lastLocation === "/cart") {
        navigate("/checkout");
        localStorage.removeItem("lastLocation");
      } else if (renderedFromLoginModal) {
        dispatch(toggleLoginModal());
      } else {
        navigate(-1);
      }
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
        case "userNotVerified":
          setWarning(userNotVerifiedMsg);
          break;
        default:
          setWarning(serverErrorMsg);
          break;
      }
    }
  }, [login]);

  const handleLogin = (e) => {
    e.preventDefault();
    setWarning(null);
    // FETCH LOGIN DATA
    dispatch(loginUser({ email: emailValue, password: passwordValue }));
  };

  const handleRegisterClick = () => {
    // CLOSE LOGIN MODAL IF OPEN
    if (loginModal) {
      dispatch(toggleLoginModal());
    }
    navigate("/register");
  };

  const disableSubmit = waiting || emailValue === "" || passwordValue === "";

  return (
    <main className="w-full flex flex-grow justify-center">
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
              <div className="w-full h-full relative">
                <div
                  className="w-[8vw] h-input flex justify-center items-center bg-gray-300 absolute right-0"
                  onClick={() => setPasswordHidden(!passwordHidden)}>
                  <FontAwesomeIcon icon={passwordHidden ? faEyeSlash : faEye} />
                </div>
                <input
                  value={passwordValue}
                  type={passwordHidden ? "password" : "text"}
                  id="password"
                  className="w-full h-input bg-[#F4F4F4] p-[4vw] outline-none"
                  placeholder="Passwort"
                  onChange={(e) => setPasswordValue(e.target.value)}
                />
              </div>
            </label>
            <p className="w-full text-end underline">Passwort vergessen</p>
          </div>

          <div className="w-full">
            <button
              type="submit"
              className="w-full h-button bg-black text-white text-button disabled:bg-slate-300"
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
            className="w-full h-button border-customBorder border-black"
            onClick={handleRegisterClick}>
            REGISTRIEREN
          </button>
        </div>
      </section>
    </main>
  );
};

export default LoginForm;
