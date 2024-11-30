import { useSelector } from "react-redux";
import qr from "../assets/images/qr.png";

const Warning = () => {
  const { innerWidth } = useSelector((state) => state.ui);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center overflow-y-hidden fixed top-0 left-0 z-50 bg-black">
      <div className="w-[80%] max-w-[750px] flex flex-col gap-[1.5em] text-white text-[3vw] md:text-2xl">
        <p>
          Welcome to <b>BuyTheWay!</b>
        </p>

        <p>
          This application is specifically optimized for smartphones. For the
          best experience, please visit the website on your phone:
        </p>

        <div>
          <img
            src={qr}
            alt="QR code to open the app on your phone"
            className="w-[30%] max-w-40 mx-auto"
          />
          <p className="text-center mt-2 text-blue-400">btw.barisbalci.de</p>
        </div>

        <p>
          or resize your browser window by dragging it smaller from the sides.
        </p>

        <div className="flex flex-col">
          <p>
            Current width: <span className="text-red-400">{innerWidth}px</span>
          </p>

          <p>
            Target width: <span className="text-green-600">520px</span>
          </p>
        </div>

        <div>
          <p>Thank you!</p>
          <p>Baris Balci</p>
        </div>
      </div>
    </div>
  );
};

export default Warning;
