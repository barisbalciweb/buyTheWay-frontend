import {
  faArrowRightLong,
  faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { toggleSort } from "../../features/ui/uiSlice";

const sortOptions = [
  "Beliebtheit",
  "Preis aufsteigend",
  "Preis absteigend",
  "Neueste zuerst",
  "Älteste zuerst",
  "Bewertung",
  "Name A-Z",
  "Name Z-A",
  "Verfügbarkeit",
  "Rabatt",
  "Empfohlen",
  "Meistverkauft",
];

const Sort = () => {
  const dispatch = useDispatch();

  return (
    <section className="w-full h-full max-h-[100svh] overflow-y-auto flex flex-col gap-[5vw] bg-white fixed top-0 left-0 z-20 p-[5vw]">
      <button
        className="flex items-center gap-[2vw] text-[5vw]"
        onClick={() => dispatch(toggleSort())}>
        <FontAwesomeIcon
          icon={faCircleArrowLeft}
          className="font-bold text-customOrange pb-[0.5vw]"
        />
        <p>Sort</p>
      </button>

      <div className="flex flex-col">
        {sortOptions.map((option) => (
          <div
            key={option}
            className="flex items-center border-b-customBorder border-black">
            <button className="w-full text-start py-[4vw]">{option}</button>
            <FontAwesomeIcon icon={faArrowRightLong} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Sort;
