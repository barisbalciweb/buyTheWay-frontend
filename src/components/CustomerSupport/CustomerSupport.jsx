import {
  faPaperPlane,
  faRectangleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  addMessageToSS,
  getMessagesFromSS,
  sendMessage,
} from "../../features/customerSupport/customerSupportSlice";

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
  const [windowOpened, setWindowOpened] = useState(false);
  const [suggestionsVisible, setSuggestionsVisible] = useState(true);

  // GLOBAL STATES
  const { messagesFromSS } = useSelector((state) => state.customerSupport);

  useEffect(() => {
    // GET MESSAGES FROM SESSION STORAGE
    dispatch(getMessagesFromSS());
  }, []);

  const handleSuggestionSelection = (suggestion) => {
    dispatch(addMessageToSS({ content: suggestion, role: "customer" }));
    dispatch(sendMessage({ content: suggestion, role: "customer" }));
    setSuggestionsVisible(false);
  };

  // SEND MESSAGE TO CUSTOMER SUPPORT
  const handleSubmit = () => {
    if (inputValue.trim()) {
      dispatch(addMessageToSS({ content: inputValue, type: "customer" }));
      setInputValue("");
    }
  };

  return windowOpened ? (
    <section className="w-[80%] h-[85%] bg-orange-100 flex flex-col items-center justify-center fixed bottom-0 right-0 z-50">
      {/* MESSAGES FIELD */}
      <div className="w-full h-[90%] p-[2vw] text-[4vw] relative">
        <div className="w-full h-full flex flex-col items-center bg-white p-[4vw]">
          {/* RENDER MESSAGES */}
          {messagesFromSS &&
            messagesFromSS.length > 0 &&
            messagesFromSS.map((message, index) => (
              <div
                key={index}
                className={`w-full flex justify-end gap-[2vw] ${
                  message.type === "customer" ? "items-end" : "items-start"
                } `}>
                <p
                  className={`flex justify-center items-center w-[80%] p-[2vw] rounded-md ${
                    message.type === "customer" ? "bg-green-300" : "bg-blue-300"
                  } `}>
                  {message.content}
                </p>
              </div>
            ))}
          {/* SUGGESTIONS FIELD */}
          {suggestionsVisible && (
            <div className="w-full flex flex-col justify-center items-center gap-[2vw] absolute bottom-0 p-[4vw]">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="w-full h-[10%] bg-[rgba(0,0,0,0.1)] p-[2vw] cursor-pointer"
                  onClick={() => handleSuggestionSelection(suggestion)}>
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* INPUT FIELD */}
      <div className="w-full h-[15%] flex justify-center items-center bg-orange-400 gap-[1vw] p-[2vw]">
        <input
          value={inputValue}
          type="text"
          className="w-full h-full p-[2vw] rounded md"
          placeholder="deine Nachricht"
          //! this causes unnecessary re-renders (use react.memo)
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
        onClick={() => setWindowOpened(false)}
      />
    </section>
  ) : (
    <section
      className="w-[20vw] h-[20vw] rounded-full bg-[rgba(0,0,0,0.6)] fixed right-[3vw] bottom-[3vw] cursor-pointer z-50"
      onClick={() => setWindowOpened(true)}></section>
  );
};

export default CustomerSupport;
