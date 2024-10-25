import heroMan from "../assets/images/hero-man.jpg";
import Bestseller from "../components/Bestseller";

const h2Style = "text-[6vw]";
const sectionStyle = "flex flex-col items-center pt-[12vw]";
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
          <h2 className={`${h2Style} text-white`}>Für wen suchts du?</h2>
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
          <Bestseller />
        </div>
      </section>
      <section></section>
      {/* DISCOUNTS  */}
      <section className={sectionStyle}>
        <h2 className={h2Style}>Reduzierte Artikel</h2>
      </section>
      <section></section>
      {/* FAVORITES */}
      <section className={sectionStyle}>
        <h2 className={h2Style}>Beliebte Artikel</h2>
      </section>
    </main>
  );
};

export default Home;
