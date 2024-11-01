import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { filters } from "../../data/data";
//REDUX
import { toggleFilter } from "../../features/ui/uiSlice";
import { useDispatch } from "react-redux";

const Filter = () => {
  const [selectedFilterGroup, setSelectedFilterGroup] = useState(null);
  const [selectedFilterOptions, setSelectedFilterOptions] = useState({
    Sortierung: "",
    Kategorie: [],
    Preis: [],
    Farbe: [],
    Größe: [],
    Marke: [],
    Sale: "",
  });

  const dispatch = useDispatch();

  const toggleAccordion = (filterGroup) => {
    setSelectedFilterGroup(
      selectedFilterGroup === filterGroup ? null : filterGroup
    );
  };

  const handleFilterChange = (filterGroup, option, inputType) => {
    setSelectedFilterOptions((prevFilters) => {
      if (inputType === "radio") {
        return {
          ...prevFilters,
          [filterGroup]: option,
        };
      } else if (inputType === "checkbox") {
        const currentSelections = prevFilters[filterGroup] || [];
        const isOptionSelected = currentSelections.includes(option);

        return {
          ...prevFilters,
          [filterGroup]: isOptionSelected
            ? currentSelections.filter((item) => item !== option)
            : [...currentSelections, option],
        };
      }
    });
  };

  const clearFilters = () => {
    setSelectedFilterOptions({
      Sortierung: "",
      Kategorie: [],
      Preis: [],
      Farbe: [],
      Größe: [],
      Marke: [],
      Sale: "",
    });
    setSelectedFilterGroup(null);
  };

  console.log(selectedFilterOptions);

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
                  {selectedFilterOptions[filterGroup].map((option, index) => (
                    <span
                      key={`${filterGroup}-${option}`}
                      className="text-[3vw] text-blue-700 font-bold">
                      {option}
                      {index === selectedFilterOptions[filterGroup].length - 1
                        ? ""
                        : ",\u00A0"}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-[3vw] text-blue-700 font-bold">
                  {selectedFilterOptions[filterGroup]}
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
                              ? selectedFilterOptions[filterGroup]?.includes(
                                  option
                                )
                              : selectedFilterOptions[filterGroup] === option
                          }
                          onChange={() =>
                            handleFilterChange(filterGroup, option, inputType)
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
        onClick={() =>
          console.log("Final filtreler gönderiliyor:", selectedFilterOptions)
        }
        className="mt-4 bg-blue-500 text-white p-2 rounded">
        auswählen
      </button>

      <button onClick={clearFilters}>alle Filter löschen</button>
    </section>
  );
};

export default Filter;
