import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ScrollTopButton = ({ handleScrollToTop }) => {
  return (
    <div className="w-full flex justify-center items-center fixed z-40 bottom-0 text-[6vw]">
      <button
        className="w-[12vw] h-[12vw] flex justify-center items-center bg-[rgba(0,0,0,0.7)] m-[3vw] text-white rounded-full"
        onClick={handleScrollToTop}>
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  );
};

export default ScrollTopButton;
