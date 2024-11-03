import { faSliders, faSort, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fakeProductData } from "../data/fakeData";
import { useEffect, useState } from "react";
import SingleProduct from "../components/SingleProduct";
import Filter from "../components/Store/Filter";
import Sort from "../components/Store/Sort";
// REDUX
import { toggleFilter, toggleSort } from "../features/ui/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedFilter,
  deleteSelectedFilter,
} from "../features/filter/filterSlice";

const Store = () => {
  const [filterPreview, setFilterPreview] = useState(null);
  const dispatch = useDispatch();
  const isFilterOpen = useSelector((state) => state.ui.isFilterOpen);
  const isSortOpen = useSelector((state) => state.ui.isSortOpen);
  const selectedFilters = useSelector((state) => state.filter.selectedFilters);

  // DISABLE SCROLLING WHEN MOBILE MENU IS OPEN
  useEffect(() => {
    document.body.style.overflow =
      isFilterOpen || isSortOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFilterOpen, isSortOpen]);

  // REDUCE SELECTED FILTER OPTIONS TO ARRAY
  useEffect(() => {
    const reduced = Object.keys(selectedFilters).reduce((acc, curr) => {
      const value = selectedFilters[curr];

      if (Array.isArray(value) && value.length > 0) {
        value.forEach((option) => {
          acc.push(option);
        });
      } else if (typeof value === "string") {
        acc.push(value);
      }
      return acc;
    }, []);

    setFilterPreview(reduced);
  }, [selectedFilters]);

  const deleteFilter = (filter) => {
    dispatch(deleteSelectedFilter(filter));
  };

  return (
    <div>
      <h1 className="text-customH1 p-[5vw]">Alle Produkte</h1>
      {/* FILTER AND SORT ICONS */}
      <section
        id="settings"
        className="w-full h-[] flex border-y-customBorder border-black py-[2.5vw]">
        <div
          className={`w-full flex justify-center items-center gap-[2vw] text-[4vw] border-r-customBorder border-black ${
            isFilterOpen && "text-customOrange font-bold"
          }`}
          onClick={() => dispatch(toggleFilter())}>
          <FontAwesomeIcon icon={faSliders} />
          <p>Filter</p>
        </div>

        <div
          className={`w-full flex justify-center items-center gap-[2vw] text-[4vw] relative ${
            isSortOpen && "text-customOrange font-bold"
          }`}
          onClick={() => dispatch(toggleSort())}>
          <FontAwesomeIcon icon={faSort} />
          <p>Sortieren</p>
        </div>
      </section>

      {/* SELECTED FILTERS PREVIEW AS TAGS */}
      {filterPreview && (
        <section id="filters" className="flex flex-wrap gap-[1vw] p-[3vw]">
          {filterPreview.map(
            (filter) =>
              filter !== "" && (
                <div
                  key={filter}
                  className="flex justify-center items-center gap-[1vw] bg-gray-200 rounded-lg p-[2vw] text-[3vw]"
                  onClick={() => deleteFilter(filter)}>
                  <p>{filter}</p>
                  <FontAwesomeIcon className="text-[4vw]" icon={faXmark} />
                </div>
              )
          )}
        </section>
      )}

      {/* PRODUCTS */}
      <section className="grid grid-cols-2 p-[5vw] gap-[4vw]">
        {fakeProductData.map((product) => (
          <SingleProduct key={product.productId} product={product} />
        ))}

        {/* FILTER DROPDOWN */}
        {isFilterOpen && <Filter />}

        {/* SORT DROPDOWN */}
        {isSortOpen && <Sort />}
      </section>
    </div>
  );
};

export default Store;
