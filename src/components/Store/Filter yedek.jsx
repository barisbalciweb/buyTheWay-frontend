import {
  faArrowRightLong,
  faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toggleFilter } from "../../features/ui/uiSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { filterOptions } from "../../data/data";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

const Filter = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    Sortierung: null,
    Kategorie: null,
    Preis: null,
    Farbe: null,
    Größe: null,
    Marke: null,
    Sale: null,
  });

  const dispatch = useDispatch();

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleFilterChange = (filterGroup, option) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterGroup]: option,
    }));
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
        {Object.keys(filterOptions).map((filterGroup, index) => (
          <div
            key={filterGroup}
            className="flex flex-col items-center border-b-customBorder border-black">
            <button
              type="button"
              className={`w-full flex justify-between py-[4vw] `}
              onClick={() => toggleAccordion(index)}>
              <p
                className={`${
                  openIndex === index && "text-customOrange font-bold"
                }`}>
                {filterGroup}
              </p>
              <FontAwesomeIcon
                icon={openIndex === index ? faAngleUp : faAngleDown}
              />
            </button>

            {openIndex === index && (
              <div
                className={`accordion-content w-full flex flex-col mb-[5vw] ${
                  openIndex === index ? "accordion-content-open" : ""
                }`}>
                <ul>
                  {filterOptions[filterGroup].map((option) => (
                    <li key={option}>
                      <label className="flex items-center gap-2 p-[2vw]">
                        <input
                          type="radio"
                          name={filterGroup}
                          value={option}
                          onChange={() =>
                            handleFilterChange(filterGroup, option)
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
          console.log("Final filtreler gönderiliyor:", selectedFilters)
        }
        className="mt-4 bg-blue-500 text-white p-2 rounded">
        auswählen (Seçili Filtreler: {JSON.stringify(selectedFilters)})
      </button>
    </section>
  );
};

export default Filter;
