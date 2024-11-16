import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { categories } from "../../data/fakeData";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedCategory,
  toggleMobileMenu,
} from "../../features/ui/uiSlice";

const SubCategories = () => {
  const dispatch = useDispatch();
  const { selectedPerson, selectedCategory } = useSelector((state) => state.ui);

  // FILTER SUB-CATEGORIES BY SELECTED PERSON AND CATEGORY
  const filteredSubCategories = categories
    .find((category) => category.name === selectedCategory)
    ?.subCategories.filter((subCategory) =>
      subCategory.targetGroup.includes(selectedPerson)
    );

  return (
    <div
      id="sub-category-field"
      className="w-full flex flex-col gap-[2vw] mt-[5vw]">
      {/* NAVIGATION */}
      <button
        className="w-full flex items-center gap-[2vw] pl-[2vw] text-[4vw] text-customOrange"
        onClick={() => dispatch(setSelectedCategory(null))}>
        <FontAwesomeIcon
          icon={faCircleArrowLeft}
          className="font-bold pb-[0.5vw]"
        />
        <p>
          {selectedPerson}
          {" > "}
          {selectedCategory}
        </p>
      </button>

      {/* SUB-CATEGORY SELECTION */}
      <ul
        className={`flex flex-col gap-[3vw] transform transition-transform duration-300 ease-out`}>
        {filteredSubCategories.map((category, index) => (
          <li className="list-none" key={index}>
            <Link
              to={`store/products/${selectedPerson.toLowerCase()}/${selectedCategory.toLowerCase()}/${category.name.toLowerCase()}`}
              className="w-[80vw] text-[4vw] flex justify-between py-[2vw] px-[2vw]"
              onClick={() => dispatch(toggleMobileMenu())}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubCategories;
