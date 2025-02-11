import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { toggleFilter } from "../../features/ui/uiSlice";
import {
  clearFilters,
  fetchFilteredCount,
} from "../../features/filter/filterSlice";
import { addSelectedFilter } from "../../features/filter/filterSlice";
import { changeSorting } from "../../features/sort/sortSlice";
import PriceRangeSlider from "../PriceRangeSlider";
import { useNavigate } from "react-router-dom";

const Filter = () => {
  // LOCAL STATES
  const [selectedFilterCategory, setSelectedFilterCategory] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // GLOBAL STATES
  const selectedFilters = useSelector((state) => state.filter.selectedFilters);
  const sortBy = useSelector((state) => state.sort.sortBy);
  const { filterOptions } = useSelector((state) => state.filter);
  const filterOptionsStatus = useSelector(
    (state) => state.filter.statuses.filterOptions
  );
  const filteredCount = useSelector((state) => state.filter.filteredCount);
  const filteredCountStatus = useSelector(
    (state) => state.filter.statuses.filteredCount
  );
  const { priceRange } = useSelector((state) => state.filter);

  // CHECK COUNT OF SELECTED FILTERS ON EVERY CHANGE
  useEffect(() => {
    //* FIND A BETTER WAY TO DO THIS
    dispatch(fetchFilteredCount(selectedFilters));
  }, [selectedFilters]);

  const toggleAccordion = (filterCategory) => {
    setSelectedFilterCategory(
      selectedFilterCategory === filterCategory ? null : filterCategory
    );
  };
  // HANDLE ON CHANGE OF FILTER OPTIONS
  const handleFilterUpdate = (filterCategory, filterOption, inputType) => {
    if (filterCategory === "sort") {
      dispatch(changeSorting(filterOption));
    } else if (inputType === "range") {
      return;
    } else {
      dispatch(
        addSelectedFilter({
          filterCategory,
          filterOption,
          inputType,
        })
      );
    }
  };

  // HANDLE FILTER RESULTS
  const handleFilterResults = () => {
    dispatch(toggleFilter());
    // NAVIGATE TO STORE AND FETCH FROM THERE
    navigate("/store?filtering=true");
  };

  // CLEAR ALL FILTERS
  const handleClearFilters = () => {
    dispatch(clearFilters());
    setSelectedFilterCategory(null);
  };

  return (
    <section className="w-full h-full max-h-[100svh] overflow-y-auto flex flex-col gap-[5vw] bg-white fixed top-0 left-0 z-[2] p-[5vw]">
      {/* NAVIGATION */}
      <button
        className="flex items-center gap-[2vw] text-[5vw] mt-[20vw]"
        onClick={() => dispatch(toggleFilter())}>
        <FontAwesomeIcon
          icon={faCircleArrowLeft}
          className="font-bold text-customOrange pb-[0.5vw]"
        />
        <p>Filter</p>
      </button>

      {/* FILTER OPTIONS */}
      <div className="flex flex-col">
        {filterOptionsStatus === "succeeded"
          ? filterOptions.map(
              ({ filterCategory, filterOptions, inputType }) => (
                // FILTER CATEGORY AS ACCORDION HEADER
                <div
                  key={filterCategory}
                  className="flex flex-col items-center border-b-customBorder border-black">
                  <button
                    type="button"
                    className={`w-full h-[15vw] flex flex-col py-[4vw]`}
                    onClick={() => toggleAccordion(filterCategory)}>
                    <div className="w-full flex justify-between">
                      <p
                        className={`${
                          selectedFilterCategory === filterCategory &&
                          "text-customOrange font-bold"
                        }`}>
                        {filterCategory === "sort"
                          ? "Sortierung"
                          : filterCategory === "price"
                          ? "Preis"
                          : filterCategory === "discount"
                          ? "Reduziert"
                          : filterCategory === "category"
                          ? "Kategorie"
                          : filterCategory === "color"
                          ? "Farbe"
                          : filterCategory === "size"
                          ? "Größe"
                          : filterCategory === "brand"
                          ? "Marke"
                          : filterCategory === "targetGroup"
                          ? "Zielgruppe"
                          : ""}
                      </p>
                      <FontAwesomeIcon
                        icon={
                          selectedFilterCategory === filterCategory
                            ? faAngleUp
                            : faAngleDown
                        }
                      />
                    </div>

                    {/* SELECTED FILTERS PREVIEW */}
                    {inputType === "checkbox" ? (
                      <div className="flex">
                        {selectedFilters[filterCategory]?.map(
                          (filterOption, index) => (
                            <p
                              key={`${filterCategory}-${filterOption}`}
                              className="text-[3vw] text-blue-700 font-bold">
                              {filterOption}
                              {index ===
                              selectedFilters[filterCategory].length - 1
                                ? ""
                                : ",\u00A0"}
                            </p>
                          )
                        )}
                      </div>
                    ) : inputType === "range" ? (
                      <p className="text-[3vw] text-blue-700 font-bold">
                        {priceRange[0]}-{priceRange[1]}
                      </p>
                    ) : (
                      <p className="text-[3vw] text-blue-700 font-bold">
                        {filterCategory === "sort"
                          ? sortBy
                          : selectedFilters[filterCategory]}
                      </p>
                    )}
                  </button>

                  {/* FILTER OPTIONS AS ACCORDION CONTENT */}
                  {selectedFilterCategory === filterCategory && (
                    <div
                      className={`w-full max-h-[60vw] flex flex-col mb-[5vw] overflow-y-auto`}>
                      <ul>
                        {inputType === "range" ? (
                          <PriceRangeSlider />
                        ) : (
                          filterOptions.map((filterOption) => (
                            <li key={filterOption}>
                              <label className="flex items-center gap-2 p-[2vw]">
                                <input
                                  type={inputType}
                                  name={filterCategory}
                                  checked={
                                    filterCategory === "sort"
                                      ? sortBy === filterOption
                                      : inputType === "checkbox"
                                      ? selectedFilters[
                                          filterCategory
                                        ]?.includes(filterOption) || false
                                      : selectedFilters[filterCategory] ===
                                          filterOption || false
                                  }
                                  onChange={() =>
                                    handleFilterUpdate(
                                      filterCategory,
                                      filterOption,
                                      inputType
                                    )
                                  }
                                  className="text-customOrange"
                                />
                                <span>{filterOption}</span>
                              </label>
                            </li>
                          ))
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              )
            )
          : "Loading..."}
      </div>

      <button
        onClick={handleFilterResults}
        className="w-full h-button mt-4 bg-black text-white p-[4vw] text-button disabled:bg-slate-500">
        ERGEBNISSE ANZEIGEN{" "}
        {`(${filterOptionsStatus === "succeeded" && filteredCount})`}
      </button>

      <button className="text-bold text-button" onClick={handleClearFilters}>
        alle Filter löschen
      </button>
    </section>
  );
};

export default Filter;
