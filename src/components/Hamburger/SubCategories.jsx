import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fakeSubCategories } from "../../data/fakeData";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const SubCategories = ({
  selectedPerson,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div
      id="sub-category-field"
      className="w-full flex flex-col gap-[2vw] mt-[5vw]">
      {/* NAVIGATION FIELD */}
      <div
        id="navigation-field"
        className="flex items-center gap-[2vw] pl-[2vw]"
        onClick={() => setSelectedCategory(null)}>
        <button>
          <FontAwesomeIcon
            icon={faCircleArrowLeft}
            className="text-[5vw] font-bold text-customOrange"
          />
        </button>
        <p className="text-customOrange text-[4vw]">
          {selectedPerson}
          {" > "}
          {selectedCategory}
        </p>
      </div>

      {/* SUB-CATEGORY SELECTION */}
      <ul
        className={`flex flex-col gap-[3vw] transform transition-transform duration-300 ease-out`}>
        {fakeSubCategories.map((category, index) => (
          <li className="list-none" key={index}>
            <Link className="w-[80vw] text-[4vw] flex justify-between py-[2vw] px-[2vw]">
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubCategories;
