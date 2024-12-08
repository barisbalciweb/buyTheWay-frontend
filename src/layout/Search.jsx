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
import { ClipLoader } from "react-spinners";

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
      }, 1000);
    } else {
      dispatch(clearSearchResults());
    }
    return () => clearTimeout(timeout);
  }, [inputValue]);

  const handleSearchResults = () => {
    dispatch(fetchSearchResults(inputValue));
    navigate("/store?search=true");
  };

  return (
    <div
      id="search-main-div"
      className="w-full h-full fixed top-header z-40 px-[5vw] bg-white">
      {/* SEARCH INPUT */}
      <div
        id="search-input-div"
        className="w-full flex flex-col justify-center items-end gap-[4vw] mt-[4vw]">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-[7vw] font-bold">Suche</h1>
          <FontAwesomeIcon
            icon={faXmark}
            className="text-[8vw]"
            onClick={() => dispatch(toggleSearch())}
          />
        </div>
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
        className="w-full h-[calc(100%-17vw-12vw)] py-[5vw] overflow-y-auto">
        <ul className="w-full flex flex-col justify-center gap-[3vw]">
          {
            // IF LOADING, SHOW SPINNER
            isLoading ? (
              <div className="w-full h-full flex justify-center items-center">
                <ClipLoader size={"20vw"} className="" />
              </div>
            ) : // ELSE IF RESULTS NOT EMPTY, LIST THEM
            searchList.length > 0 ? (
              searchList.map((result) => (
                <li key={result?.id}>
                  <Link to={`/store/product/${result?.id}`}>
                    {result?.brand + " " + result?.name}
                  </Link>
                </li>
              ))
            ) : (
              // ELSE, SHOW THE FEEDBACK TEXT
              <p>{inputValue === "" ? "" : "Kein Produkt gefunden"}</p>
            )
          }
        </ul>
      </div>
    </div>
  );
};

export default Search;
