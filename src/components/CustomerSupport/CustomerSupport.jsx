import {
  faPaperPlane,
  faRectangleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

// REDUX
import { useDispatch } from "react-redux";
import { sendMessage } from "../../features/customerSupport/customerSupportSlice";
import { set } from "lodash";

const suggestions = [
  "Wann wird meine Bestellung geliefert?",
  "Wie kann ich meine Bestellung stornieren?",
  "Wie kann ich meine Bestellung zurücksenden?",
];

const CustomerSupport = () => {
  const dispatch = useDispatch();

  // LOCAL STATES
  const [typing, setTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedSuggestion, setSelectedSuggestion] = useState("");

  useEffect(() => {
    if (selectedSuggestion) {
      dispatch(sendMessage(selectedSuggestion));
      setSelectedSuggestion("");
    }
  }, [selectedSuggestion]);

  const handleSubmit = () => {
    dispatch(sendMessage(inputValue));
  };

  return (
    <section className="w-[80%] h-[85%] bg-orange-100 flex flex-col items-center justify-center fixed bottom-0 right-0 z-50">
      {/* MESSAGES FIELD */}
      <div className="w-full h-[90%] p-[2vw] text-[4vw] relative">
        <div className="w-full h-full flex flex-col justify-center items-center bg-white p-[4vw]">
          {/* SUGGESTIONS FIELD */}
          <div className="w-full flex flex-col justify-center items-center gap-[2vw] absolute bottom-0 p-[4vw]">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="w-full h-[10%] bg-[rgba(0,0,0,0.1)] p-[2vw] cursor-pointer"
                onClick={(e) => setSelectedSuggestion(e.target.innerText)}>
                {suggestion}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* INPUT FIELD */}
      <div className="w-full h-[15%] flex justify-center items-center bg-orange-400 gap-[1vw] p-[2vw]">
        <input
          value={inputValue}
          type="text"
          className="w-full h-full p-[2vw] rounded md"
          placeholder="deine Nachricht"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="w-[15vw] h-full bg-gray-400 rounded-md"
          onClick={handleSubmit}>
          <FontAwesomeIcon icon={faPaperPlane} className="w-full text-[8vw]" />
        </button>
      </div>
      <FontAwesomeIcon
        icon={faRectangleXmark}
        className="text-[7vw] absolute right-[2vw] top-[2vw]"
      />
    </section>
  );
};

export default CustomerSupport;
