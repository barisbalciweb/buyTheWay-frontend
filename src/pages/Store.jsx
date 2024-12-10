import { faSliders, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import SingleProduct from "../components/SingleProduct";
import Filter from "../components/Store/Filter";
import Sort from "../components/Store/Sort";
import FilterPreview from "../components/FilterPreview";
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
  const search = searchParams.get("search");

  // GLOBAL STATES
  const { isFilterOpen, isSortOpen } = useSelector((state) => state.ui);
  const { sortBy } = useSelector((state) => state.sort);
  const { statuses } = useSelector((state) => state.products);
  const { selectedFilters } = useSelector((state) => state.filter);
  const filterOptionsStatus = useSelector(
    (state) => state.filter.statuses.filterOptions
  );
  const { searchResults, searchResultsStatus } = useSelector(
    (state) => state.search
  );

  // SELECT RENDERED PRODUCTS ACCORDING TO URL PARAMS
  const renderedProducts = useSelector((state) =>
    selectRenderedProducts(state, {
      collection,
      filtering,
      targetGroup,
      category,
      searchResults,
    })
  );

  const count = renderedProducts.length;

  // SPECIFY FETCH STATUS DYANMICALLY
  const fetchStatus =
    statuses[collection] ||
    statuses.productsByCategory ||
    statuses.productsByTargetGroup ||
    searchResultsStatus ||
    "idle";

  // FETCH PRODUCTS DYANMICALLY ACCORDING TO URL PARAMS
  useEffect(() => {
    let endpoint = "";

    // BY COLLECTION
    if (collection) {
      endpoint = `collection?collection=${collection}`;
      dispatch(fetchProducts({ endpoint, type: collection }));
      // BY TARGET GROUP OR CATEGORY
    } else if (targetGroup || category) {
      const queryParams = new URLSearchParams({
        targetGroup: targetGroup || "",
        category: category || "",
      }).toString();
      endpoint = `${!category ? "targetGroup" : "category"}?${queryParams}`;
      dispatch(
        fetchProducts({
          endpoint,
          type: !category ? "productsByTargetGroup" : "productsByCategory",
        })
      );
    } else if (filtering) {
      endpoint = `filteredProducts`;
      dispatch(fetchFilteredProducts(selectedFilters));
      return;
    }
  }, [targetGroup, category, collection, selectedFilters]);

  // EXCEPTIONALLY FETCH ALL FILTER OPTIONS HERE IN ORDER TO GET SORT OPTIONS FOR SORTING DROPDOWN
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
    } else if (targetGroup) {
      return `${
        targetGroup[0].toUpperCase() + targetGroup.slice(1) + "produkte"
      } (${count})`;
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

      {/* FILTER DROPDOWN */}
      {isFilterOpen && <Filter />}

      {/* SORT DROPDOWN */}
      {isSortOpen && <Sort />}

      {/* FILTER PREVIEW */}
      <FilterPreview />

      {/* PRODUCTS */}
      {count === 0 ? (
        <section className="flex justify-center items-center">
          <p className="mt-[10vw]">Keine Produkte gefunden</p>
        </section>
      ) : (
        <section className="grid grid-cols-2 p-[5vw] gap-[4vw]">
          {fetchStatus === "succeeded" || renderedProducts
            ? renderedProducts.map((product) => (
                <SingleProduct key={product.id} product={product} />
              ))
            : "Loading..."}
        </section>
      )}
    </div>
  );
};

export default Store;
