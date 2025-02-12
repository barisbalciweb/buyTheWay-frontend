import { useEffect } from "react";
import secondHeroImg from "../assets/images/Herbstaktion.webp";
import thirdHeroImg from "../assets/images/shopping.webp";
import { fakeTopCategories } from "../data/data";
import { selections } from "../data/data";
import LazyProductSlider from "../components/LazyProductSlider";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import HeroSlider from "../components/Home/HeroSlider";

const Home = () => {
  const dispatch = useDispatch();
  const { bestsellers, discounted, favorites, statuses } = useSelector(
    (state) => state.products
  );
  const bestsellersStatus = statuses.bestsellers;
  const discountedStatus = statuses.discounted;
  const favoritesStatus = statuses.favorites;

  // FETCH BESTSELLERS, DISCOUNTED AND FAVORITES
  useEffect(() => {
    const fetchData = () => {
      if (bestsellers.length === 0) {
        dispatch(
          fetchProducts({
            endpoint: "collection?collection=bestsellers",
            type: "bestsellers",
          })
        );
      }
      if (discounted.length === 0) {
        dispatch(
          fetchProducts({
            endpoint: "collection?collection=discounted",
            type: "discounted",
          })
        );
      }
      if (favorites.length === 0) {
        dispatch(
          fetchProducts({
            endpoint: "collection?collection=favorites",
            type: "favorites",
          })
        );
      }
    };
    fetchData();
  }, []);

  return (
    <main>
      {/* SELECTIONS */}
      <section className="w-full h-[120vw] flex flex-col items-center justify-center bg-cover bg-center relative">
        <HeroSlider />
        <div className="w-full mt-[54vw] absolute flex flex-col items-center justify-center z-[1] text-white">
          <h2 className="text-shadow-black text-[6vw] text-center font-bold mb-[2vw]">
            Für wen suchts du?
          </h2>
          <div className="w-[70%] flex flex-col items-center justify-center gap-[2.5vw]">
            {selections.map((selection) => (
              <button
                key={selection}
                className="w-full h-[14vw] bg-[rgba(0,0,0,0.5)] tracking-wider font-bold border-customBorder border-white text-[4.5vw] rounded-sm">
                <Link
                  to={`store?targetGroup=${selection}`}
                  className="w-full h-full flex justify-center items-center">
                  {selection}
                </Link>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TOP CATEGORIES */}
      <section className="flex flex-col gap-[4vw] mt-[12vw]">
        <h2 className="c-h2">Top Kategorien</h2>
        <div className="flex justify-center">
          <div className="grid grid-rows-2 grid-cols-3 gap-[4vw]">
            {fakeTopCategories.map((category) => (
              <button
                key={category}
                className="w-[25vw] h-[25vw] text-[4vw] font-bold border-customBorder border-gray-400 rounded-sm shadow-[0_1vw_1vw_0_rgba(0,0,0,0.1)]">
                <Link
                  to={`store?category=${category}`}
                  className="w-full h-full flex justify-center items-center">
                  {category}
                </Link>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BESTSELLER */}
      <section className="c-home-slider-sections">
        <h2 className="c-h2">Bestsellers</h2>
        {bestsellersStatus === "succeeded" ? (
          <LazyProductSlider products={bestsellers} />
        ) : (
          <div className="h-slider flex justify-center items-center">
            <ClipLoader size={"20vw"} />
          </div>
        )}
      </section>

      {/* HERO (2) */}
      <section
        className="c-home-slider-sections w-full h-[90vw] justify-end items-center bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${secondHeroImg})` }}>
        <h2 className="c-h2 w-[80%] mb-[2vw]">
          <span className="block">Bis zu 50%</span>
          <span className="block">Rabatt auf die</span>
          <span className="block">Herbstkollektion!</span>
        </h2>
      </section>

      {/* DISCOUNTS  */}
      <section className="c-home-slider-sections">
        <h2 className="c-h2">Reduzierte Artikel</h2>
        {discountedStatus === "succeeded" ? (
          <LazyProductSlider products={discounted} />
        ) : (
          <div className="h-slider flex justify-center items-center">
            <ClipLoader size={"20vw"} />
          </div>
        )}
      </section>

      {/* HERO (3) */}
      <section
        className="c-home-slider-sections w-full h-[90vw] items-center bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${thirdHeroImg})` }}>
        <h2 className="c-h2 mt-[2vw] text-black font-bold">Premium Marken</h2>
      </section>

      {/* FAVORITES */}
      <section className="c-home-slider-sections">
        <h2 className="c-h2">Beliebte Artikel</h2>
        {favoritesStatus === "succeeded" ? (
          <LazyProductSlider products={favorites} />
        ) : (
          <div className="h-slider flex justify-center items-center">
            <ClipLoader size={"20vw"} />
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
