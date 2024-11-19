import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Categories from "../components/MobileMenu/Categories";
import CategoryGroups from "../components/MobileMenu/CategoryGroups";
import { persons, collections } from "../data/data";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedPerson,
  toggleMobileMenu,
  setSelectedCategoryGroup,
} from "../features/ui/uiSlice";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MobileMenu = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const dispatch = useDispatch();
  const { selectedCategoryGroup } = useSelector((state) => state.ui);
  const { selectedPerson } = useSelector((state) => state.ui);
  const isMobileMenuOpen = useSelector((state) => state.ui.isMobileMenuOpen);

  useEffect(() => {
    handlePersonSelect(selectedPerson);
  }, []);

  const handlePersonSelect = (person) => {
    setIsAnimating(false);
    dispatch(setSelectedPerson(person));
    dispatch(setSelectedCategoryGroup(null));

    setTimeout(() => {
      setIsAnimating(true);
    }, 100);
  };

  return isMobileMenuOpen ? (
    <>
      {/* MODAL BACKGROUND */}
      <div
        className="w-full h-full bg-[rgba(0,0,0,0.6)] fixed top-0 left-0 z-40"
        onClick={() => dispatch(toggleMobileMenu())}>
        <FontAwesomeIcon
          icon={faXmark}
          className="absolute text-white text-[8vw] right-[6vw] top-[20vw]"
        />
      </div>

      {/* MOBILE MENU FIELD */}
      <div
        id="ham-field"
        className="w-[80%] h-[calc(100svh-17vw)] flex flex-col bg-white fixed left-0 top-header z-50 overflow-y-auto scrollbar-hide">
        {/* PERSON SELECTION */}
        <div className="w-full flex text-[4.5vw] bg-[#D0D0D0]">
          {persons.map((person) => (
            <button
              key={person}
              onClick={() => handlePersonSelect(person)}
              className={`w-full p-[2vw]  ${
                selectedPerson === person &&
                "bg-white font-bold text-customOrange"
              }`}>
              {person.toUpperCase()}
            </button>
          ))}
        </div>

        {/* CATEGORY GROUPS */}
        <div className="flex-grow">
          {selectedCategoryGroup ? (
            <Categories />
          ) : (
            <CategoryGroups isAnimating={isAnimating} />
          )}
        </div>

        {/* COLLECTIONS */}
        <ul className="bg-[#D0D0D0]">
          {collections.map((collection, index) => (
            <li
              key={index}
              className="w-full text-[4vw] flex justify-between py-[4vw] px-[5vw]">
              <Link
                to={`store?collection=${collection.path.slice(1)}`}
                onClick={() => dispatch(toggleMobileMenu())}>
                {collection.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  ) : null;
};

export default MobileMenu;
