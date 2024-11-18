import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedFilter,
  setPriceRange,
} from "../features/filter/filterSlice";

const PriceRangeSlider = () => {
  const dispatch = useDispatch();
  const { priceRange } = useSelector((state) => state.filter);

  const handleRangeChange = (values) => {
    dispatch(setPriceRange(values));
  };

  useEffect(() => {
    // ADD PRICE RANGE TO SELECTED FILTERS IF NOT DEFAULT
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
