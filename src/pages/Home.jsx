import heroMan from "../assets/images/hero-man.jpg";
import produktImg from "../assets/images/Jacke.png";
import SlideField from "../components/SlideField";
import secondHeroImg from "../assets/images/Herbstaktion.jpg";
import thirdHeroImg from "../assets/images/shopping.jpg";

const fakeProduktData = [
  { productId: 1, produktName: "Jacke", price: 99.99, img: produktImg },
  { productId: 2, produktName: "Jacke", price: 99.99, img: produktImg },
  { productId: 3, produktName: "Jacke", price: 99.99, img: produktImg },
  { productId: 4, produktName: "Jacke", price: 99.99, img: produktImg },
];
const h2Style = "text-[6vw]";
const sectionStyle = "flex flex-col items-center mt-[12vw]";
const selections = ["Damen", "Herren", "Kinder"];
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
        className="w-full h-[120vw] flex flex-col items-center bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${heroMan})` }}>
        <div className="w-[80%] flex flex-col gap-[3vw] mt-[65vw]">
          <h2 className={h2Style}>Für wen suchts du?</h2>
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
      <section className={sectionStyle}>
        <div className="w-[80%] flex flex-col gap-[3vw]">
          <h2 className={h2Style}>Meist gesucht</h2>
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
      <section className={sectionStyle}>
        <div className="w-[80%] flex flex-col items-center gap-[3vw]">
          <div className="w-full">
            <h2 className={h2Style}>Unsere Bestseller</h2>
          </div>
          <SlideField fakeProduktData={fakeProduktData} />
        </div>
      </section>

      {/* HERO (2) */}
      <section
        className="w-full h-[90vw] flex flex-col justify-end items-center bg-cover bg-center mt-[12vw] text-white"
        style={{ backgroundImage: `url(${secondHeroImg})` }}>
        <h2 className={`${h2Style} w-[80%] mb-[8vw]`}>
          <span className="block">Bis zu 50%</span>
          <span className="block">Rabatt auf die</span>
          <span className="block">Herbstkollektion!</span>
        </h2>
      </section>

      {/* DISCOUNTS  */}
      <section className={sectionStyle}>
        <div className="w-[80%] flex flex-col items-center gap-[3vw]">
          <div className="w-full">
            <h2 className={h2Style}>Reduzierte Artikel</h2>
          </div>
          <SlideField fakeProduktData={fakeProduktData} />
        </div>
      </section>

      {/* HERO (3) */}
      <section
        className="w-full h-[90vw] flex flex-col items-center bg-cover bg-center mt-[12vw] text-white"
        style={{ backgroundImage: `url(${thirdHeroImg})` }}>
        <h2 className={`${h2Style} w-[80%] mt-[8vw] text-black font-bold`}>
          Premium Marken
        </h2>
      </section>

      {/* FAVORITES */}
      <section className={sectionStyle}>
        <div className="w-[80%] flex flex-col items-center gap-[3vw]">
          <div className="w-full">
            <h2 className={h2Style}>Beliebte Artikel</h2>
          </div>
          <SlideField fakeProduktData={fakeProduktData} />
        </div>
      </section>
    </main>
  );
};

export default Home;
