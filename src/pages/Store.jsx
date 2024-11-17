import { faSliders, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import SingleProduct from "../components/SingleProduct";
import Filter from "../components/Store/Filter";
import Sort from "../components/Store/Sort";
import FilterPreview from "../components/filterPreview";
import { useParams } from "react-router-dom";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { toggleFilter, toggleSort } from "../features/ui/uiSlice";
import { fetchProducts } from "../features/products/productsSlice";
import { fetchFilters } from "../features/filter/filterSlice";

const Store = () => {
  const { targetGroup, category, subCategory, collection } = useParams();

  // GLOBAL STATES
  const isFilterOpen = useSelector((state) => state.ui.isFilterOpen);
  const isSortOpen = useSelector((state) => state.ui.isSortOpen);
  const sortBy = useSelector((state) => state.sort.sortBy);
  const productsStates = useSelector((state) => state.products);
  const { statuses } = useSelector((state) => state.products);
  const filterStatus = useSelector(
    (state) => state.filter.statuses.filterOptions
  );

  // SPECIFY WHICH PRODUCTS TO RENDER
  const renderedProducts = collection
    ? productsStates[collection]
    : productsStates.filteredProducts;

  const fetchStatus =
    statuses[collection] || statuses.filteredProducts || "idle";

  const dispatch = useDispatch();

  // FETCH CATEGORIE OPTIONS FOR SORTING
  useEffect(() => {
    if (filterStatus === "idle") {
      dispatch(fetchFilters());
    }
  }, [filterStatus]);

  // FETCH PRODUCTS DYANMICALLY ACCORDING TO URL PARAMS
  useEffect(() => {
    let endpoint = "";

    if (collection) {
      endpoint = `collections/${collection}`;
    } else if (targetGroup && category && subCategory) {
      const queryParams = new URLSearchParams({
        targetGroup: targetGroup,
        subCategory: subCategory,
      }).toString();
      endpoint = `?${queryParams}`;
    }

    dispatch(
      fetchProducts({ endpoint, type: collection || "filteredProducts" })
    );
  }, [targetGroup, category, subCategory, collection]);

  return (
    <div className="flex flex-col flex-grow">
      <h1 className="text-customH1 p-[5vw]">
        {collection
          ? collection === "bestsellers"
            ? "Bestsellers"
            : collection === "discounted"
            ? "Reduzierte Artikel"
            : collection === "favorites"
            ? "Beliebte Artikel"
            : ""
          : "Ergebnisse"}
      </h1>

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
        {fetchStatus === "succeeded"
          ? //! ONLY FOR TESTING
            renderedProducts.map((product) => (
              <SingleProduct key={product.id} product={product} />
            ))
          : "Loading..."}

        {/* FILTER DROPDOWN */}
        {isFilterOpen && <Filter />}

        {/* SORT DROPDOWN */}
        {isSortOpen && <Sort />}
      </section>
    </div>
  );
};

export default Store;
