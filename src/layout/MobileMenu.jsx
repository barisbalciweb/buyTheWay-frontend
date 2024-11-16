import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SubCategories from "../components/MobileMenu/SubCategories";
import Categories from "../components/MobileMenu/Categories";
import { persons, collections } from "../data/data";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedPerson,
  toggleMobileMenu,
  setSelectedCategory,
} from "../features/ui/uiSlice";

const MobileMenu = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state) => state.ui);
  const { selectedPerson } = useSelector((state) => state.ui);
  const isMobileMenuOpen = useSelector((state) => state.ui.isMobileMenuOpen);

  useEffect(() => {
    handlePersonSelect(selectedPerson);
  }, []);

  const handlePersonSelect = (person) => {
    setIsAnimating(false);
    dispatch(setSelectedPerson(person));
    dispatch(setSelectedCategory(null));

    setTimeout(() => {
      setIsAnimating(true);
    }, 100);
  };

  return isMobileMenuOpen ? (
    <>
      {/* MODAL BACKGROUND */}
      <div
        className="w-full h-full bg-[rgba(0,0,0,0.6)] fixed top-0 left-0 z-40"
        onClick={() => dispatch(toggleMobileMenu())}
      />

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

        {/* CATEGORIES */}
        <div className="flex-grow">
          {selectedCategory ? (
            <SubCategories />
          ) : (
            <Categories isAnimating={isAnimating} />
          )}
        </div>

        {/* COLLECTIONS */}
        <ul className="bg-[#D0D0D0]">
          {collections.map((collection, index) => (
            <li
              key={index}
              className="w-full text-[4vw] flex justify-between py-[4vw] px-[5vw] border-b-customBorder">
              <Link
                to={`store/collections${collection.path}`}
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
