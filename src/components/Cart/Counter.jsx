import React from "react";

const Counter = () => {
  return (
    <div className="w-[25vw] grid grid-cols-3 border">
      <button className="h-[8vw] flex justify-center items-center text-[6vw] bg-[#E2E2E2]">
        -
      </button>
      <p className=" h-[8vw] flex justify-center items-center text-[5vw]">1</p>
      <button className="h-[8vw] flex justify-center items-center text-[6vw] bg-[#E2E2E2]">
        +
      </button>
    </div>
  );
};

export default Counter;
