import { settings } from "../data/data";

const Account = () => {
  const handleClick = (e) => {};

  return (
    //! TO FIX: can't give h-screen to main element
    <main>
      <div className="p-[4vw]">
        <section>
          <h1 className="text-[7vw] font-bold mb-[4vw]">Mein Konto</h1>
          <h2 className="text-[5vw]">Wilkommen, {}</h2>
          <p className="text-[4vw]">Kundennummer: {}</p>
        </section>
        <section className="my-[10vw]">
          <ul className="flex flex-col gap-[2vw]">
            {settings.map(({ title }, index) => (
              <li key={index}>
                <button
                  className="w-full border-gray-400 border-customBorder rounded-md text-[4vw] shadow-md font-bold text-center py-[6vw] px-[2vw]"
                  onClick={handleClick}>
                  {title}
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default Account;
