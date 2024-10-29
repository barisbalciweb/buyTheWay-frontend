import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SubCategories from "../components/MobileMenu/SubCategories";
import Categories from "../components/MobileMenu/Categories";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { toggleMobileMenu } from "../features/ui/uiSlice";

const persons = ["DAMEN", "HERREN", "KINDER"];
const featuredCategories = [
  { name: "Bestseller", path: "/bestseller" },
  { name: "Reduzierte Artikel", path: "/sale" },
  { name: "Beliebte Artikel", path: "/favorites" },
];

const MobileMenu = () => {
  const [selectedPerson, setSelectedPerson] = useState("DAMEN");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const isMobileMenuOpen = useSelector((state) => state.ui.isMobileMenuOpen);
  const dispatch = useDispatch();

  // DISABLE SCROLLING WHEN MOBILE MENU IS OPEN
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    handlePersonSelect("DAMEN");
  }, []);

  const handlePersonSelect = (person) => {
    setIsAnimating(false);
    setSelectedPerson(person);
    setSelectedCategory(null);

    setTimeout(() => {
      setIsAnimating(true);
    }, 100);
  };

  return isMobileMenuOpen ? (
    <>
      {/* BRIGHTENED BACKGROUND */}
      <div
        id="bg-field"
        className="w-full h-full top-0 left-0 bg-[rgba(255,255,255,0.6)] absolute"
        onClick={() => dispatch(toggleMobileMenu())}
      />

      {/* MOBILE MENU FIELD */}
      <div
        id="ham-field"
        className="w-[80%] h-[calc(100svh-17vw)] flex flex-col top-[17vw] bg-white left-0 absolute z-20 overflow-y-auto scrollbar-hide">
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
              {person}
            </button>
          ))}
        </div>

        {/* CATEGORIES */}
        <div className="flex-grow">
          {selectedCategory ? (
            <SubCategories
              selectedCategory={selectedCategory.name}
              setSelectedCategory={setSelectedCategory}
              selectedPerson={selectedPerson}
            />
          ) : (
            <Categories
              setSelectedCategory={setSelectedCategory}
              isAnimating={isAnimating}
            />
          )}
        </div>

        {/* FEATURED CATEGORIES */}
        <ul className="bg-[#D0D0D0]">
          {featuredCategories.map((category, index) => (
            <li
              key={index}
              className="w-full text-[4vw] flex justify-between py-[4vw] px-[5vw] border-b-customBorder">
              <Link to={category.path}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  ) : null;
};

export default MobileMenu;
