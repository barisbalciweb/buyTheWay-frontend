import React from "react";
import LoginForm from "../components/Login/LoginForm";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// REDUX
import { useDispatch } from "react-redux";
import { toggleLoginModal } from "../features/ui/uiSlice";

const LoginModal = () => {
  const dispatch = useDispatch();
  return (
    <>
      {/* BACKGROUND OVERLAY */}
      <div
        className="w-screen h-screen bg-[rgba(0,0,0,0.6)] fixed top-0 left-0 z-30"
        onClick={() => dispatch(toggleLoginModal())}
      />

      {/* LOGIN DIV */}
      <div className="w-full fixed top-1/2 left-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 z-30 px-[5vw]">
        {/* CLOSE BUTTON */}
        <FontAwesomeIcon
          icon={faX}
          className="text-[8vw] text-white fixed top-[-10vw] right-[5vw] z-30"
          onClick={() => dispatch(toggleLoginModal())}
        />
        <div className="bg-white py-[8vw]">
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default LoginModal;
