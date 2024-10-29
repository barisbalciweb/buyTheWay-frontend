import { fakeCategories } from "../../data/fakeData";

const Categories = ({ isAnimating, setSelectedCategory }) => {
  return (
    /* CATEGORY SELECTION */
    <div id="category-field" className="w-full">
      <ul
        className={`flex flex-col gap-[3vw] pt-[5vw] transform transition-transform duration-300 ease-out ${
          isAnimating ? "translate-x-[0vw]" : "-translate-x-full"
        }`}>
        {fakeCategories.map((category, index) => (
          <li className="list-none" key={index}>
            <button
              className="w-full text-[4vw] flex justify-between py-[3vw] px-[5vw]"
              onClick={() => setSelectedCategory(category)}>
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
