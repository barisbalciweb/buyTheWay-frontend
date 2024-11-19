import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-full flex justify-center">
      <section className="w-[80%] flex flex-col items-center">
        <h1 className="w-[85%] text-[7vw] font-bold py-[4vw]">Anmeldung</h1>
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
            <p className="w-full text-end underline">Passwort vergessen</p>
          </div>
          <div className="flex flex-col">
            <button
              type="submit"
              className="bg-black text-white p-[4vw]"
              onClick={handleLogin}>
              anmelden
            </button>
            <p className="w-full text-center mt-[10vw]">Hast du kein Konto?</p>
            <button
              type="button"
              className="border-customBorder border-black p-[4vw]">
              <Link to={"/register"}>Registrieren</Link>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
