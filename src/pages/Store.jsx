import { faSliders, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fakeProductData } from "../data/fakeData";
import SingleProduct from "../components/SingleProduct";
import { useDispatch, useSelector } from "react-redux";
import { toggleFilter, toggleSort } from "../features/UI/UISlice";

const sortOptions = [
  "Beliebtheit",
  "Preis aufsteigend",
  "Preis absteigend",
  "Neueste zuerst",
  "Älteste zuerst",
  "Bewertung",
  "Name A-Z",
  "Name Z-A",
  "Verfügbarkeit",
  "Rabatt",
  "Empfohlen",
  "Meistverkauft",
];

const Store = () => {
  const dispatch = useDispatch();
  const isFilterOpen = useSelector((state) => state.ui.isFilterOpen);
  const isSortOpen = useSelector((state) => state.ui.isSortOpen);

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
      <section className="grid grid-cols-2 p-[5vw] gap-[4vw] relative">
        {fakeProductData.map((product) => (
          <SingleProduct key={product.productId} product={product} />
        ))}

        {/* FILTER DROPDOWN */}
        {isFilterOpen && (
          <section className="w-full h-[20vw] bg-white absolute top-0 z-10">
            Filter
          </section>
        )}

        {/* FILTER DROPDOWN */}
        {isSortOpen && (
          <section className="w-full bg-[rgba(255,255,255,0.9)] absolute top-0 z-10">
            {sortOptions.map((option) => (
              <p key={option} className="p-[2vw]">
                {option}
              </p>
            ))}
          </section>
        )}
      </section>
    </div>
  );
};

export default Store;
