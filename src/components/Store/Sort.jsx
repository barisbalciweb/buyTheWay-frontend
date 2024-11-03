import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sortOptions } from "../../data/data";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { toggleSort } from "../../features/ui/uiSlice";
import { setSortOption } from "../../features/sort/sortSlice";

const Sort = () => {
  const sortOption = useSelector((state) => state.sort.sortOption);
  const dispatch = useDispatch();

  const handleSorting = (option) => {
    dispatch(toggleSort());
    dispatch(setSortOption(option));
  };

  return (
    <section className="w-full h-full max-h-[100svh] overflow-y-auto flex flex-col gap-[5vw] bg-white fixed top-0 left-0 z-20 p-[5vw]">
      {/* NAVIGATION */}
      <button
        className="flex items-center gap-[2vw] text-[5vw]"
        onClick={() => dispatch(toggleSort())}>
        <FontAwesomeIcon
          icon={faCircleArrowLeft}
          className="font-bold text-customOrange pb-[0.5vw]"
        />
        <p>Sort</p>
      </button>

      {/* SORT OPTIONS */}
      <ul className="flex flex-col">
        {sortOptions.map((option) => (
          <li key={option} className="flex items-center">
            <button
              className="w-full text-start py-[4vw]"
              onClick={() => handleSorting(option)}>
              {option}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Sort;
