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
  const [selectedFilterGroup, setSelectedFilterGroup] = useState(null);
  const selectedFilters = useSelector((state) => state.filter.selectedFilters);

  const dispatch = useDispatch();

  const toggleAccordion = (filterGroup) => {
    setSelectedFilterGroup(
      selectedFilterGroup === filterGroup ? null : filterGroup
    );
  };

  const handleFiltering = () => {
    dispatch(toggleFilter());
    console.log("Filtering with:", selectedFilters);
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

      {/* FILTERS */}
      <div className="flex flex-col">
        {filters.map(({ filterGroup, options, inputType }) => (
          <div
            key={filterGroup}
            className="flex flex-col items-center border-b-customBorder border-black">
            <button
              type="button"
              className={`w-full h-[15vw] flex flex-col py-[4vw]`}
              onClick={() => toggleAccordion(filterGroup)}>
              <div className="w-full flex justify-between">
                <p
                  className={`${
                    selectedFilterGroup === filterGroup &&
                    "text-customOrange font-bold"
                  }`}>
                  {filterGroup}
                </p>
                <FontAwesomeIcon
                  icon={
                    selectedFilterGroup === filterGroup
                      ? faAngleUp
                      : faAngleDown
                  }
                />
              </div>

              {/* SELECTED FILTERS PREVIEW */}
              {inputType === "checkbox" ? (
                <div className="flex">
                  {selectedFilters[filterGroup].map((option, index) => (
                    <span
                      key={`${filterGroup}-${option}`}
                      className="text-[3vw] text-blue-700 font-bold">
                      {option}
                      {index === selectedFilters[filterGroup].length - 1
                        ? ""
                        : ",\u00A0"}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-[3vw] text-blue-700 font-bold">
                  {selectedFilters[filterGroup]}
                </p>
              )}
            </button>

            {/* FILTER OPTIONS */}
            {selectedFilterGroup === filterGroup && (
              <div
                className={`accordion-content w-full flex flex-col mb-[5vw] ${
                  selectedFilterGroup === filterGroup
                    ? "accordion-content-open"
                    : ""
                }`}>
                <ul>
                  {options.map((option) => (
                    <li key={option}>
                      <label className="flex items-center gap-2 p-[2vw]">
                        <input
                          type={inputType === "checkbox" ? "checkbox" : "radio"}
                          name={filterGroup}
                          checked={
                            inputType === "checkbox"
                              ? selectedFilters[filterGroup]?.includes(option)
                              : selectedFilters[filterGroup] === option
                          }
                          onChange={() =>
                            dispatch(
                              addSelectedFilter({
                                filterGroup,
                                option,
                                inputType,
                              })
                            )
                          }
                          className="text-customOrange"
                        />
                        <span>{option}</span>
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

      <button
        onClick={() => {
          dispatch(clearFilters());
          setSelectedFilterGroup(null);
        }}>
        alle Filter löschen
      </button>
    </section>
  );
};

export default Filter;
