import React from "react";
import LoginForm from "../components/Login/LoginForm";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
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
      <div className="w-[90%] fixed top-1/2 left-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 z-30">
        {/* CLOSE BUTTON */}
        <FontAwesomeIcon
          icon={faXmark}
          className="text-[8vw] text-black absolute top-[3vw] right-[3vw]"
          onClick={() => dispatch(toggleLoginModal())}
        />
        <div className="bg-white py-[8vw] rounded-md">
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default LoginModal;
