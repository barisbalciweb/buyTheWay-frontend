import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { deleteSelectedFilter } from "../features/filter/filterSlice";

const FilterPreview = () => {
  const selectedFilters = useSelector((state) => state.filter.selectedFilters);
  const dispatch = useDispatch();

  return (
    <section id="filters" className="flex flex-wrap gap-[1vw] p-[3vw]">
      {Object.entries(selectedFilters).map(([filterCategory, filterOptions]) =>
        // FILTER OPTIONS FROM CHECKBOX INPUT
        Array.isArray(filterOptions) && filterOptions.length > 0
          ? filterOptions.map((filterOption) => (
              <div
                key={`${filterCategory}-${filterOption}`}
                className="flex justify-center items-center gap-[1vw] bg-gray-200 rounded-lg p-[2vw] text-[3vw]"
                onClick={() =>
                  dispatch(
                    deleteSelectedFilter({
                      filterCategory,
                      filterOption,
                      inputType: "checkbox",
                    })
                  )
                }>
                <p>{filterOption}</p>
                <FontAwesomeIcon className="text-[4vw]" icon={faXmark} />
              </div>
            ))
          : // FILTER OPTIONS FROM RADIO INPUT
            typeof filterOptions === "string" &&
            filterOptions !== "" && (
              <div
                key={`${filterCategory}-${filterOptions}`}
                className="flex justify-center items-center gap-[1vw] bg-gray-200 rounded-lg p-[2vw] text-[3vw]"
                onClick={() =>
                  dispatch(
                    deleteSelectedFilter({
                      filterCategory,
                      filterOption: filterOptions,
                      inputType: "radio",
                    })
                  )
                }>
                <p>{filterOptions}</p>
                <FontAwesomeIcon className="text-[4vw]" icon={faXmark} />
              </div>
            )
      )}
    </section>
  );
};

export default FilterPreview;
