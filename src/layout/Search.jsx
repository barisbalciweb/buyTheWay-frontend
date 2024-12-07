import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
// REDUX
import { toggleSearch } from "../features/ui/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSearchResults,
  fetchSearchResults,
} from "../features/search/searchSlice";
import { Link, useNavigate } from "react-router-dom";
import { setSelectedProductId } from "../features/products/productsSlice";

const Search = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const navigate = useNavigate(null);

  // LOCAL STATES
  const [inputValue, setInputValue] = useState("");

  // GLOBAL STATES
  const { isSearchOpen } = useSelector((state) => state.ui);
  const { searchResults, status } = useSelector((state) => state.search);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // SEND INPUT VALUE TO BACKEND
  useEffect(() => {
    let timeout;
    if (inputValue !== "") {
      timeout = setTimeout(() => {
        dispatch(fetchSearchResults(inputValue));
      }, 1000);
    } else {
      dispatch(clearSearchResults());
    }
    return () => clearTimeout(timeout);
  }, [inputValue]);

  const handleProductSelection = (e, id) => {
    e.preventDefault();
    dispatch(setSelectedProductId(id));
    navigate(`/store/product/${id}`);
  };

  return (
    <div className="w-full h-full flex-col bg-white fixed top-header z-40">
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
      <div className="w-full flex flex-col justify-center items-center">
        <ul className="w-[80%]">
          {searchResults &&
            searchResults.map((result) => (
              <li key={result?.id}>
                <button onClick={(e) => handleProductSelection(e, result?.id)}>
                  {result?.brand + " " + result?.name}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;
