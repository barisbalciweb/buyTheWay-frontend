import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { deleteSelectedFilter } from "../features/filter/filterSlice";

const FilterPreview = () => {
  const selectedFilters = useSelector((state) => state.filter.selectedFilters);
  const dispatch = useDispatch();

  // RENDER FILTER OPTIONS DYANMICALLY
  const renderFilterOption = (filterCategory, filterOption, inputType) => (
    <div
      key={`${filterCategory}-${filterOption}`}
      className="flex justify-center items-center gap-[1vw] bg-gray-200 rounded-lg p-[2vw] text-[3vw]"
      onClick={() =>
        dispatch(
          deleteSelectedFilter({ filterCategory, filterOption, inputType })
        )
      }>
      <p>{filterOption}</p>
      <FontAwesomeIcon className="text-[4vw]" icon={faXmark} />
    </div>
  );

  return (
    <section id="filters" className="flex flex-wrap gap-[1vw] p-[3vw]">
      {Object.entries(selectedFilters).flatMap(
        ([filterCategory, filterOptions]) => {
          // ARRAY FILTERS
          if (Array.isArray(filterOptions) && filterOptions.length > 0) {
            // PRICE FILTER
            if (filterCategory === "price") {
              return filterOptions.length === 2
                ? renderFilterOption(
                    filterCategory,
                    `${filterOptions[0]}-${filterOptions[1]}€`,
                    "range"
                  )
                : null;
            } else {
              // OTHER FILTERS
              return filterOptions.map((filterOption) =>
                renderFilterOption(filterCategory, filterOption, "checkbox")
              );
            }
          }

          if (typeof filterOptions === "string" && filterOptions !== "") {
            // STRING FILTERS
            return renderFilterOption(filterCategory, filterOptions, "radio");
          }

          return null;
        }
      )}
    </section>
  );
};

export default FilterPreview;
