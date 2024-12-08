import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
// REDUX
import { toggleSearch } from "../features/ui/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSearchResults,
  fetchSearchList,
  fetchSearchResults,
} from "../features/search/searchSlice";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();

  // LOCAL STATES
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState("");

  // GLOBAL STATES
  const { searchList, searchListStatus } = useSelector((state) => state.search);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // LOADING SPINNER LOGIC - 1
  useEffect(() => {
    if (inputValue !== "") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [inputValue]);

  // LOADING SPINNER LOGIC - 2
  useEffect(() => {
    if (searchListStatus === "succeded" || searchListStatus === "failed") {
      setIsLoading(false);
    }
  }, [searchListStatus]);

  // SEND INPUT VALUE TO BACKEND
  useEffect(() => {
    let timeout;
    if (inputValue !== "") {
      timeout = setTimeout(() => {
        dispatch(fetchSearchList(inputValue));
      }, 300);
    } else {
      dispatch(clearSearchResults());
    }
    return () => clearTimeout(timeout);
  }, [inputValue]);

  const handleSearchResults = () => {
    dispatch(fetchSearchResults(inputValue));
    navigate("/store?search=true");
  };

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="font-bold text-customOrange">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div
      id="search-main-div"
      className="w-full h-full fixed top-header z-40 px-[5vw] bg-white">
      {/* SEARCH INPUT */}
      <div className="w-full h-[7vw] navigation-div flex justify-between items-center mt-[4vw]">
        <h1 className="text-[7vw] font-bold">Suche</h1>
        <FontAwesomeIcon
          icon={faXmark}
          className="text-[8vw]"
          onClick={() => dispatch(toggleSearch())}
        />
      </div>
      <div id="search-input-div" className="w-full gap-[4vw] mt-[4vw]">
        <div className="w-full flex justify-between items-center"></div>
        <label
          htmlFor="search-input"
          className="w-full h-[12vw] flex items-center justify-end relative">
          <input
            ref={inputRef}
            value={inputValue}
            id="search-input"
            type="text"
            placeholder="Wonach suchen Sie?"
            className="w-full h-full outline-0 rounded-full bg-gray-100 text-[4vw] pl-[4vw] pr-[18vw]"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div
            id="search-icons-div"
            className="h-full flex justify-between items-center gap-[2vw] mr-[4vw] absolute">
            {inputValue !== "" && (
              <FontAwesomeIcon
                icon={faXmark}
                className="text-[5vw]"
                onClick={() => setInputValue("")}
              />
            )}
            <FontAwesomeIcon
              className="text-[6vw]"
              icon={faMagnifyingGlass}
              onClick={handleSearchResults}
            />
          </div>
        </label>
      </div>

      {/* SEARCH RESULTS */}
      <div
        id="search-results-div"
        className="w-full h-[calc(100%-17vw-12vw-7vw-4vw-4vw-5vw)] pb-[5vw] mt-[5vw] overflow-y-auto">
        <ul className="w-full flex flex-col justify-center gap-[3vw]">
          {
            // IF LOADING, SHOW SPINNER
            isLoading ? (
              <div className="w-full h-full flex justify-center items-center">
                <BeatLoader size={"2vw"} />
              </div>
            ) : // ELSE IF RESULTS NOT EMPTY, LIST THEM
            searchList.length > 0 ? (
              searchList.map((result) => (
                <li key={result?.id}>
                  <Link to={`/store/product/${result?.id}`}>
                    {highlightMatch(
                      result?.brand + " " + result?.name,
                      inputValue
                    )}
                  </Link>
                </li>
              ))
            ) : (
              // ELSE, SHOW THE FEEDBACK TEXT
              <p className="text-center">
                {inputValue === "" ? "" : "Kein Produkt gefunden"}
              </p>
            )
          }
        </ul>
      </div>
    </div>
  );
};

export default Search;
