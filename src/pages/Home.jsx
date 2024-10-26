import heroMan from "../assets/images/hero-man.jpg";
import productImg from "../assets/images/Jacke.png";
import secondHeroImg from "../assets/images/Herbstaktion.jpg";
import thirdHeroImg from "../assets/images/shopping.jpg";
import SimpleSlider from "../components/ProductSlider";

const selections = ["Damen", "Herren", "Kinder"];

//FAKE DATA
const fakeProductData = [
  { productId: 1, productName: "Jacke", price: 99.99, img: productImg },
  { productId: 2, productName: "Jacke", price: 99.99, img: productImg },
  { productId: 3, productName: "Jacke", price: 99.99, img: productImg },
  { productId: 4, productName: "Jacke", price: 99.99, img: productImg },
];
const fakeCategories = [
  "Jeans",
  "Hosen",
  "Schuhe",
  "Jacken",
  "T-Shirts",
  "Hemden",
];

const Home = () => {
  return (
    <main>
      {/* SELECTIONS */}
      <section
        className="w-full h-[120vw] flex flex-col items-center justify-center bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${heroMan})` }}>
        <div className="w-[80%] flex flex-col gap-[3vw] mt-[60vw]">
          <h2 className="c-h2">Für wen suchts du?</h2>
          {selections.map((selection) => (
            <button
              key={selection}
              className="w-full h-[11vw] bg-[rgba(255,255,255,0.2)] border border-white text-[4vw]">
              {selection}
            </button>
          ))}
        </div>
      </section>

      {/* TOP CATEGORIES */}
      <section className="flex flex-col gap-[4vw] mt-[12vw]">
        <h2 className="c-h2">Meist gesucht</h2>
        <div className="flex justify-center">
          <div className="grid grid-rows-2 grid-cols-3 gap-[3vw]">
            {fakeCategories.map((category) => (
              <button
                key={category}
                className="w-[25vw] h-[10vw] text-[4vw] border border-black">
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BESTSELLER */}
      <section className="c-home-slider-sections">
        <h2 className="c-h2">Unsere Bestseller</h2>
        <SimpleSlider fakeProductData={fakeProductData} />
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
        <SimpleSlider fakeProductData={fakeProductData} />
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
        <SimpleSlider fakeProductData={fakeProductData} />
      </section>
    </main>
  );
};

export default Home;
