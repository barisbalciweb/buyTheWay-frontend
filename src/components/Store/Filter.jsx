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

const Filter = () => {
  const [selectedFilterCategory, setSelectedFilterCategory] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  // GLOBAL STATES
  const selectedFilters = useSelector((state) => state.filter.selectedFilters);
  const sortBy = useSelector((state) => state.sort.sortBy);
  const filters = useSelector((state) => state.filter.filterOptions);
  const filterStatus = useSelector(
    (state) => state.filter.statuses.filterOptions
  );
  const filteredCount = useSelector((state) => state.filter.filteredCount);
  const filteredCountStatus = useSelector(
    (state) => state.filter.statuses.filteredCount
  );

  const dispatch = useDispatch();

  // CHECK COUNT OF SELECTED FILTERS ON EVERY CHANGE
  useEffect(() => {
    const filtersInArray = Object.values(selectedFilters).flatMap((value) =>
      typeof value === "string" && value !== ""
        ? [value]
        : Array.isArray(value)
        ? value
        : []
    );
    if (filtersInArray.length > 0) {
      //* FIND A BETTER WAY TO DO THIS
      dispatch(fetchFilteredCount(selectedFilters));
    }
  }, [selectedFilters]);

  const toggleAccordion = (filterCategory) => {
    setSelectedFilterCategory(
      selectedFilterCategory === filterCategory ? null : filterCategory
    );
  };

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

  const handleFilterResults = () => {
    dispatch(toggleFilter());
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    setSelectedFilterCategory(null);
  };

  return (
    <section className="w-full h-full max-h-[100svh] overflow-y-auto flex flex-col gap-[5vw] bg-white fixed top-0 left-0 z-20 p-[5vw]">
      {/* NAVIGATION */}
      <button
        className="flex items-center gap-[2vw] text-[5vw]"
        onClick={() => dispatch(toggleFilter())}>
        <FontAwesomeIcon
          icon={faCircleArrowLeft}
          className="font-bold text-customOrange pb-[0.5vw]"
        />
        <p>Filter</p>
      </button>

      {/* FILTER OPTIONS */}
      <div className="flex flex-col">
        {filterStatus === "succeeded"
          ? filters.map(({ filterCategory, filterOptions, inputType }) => (
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
                        : filterCategory === "discounted"
                        ? "Reduziert"
                        : filterCategory === "category"
                        ? "Kategorie"
                        : filterCategory === "color"
                        ? "Farbe"
                        : filterCategory === "size"
                        ? "Größe"
                        : filterCategory === "brand"
                        ? "Marke"
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
                    className={`accordion-content w-full flex flex-col mb-[5vw] ${
                      selectedFilterCategory === filterCategory
                        ? "accordion-content-open"
                        : ""
                    }`}>
                    <ul>
                      {inputType === "range" ? (
                        <PriceRangeSlider
                          priceRange={priceRange}
                          setPriceRange={setPriceRange}
                        />
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
                                    ? selectedFilters[filterCategory]?.includes(
                                        filterOption
                                      ) || false
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
            ))
          : "Loading..."}
      </div>

      <button
        disabled={filteredCountStatus !== "succeeded"}
        onClick={handleFilterResults}
        className="mt-4 bg-blue-500 text-white p-2 rounded disabled:bg-slate-500">
        auswählen {`(${filteredCount})`}
      </button>

      <button onClick={handleClearFilters}>alle Filter löschen</button>
    </section>
  );
};

export default Filter;
