import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
// REDUX
import { toggleSearch } from "../features/ui/uiSlice";
import { useDispatch, useSelector } from "react-redux";

const Search = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();

  // LOCAL STATES
  const [inputValue, setInputValue] = useState("");

  // GLOBAL STATES
  const { isSearchOpen } = useSelector((state) => state.ui);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="w-full h-full flex justify-center bg-white fixed top-header z-40">
      <div className="w-full h-[12vw] flex justify-center items-center gap-[5vw]">
        <input
          ref={inputRef}
          value={inputValue}
          id="search-input"
          type="text"
          placeholder="Suche..."
          className="w-[80%] h-full indent-[4vw] border border-black outline-customOrange rounded-sm"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <FontAwesomeIcon
          icon={faXmark}
          className="text-[8vw]"
          onClick={() => dispatch(toggleSearch())}
        />
      </div>
    </div>
  );
};

export default Search;
