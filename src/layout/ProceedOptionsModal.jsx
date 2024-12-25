import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
// REDUX
import { useDispatch } from "react-redux";
import { toggleProceedOptionsModal } from "../features/ui/uiSlice";
import { useLocation, useNavigate } from "react-router-dom";

const ProceedOptionsModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginButton = () => {
    localStorage.setItem("lastLocation", location.pathname);
    dispatch(toggleProceedOptionsModal());
    navigate("/login");
  };

  return (
    <>
      {/* BACKGROUND OVERLAY */}
      <div
        className="w-screen h-screen bg-[rgba(0,0,0,0.6)] fixed top-0 left-0 z-30"
        onClick={() => dispatch(toggleProceedOptionsModal())}
      />

      {/* OPTIONS DIV */}
      <div className="w-[90%] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 bg-white py-[10vw] px-[10vw] rounded-md">
        <p className="text-[4vw]">
          Sie sind nicht angemeldet. Bitte wählen Sie, wie Sie fortfahren
          möchten:
        </p>
        {/* CLOSE BUTTON */}
        <FontAwesomeIcon
          icon={faXmark}
          className="text-[8vw] text-black absolute top-[3vw] right-[3vw]"
          onClick={() => dispatch(toggleProceedOptionsModal())}
        />
        {/* BUTTONS */}
        <div className="flex flex-col justify-center items-center gap-4 mt-[5vw]">
          <button
            className="w-full h-input bg-black text-white px-4 py-2"
            onClick={handleLoginButton}>
            ANMELDEN
          </button>
          <button
            className="w-full h-input bg-white text-black font-bold px-4 py-2 border-customBorder border-black"
            onClick={() => navigate("/checkout")}>
            WEITER ALS GAST
          </button>
        </div>
      </div>
    </>
  );
};

export default ProceedOptionsModal;
