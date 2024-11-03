import { faSliders, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fakeProductData } from "../data/fakeData";
import { useEffect } from "react";
import SingleProduct from "../components/SingleProduct";
import Filter from "../components/Store/Filter";
import Sort from "../components/Store/Sort";
import FilterPreview from "../components/filterPreview";
// REDUX
import { toggleFilter, toggleSort } from "../features/ui/uiSlice";
import { useDispatch, useSelector } from "react-redux";

const Store = () => {
  const dispatch = useDispatch();
  const isFilterOpen = useSelector((state) => state.ui.isFilterOpen);
  const isSortOpen = useSelector((state) => state.ui.isSortOpen);
  const sortBy = useSelector((state) => state.sort.sortOption);

  // DISABLE SCROLLING WHEN MOBILE MENU IS OPEN
  useEffect(() => {
    document.body.style.overflow =
      isFilterOpen || isSortOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFilterOpen, isSortOpen]);

  return (
    <div>
      <h1 className="text-customH1 p-[5vw]">Alle Produkte</h1>
      {/* FILTER AND SORT ICONS */}
      <section
        id="settings"
        className="w-full flex border-y-customBorder border-black py-[2.5vw]">
        {/* FILTER */}
        <div
          id="filter"
          className={`w-full flex justify-center items-center gap-[2vw] text-[4vw] border-r-customBorder border-black ${
            isFilterOpen && "text-customOrange font-bold"
          }`}
          onClick={() => dispatch(toggleFilter())}>
          <FontAwesomeIcon icon={faSliders} />
          <p>Filter</p>
        </div>

        {/* SORT */}
        <div
          id="sort"
          className={`w-full flex justify-center items-center gap-[2vw] text-[4vw] relative ${
            isSortOpen && "text-customOrange font-bold"
          }`}
          onClick={() => dispatch(toggleSort())}>
          <FontAwesomeIcon icon={faSort} />
          <div className="flex flex-col justify-center items-start">
            <p>Sortiere nach:</p>
            <p className="text-customOrange">{sortBy}</p>
          </div>
        </div>
      </section>

      {/* FILTER PREVIEW */}
      <FilterPreview />

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
