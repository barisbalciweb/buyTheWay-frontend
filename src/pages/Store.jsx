import { faSliders, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fakeProductData } from "../data/fakeData";
import { useEffect } from "react";
import SingleProduct from "../components/SingleProduct";
import Filter from "../components/Store/Filter";
import Sort from "../components/Store/Sort";
// REDUX
import { toggleFilter, toggleSort } from "../features/ui/uiSlice";
import { useDispatch, useSelector } from "react-redux";

const Store = () => {
  const dispatch = useDispatch();
  const isFilterOpen = useSelector((state) => state.ui.isFilterOpen);
  const isSortOpen = useSelector((state) => state.ui.isSortOpen);

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
          className={`w-full flex justify-center items-center gap-[2vw] text-[4vw] ${
            isSortOpen && "text-customOrange font-bold"
          }`}
          onClick={() => dispatch(toggleSort())}>
          <FontAwesomeIcon icon={faSort} />
          <p>Sortieren</p>
        </div>
      </section>

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
