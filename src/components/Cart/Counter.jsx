import React from "react";

const Counter = () => {
  return (
    <div className="grid grid-cols-3 border">
      <button className="flex justify-center items-center h-[8vw] bg-[#E2E2E2]">
        -
      </button>
      <p className="flex justify-center items-center h-[8vw]">1</p>
      <button className="flex justify-center items-center h-[8vw] bg-[#E2E2E2]">
        +
      </button>
    </div>
  );
};

export default Counter;
