import { useEffect, useState } from "react";
import { categories } from "../../data/fakeData";

const Categories = ({ isAnimating, setSelectedCategory, selectedPerson }) => {
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    // FILTER CATEGORIES BY SELECTED PERSON
    const filtered = categories.filter((category) =>
      category.subCategories.some((subCategory) =>
        subCategory.targetGroup.includes(selectedPerson)
      )
    );
    setFilteredCategories(filtered);
  }, [selectedPerson]);

  return (
    /* CATEGORY SELECTION */
    <div id="category-field" className="w-full">
      <ul
        className={`flex flex-col gap-[3vw] pt-[5vw] transform transition-transform duration-300 ease-out ${
          isAnimating ? "translate-x-[0vw]" : "-translate-x-full"
        }`}>
        {filteredCategories.length > 0 &&
          filteredCategories.map((category, index) => (
            <li className="list-none" key={index}>
              <button
                className="w-full text-[4vw] flex justify-between py-[3vw] px-[5vw]"
                onClick={() => setSelectedCategory(category.name)}>
                {category.name}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Categories;
