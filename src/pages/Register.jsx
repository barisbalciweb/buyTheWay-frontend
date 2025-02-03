import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import {
  emailAlreadyExistsMsg,
  emailHintMsg,
  invalidEmailFormatMsg,
  invalidPasswordMsg,
  missingCaptchaMsg,
  missingInputMsg,
  passwordHintMsg,
  passwordMatchMsg,
  serverErrorMsg,
  successMsg,
  vorbiddenInputMsg,
} from "../utils/feedbacks";
import { BeatLoader } from "react-spinners";
import { validateEmail } from "../utils/validateEmail";
import { testPassword } from "../utils/testPassword";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetRegistration } from "../features/auth/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recaptchaRef = useRef();
  const inputRef = useRef();

  // LOCAL STATES
  const [firstnameValue, setFirstnameValue] = useState("");
  const [lastnameValue, setLastnameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordRepeatValue, setPasswordRepeatValue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [warning, setWarning] = useState(null);
  const [emailHint, setEmailHint] = useState("");
  const [passwordHint, setPasswordHint] = useState("");
  const [passwordMatchHint, setPasswordMatchHint] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [waiting, isWaiting] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  // GLOBAL STATES
  const { registration, isLoggedIn } = useSelector((state) => state.auth);

  const labelStyle = "flex flex-col";
  const inputStyle = "w-full h-input bg-[#F4F4F4] p-[4vw] outline-none";
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
      id: "register-email",
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
    // FOCUS INPUT ON LOAD
    inputRef.current.focus();
    // RESET FEEDBACKS
    return () => {
      setWarning(null);
      setSuccessMessage(null);
      dispatch(resetRegistration());
    };
  }, []);

  // SANITIZE INPUTS
  const firstname = firstnameValue.trim().toUpperCase();
  const lastname = lastnameValue.trim().toUpperCase();
  const email = emailValue.trim().toLowerCase();
  const password = passwordValue.trim();

  // CHECK EMAIL FORMAT AND GIVE FEEDBACK
  useEffect(() => {
    if (emailValue.length > 0) {
      const isEmailValid = validateEmail(emailValue);
      setEmailHint(isEmailValid ? null : emailHintMsg);
    } else {
      setEmailHint(null);
    }
  }, [emailValue]);

  // CHECK PASSWORD STRENGTH AND GIVE FEEDBACK
  useEffect(() => {
    if (passwordValue.length > 0) {
      const isPasswordValid = testPassword(passwordValue);
      setPasswordHint(isPasswordValid ? null : passwordHintMsg);
    } else {
      setPasswordHint(null);
    }
  }, [passwordValue]);

  // CHECK IF PASSWORDS MATCH AND GIVE FEEDBACK
  useEffect(() => {
    if (passwordRepeatValue.length > 0) {
      const passwordsMatch = passwordValue === passwordRepeatValue;
      setPasswordMatchHint(passwordsMatch ? null : passwordMatchMsg);
    } else {
      setPasswordMatchHint(null);
    }
  }, [passwordValue, passwordRepeatValue]);

  // UPDATE CAPTCHA VERIFICATION STATUS
  const handleCaptchaChange = () => {
    const recaptchaValue = recaptchaRef?.current?.getValue();
    setCaptchaVerified(!!recaptchaValue);
  };

  // FETCH REGISTER DATA
  useEffect(() => {
    const recaptchaValue = recaptchaRef.current.getValue();
    if (isSubmitted) {
      dispatch(
        registerUser({
          firstname,
          lastname,
          email,
          password,
          recaptchaValue,
        })
      );
    }
  }, [isSubmitted]);

  // SHOW FEEDBACK
  useEffect(() => {
    if (registration.status === "loading") {
      isWaiting(true);
    }
    if (registration.status === "succeeded") {
      isWaiting(false);
      setSuccessMessage(
        registration.result.message === "success" ? successMsg : null
      );
    }
    if (registration.status === "failed") {
      isWaiting(false);
      switch (registration.error) {
        case "missingInput":
          setWarning(missingInputMsg);
          break;
        case "vorbiddenInput":
          setWarning(vorbiddenInputMsg);
          break;
        case "emailAlreadyExists":
          setWarning(emailAlreadyExistsMsg);
          break;
        case "invalidEmailFormat":
          setWarning(invalidEmailFormatMsg);
          break;
        case "invalidPassword":
          setWarning(invalidPasswordMsg);
          break;
        case "missingCaptcha":
          setWarning(missingCaptchaMsg);
          break;
        default:
          setWarning(serverErrorMsg);
          break;
      }
    }
    setIsSubmitted(false);
  }, [registration]);

  const handleRegister = (e) => {
    setWarning(null);
    setSuccessMessage(null);
    // CHECK IF PASSWORDS MATCH
    if (passwordValue !== passwordRepeatValue) {
      setWarning(passwordMatchMsg);
      return;
    }
    setIsSubmitted(true);
  };

  // DISABLE BUTTON IF WAITING FOR RESPONSE OR INVALID INPUT
  const disableSubmit =
    waiting ||
    !captchaVerified ||
    emailHint?.length > 0 ||
    passwordHint?.length > 0 ||
    passwordMatchHint?.length > 0 ||
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !passwordRepeatValue;

  return (
    <main className="w-full flex flex-grow justify-center">
      <section className="w-[80%] flex flex-col items-center">
        <h1 className="w-[85%] text-[7vw] font-bold py-[4vw]">Registrierung</h1>
        <form className="w-[85%] flex flex-col gap-[5vw]">
          <div className="flex flex-col gap-[2vw]">
            {inputs.map(
              ({ labelText, value, id, type, setter, placeholder }, index) => (
                <label key={id} className={labelStyle}>
                  {labelText}
                  <div className="w-full h-full relative">
                    {(id === "register-password" ||
                      id === "register-password-repeat") && (
                      <div
                        className="w-[8vw] h-input flex justify-center items-center bg-gray-300 absolute right-0"
                        onClick={() => setPasswordHidden(!passwordHidden)}>
                        <FontAwesomeIcon
                          icon={passwordHidden ? faEyeSlash : faEye}
                        />
                      </div>
                    )}
                    <input
                      ref={index === 0 ? inputRef : null}
                      value={value}
                      id={id}
                      type={
                        id === "register-password" ||
                        id === "register-password-repeat"
                          ? passwordHidden
                            ? "password"
                            : "text"
                          : type
                      }
                      className={inputStyle}
                      placeholder={placeholder || labelText}
                      onChange={(e) => setter(e.target.value)}
                    />
                    {/* SHOW HINTS SELECTIVELY */}
                    {id === "register-email" ? (
                      <p className="w-full text-[3.5vw] text-red-500">
                        {emailHint}
                      </p>
                    ) : id === "register-password" ? (
                      <p className="w-full text-[3.5vw] text-red-500">
                        {passwordHint}
                      </p>
                    ) : id === "register-password-repeat" ? (
                      <p className="w-full text-[3.5vw] text-red-500">
                        {passwordMatchHint}
                      </p>
                    ) : null}
                  </div>
                </label>
              )
            )}
          </div>
          <div className="w-full">
            <button
              type="button"
              className="w-full h-button flex justify-center disabled:bg-slate-300 items-center bg-black text-white text-button"
              onClick={handleRegister}
              disabled={disableSubmit}>
              {waiting ? (
                <BeatLoader size={"2vw"} color="white" />
              ) : (
                "REGISTRIEREN"
              )}
            </button>

            {/* SHOW REGISTER FEEDBACK */}
            {(successMessage || warning) && (
              <div
                className={`w-full ${
                  (successMessage && "bg-green-200") ||
                  (warning && "bg-red-200")
                } p-[2vw] mt-[2vw]`}>
                <p className="text-[4vw]">{successMessage || warning}</p>
              </div>
            )}
          </div>
        </form>

        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
          size="compact"
          className="mt-[5vw]"
          onChange={handleCaptchaChange}
        />

        <div className="w-[85%] mt-[5vw]">
          <p className="w-full text-center">Hast du schon ein Konto?</p>
          <button
            type="button"
            className="w-full h-button border-customBorder border-black"
            onClick={() => navigate("/login")}>
            ANMELDEN
          </button>
        </div>
      </section>
    </main>
  );
};

export default Register;
