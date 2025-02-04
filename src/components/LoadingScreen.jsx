import { ClipLoader } from "react-spinners";

const LoadingScreen = () => {
  return (
    <div>
      <div className="w-full h-screen flex items-center justify-center absolute top-0 left-0 bg-[rgba(255,255,255,0.8)] z-50">
        <ClipLoader size={"20vw"} color="#EA580C" />
      </div>
    </div>
  );
};

export default LoadingScreen;
