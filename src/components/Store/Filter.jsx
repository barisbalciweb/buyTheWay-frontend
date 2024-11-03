import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { filters } from "../../data/data";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { toggleFilter } from "../../features/ui/uiSlice";
import { clearFilters } from "../../features/filter/filterSlice";
import { addSelectedFilter } from "../../features/filter/filterSlice";

const Filter = () => {
  const [selectedFilterCategory, setSelectedFilterCategory] = useState(null);

  const selectedFilters = useSelector((state) => state.filter.selectedFilters);
  const dispatch = useDispatch();

  const toggleAccordion = (filterCategory) => {
    setSelectedFilterCategory(
      selectedFilterCategory === filterCategory ? null : filterCategory
    );
  };

  const handleFiltering = () => {
    dispatch(toggleFilter());
    console.log("Filtering with:", selectedFilters);
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
        {filters.map(({ filterCategory, filterOptions, inputType }) => (
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
                  {filterCategory}
                </p>
                <FontAwesomeIcon
                  icon={
                    selectedFilterCategory === filterCategory
                      ? faAngleUp
                      : faAngleDown
                  }
                />
              </div>

              {/* //! DEBUGGING, STEP 2: SHOW THE SELECTED FILTER IN FILTER PAGE */}
              {/* SELECTED FILTERS PREVIEW */}
              {inputType === "checkbox" ? (
                <div className="flex">
                  {selectedFilters[filterCategory]?.map(
                    (filterOption, index) => (
                      <p
                        key={`${filterCategory}-${filterOption}`}
                        className="text-[3vw] text-blue-700 font-bold">
                        {filterOption}
                        {index === selectedFilters[filterCategory].length - 1
                          ? ""
                          : ",\u00A0"}
                      </p>
                    )
                  )}
                </div>
              ) : (
                <p className="text-[3vw] text-blue-700 font-bold">
                  {selectedFilters[filterCategory]}
                </p>
              )}
            </button>

            {/* //! DEBUGGING, STEP 1: ADD FILTER INTO STATE */}
            {/* SELECT FILTER */}
            {selectedFilterCategory === filterCategory && (
              // FILTER OPTIONS AS ACCORDION CONTENT
              <div
                className={`accordion-content w-full flex flex-col mb-[5vw] ${
                  selectedFilterCategory === filterCategory
                    ? "accordion-content-open"
                    : ""
                }`}>
                <ul>
                  {filterOptions.map((filterOption) => (
                    <li key={filterOption}>
                      <label className="flex items-center gap-2 p-[2vw]">
                        <input
                          type={inputType}
                          name={filterCategory}
                          checked={
                            inputType === "checkbox"
                              ? selectedFilters[filterCategory]?.includes(
                                  filterOption
                                )
                              : selectedFilters[filterCategory] === filterOption
                          }
                          onChange={() =>
                            dispatch(
                              addSelectedFilter({
                                filterCategory,
                                filterOption,
                                inputType,
                              })
                            )
                          }
                          className="text-customOrange"
                        />
                        <span>{filterOption}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleFiltering}
        className="mt-4 bg-blue-500 text-white p-2 rounded">
        auswählen
      </button>

      <button onClick={handleClearFilters}>alle Filter löschen</button>
    </section>
  );
};

export default Filter;
