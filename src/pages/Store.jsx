import { faSliders, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import SingleProduct from "../components/SingleProduct";
import Filter from "../components/Store/Filter";
import Sort from "../components/Store/Sort";
import FilterPreview from "../components/filterPreview";
import { useSearchParams } from "react-router-dom";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { selectRenderedProducts } from "../features/products/renderedProductsSelector";
import { toggleFilter, toggleSort } from "../features/ui/uiSlice";
import { fetchProducts } from "../features/products/productsSlice";
import {
  fetchFilteredProducts,
  fetchFilters,
} from "../features/filter/filterSlice";

const Store = () => {
  // FIND OUT WHICH PRODUCTS TO FETCH VIA URL PARAMS
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const collection = searchParams.get("collection");
  const targetGroup = searchParams.get("targetGroup");
  const category = searchParams.get("category");
  const filtering = searchParams.get("filtering");

  // GLOBAL STATES
  const isFilterOpen = useSelector((state) => state.ui.isFilterOpen);
  const isSortOpen = useSelector((state) => state.ui.isSortOpen);
  const sortBy = useSelector((state) => state.sort.sortBy);
  const productsStates = useSelector((state) => state.products);
  const { statuses } = useSelector((state) => state.products);
  const filterOptions = useSelector((state) => state.filter.filterOptions);
  const filterOptionsStatus = useSelector(
    (state) => state.filter.statuses.filterOptions
  );
  const { filteredProducts } = useSelector((state) => state.filter);
  const { filteredProductsStatus } = useSelector(
    (state) => state.filter.statuses
  );
  const { selectedFilters } = useSelector((state) => state.filter);

  // SELECT RENDERED PRODUCTS ACCORDING TO URL PARAMS
  const renderedProducts = useSelector((state) =>
    selectRenderedProducts(state, {
      collection,
      filtering,
      targetGroup,
      category,
    })
  );
  const count = renderedProducts.length;

  // SPECIFY FETCH STATUS DYANMICALLY
  const fetchStatus =
    statuses[collection] || statuses.productsByCategory || "idle";

  // FETCH PRODUCTS DYANMICALLY ACCORDING TO URL PARAMS
  useEffect(() => {
    let endpoint = "";

    // BY COLLECTION
    if (collection) {
      endpoint = `collection?collection=${collection}`;
      // BY CATEGORY
    } else if (targetGroup && category) {
      const queryParams = new URLSearchParams({
        targetGroup,
        category,
      }).toString();
      endpoint = `category?${queryParams}`;
    } else if (filtering) {
      endpoint = `filteredProducts`;
      dispatch(fetchFilteredProducts(selectedFilters));
      return;
    }

    dispatch(
      fetchProducts({ endpoint, type: collection || "productsByCategory" })
    );
  }, [targetGroup, category, collection, selectedFilters]);

  // EXCEPTIONALLY FETCH FILTER OPTIONS HERE IN ORDER TO GET SORT OPTIONS FOR SORTING DROPDOWN
  useEffect(() => {
    if (filterOptionsStatus === "idle") {
      dispatch(fetchFilters());
    }
  }, [filterOptionsStatus]);

  // GET HEADING ACCORDING TO URL PARAMS
  const getHeading = () => {
    const count = renderedProducts?.length || 0;

    if (collection) {
      switch (collection) {
        case "bestsellers":
          return `Bestsellers (${count})`;
        case "discounted":
          return `Reduzierte Artikel (${count})`;
        case "favorites":
          return `Beliebte Artikel (${count})`;
        default:
          return "";
      }
    } else if (category) {
      return `${category[0].toUpperCase() + category.slice(1)} (${count})`;
    } else {
      return `Suchergebnisse (${count})`;
    }
  };

  return (
    <div className="flex flex-col flex-grow">
      <h1 className="text-customH1 p-[5vw]">{getHeading()}</h1>

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
