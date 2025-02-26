import { useSelector } from "react-redux";
import qr from "../assets/images/qr.png";
import OpenWindowButton from "./OpenWindowButton";

const Warning = () => {
  const { innerWidth } = useSelector((state) => state.ui);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center overflow-y-hidden fixed top-0 left-0 z-[5] bg-black">
      <div className="w-[80%] max-w-[750px] flex flex-col gap-[1.5em] text-white text-[3vw] md:text-2xl">
        <p>
          Welcome to <b>BuyTheWay!</b>
        </p>

        <p className="leading-normal">
          This application is optimized for <u>smartphones</u>. For the best
          experience, open the website in a smaller window by clicking the
          button, or scan the QR code to access it on your phone.
        </p>
        <OpenWindowButton />
        <div>
          <img
            src={qr}
            alt="QR code to open the app on your phone"
            className="w-[30%] max-w-40 mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Warning;
