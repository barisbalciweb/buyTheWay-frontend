import { useEffect, useState } from "react";
import { categoryGroups } from "../../data/fakeData";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCategoryGroup } from "../../features/ui/uiSlice";

const Categories = ({ isAnimating }) => {
  const [filteredCategoryGroups, setFilteredCategoryGroups] = useState([]);

  const dispatch = useDispatch();
  const { selectedPerson } = useSelector((state) => state.ui);

  useEffect(() => {
    // FILTER CATEGORY GROUPS BY SELECTED PERSON
    const filtered = categoryGroups.filter((categoryGroup) =>
      categoryGroup.categories.some((category) =>
        category.targetGroup.includes(selectedPerson)
      )
    );
    setFilteredCategoryGroups(filtered);
  }, [selectedPerson]);

  return (
    /* CATEGORY GROUP SELECTION */
    <div className="w-full">
      <ul
        className={`flex flex-col gap-[3vw] p-[5vw] transform transition-transform duration-300 ease-out ${
          isAnimating ? "translate-x-[0vw]" : "-translate-x-full"
        }`}>
        {filteredCategoryGroups.length > 0 &&
          filteredCategoryGroups.map((category, index) => (
            <li className="list-none" key={index}>
              <button
                className="w-full text-[4vw] flex justify-between py-[3vw]"
                onClick={() =>
                  dispatch(setSelectedCategoryGroup(category.name))
                }>
                {category.name}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Categories;
