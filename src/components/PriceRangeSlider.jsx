import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addSelectedFilter } from "../features/filter/filterSlice";

const PriceRangeSlider = ({ priceRange, setPriceRange }) => {
  const dispatch = useDispatch();

  const handleRangeChange = (values) => {
    setPriceRange(values);
  };

  useEffect(() => {
    dispatch(
      addSelectedFilter({
        filterCategory: "price",
        filterOption: priceRange,
        inputType: "range",
      })
    );
  }, [priceRange]);

  return (
    <div className="flex flex-col gap-[4vw] p-[5vw]">
      <p className="w-full text-center">{`${priceRange[0]} - ${priceRange[1]}€`}</p>
      <Slider
        range
        min={0}
        max={1000}
        defaultValue={priceRange}
        allowCross={false}
        marks={{ 0: "0€", 1000: "1000€" }}
        onChangeComplete={handleRangeChange}
      />
    </div>
  );
};

export default PriceRangeSlider;
