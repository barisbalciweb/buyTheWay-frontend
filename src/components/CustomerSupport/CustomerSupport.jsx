import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  addMessageToSS,
  getMessagesFromSS,
  sendMessage,
} from "../../features/customerSupport/customerSupportSlice";
import { toggleSupportWindow } from "../../features/ui/uiSlice";

const suggestions = [
  "Wann wird meine Bestellung geliefert?",
  "Wie kann ich meine Bestellung stornieren?",
  "Wie kann ich meine Bestellung zurücksenden?",
];

const CustomerSupport = () => {
  const dispatch = useDispatch();
  const messagesFieldRef = useRef();

  // LOCAL STATES
  const [typing, setTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [suggestionsVisible, setSuggestionsVisible] = useState(true);

  // GLOBAL STATES
  const { messagesFromSS } = useSelector((state) => state.customerSupport);
  const { isSupportWindowOpen } = useSelector((state) => state.ui);

  useEffect(() => {
    // GET MESSAGES FROM SESSION STORAGE
    dispatch(getMessagesFromSS());
  }, []);

  useEffect(() => {
    // HIDE SUGGESTIONS IF MESSAGES AREN'T EMPTY
    if (messagesFromSS.length > 1) {
      setSuggestionsVisible(false);
      console.log(messagesFromSS.length > 0);
    }
  }, [messagesFromSS]);

  useEffect(() => {
    // AUTO SCROLL TO BOTTOM
    if (messagesFieldRef?.current) {
      const messagesFieldDiv = messagesFieldRef.current;
      messagesFieldDiv.scrollTop = messagesFieldDiv.scrollHeight;
    }
  }, [messagesFromSS]);

  const handleSuggestionSelection = (suggestion) => {
    // ADD SUGGESTION TO STATE FOR RENDERING
    dispatch(addMessageToSS({ content: suggestion, role: "customer" }));
    // ADD SUGGESTION TO SESSION STORAGE FOR PERSISTENCE
    dispatch(sendMessage({ content: suggestion, role: "customer" }));
    setInputValue("");
    setSuggestionsVisible(false);
  };

  // SEND MESSAGE TO CUSTOMER SUPPORT
  const handleSubmit = () => {
    if (inputValue.trim()) {
      // ADD MESSAGE TO STATE FOR RENDERING
      dispatch(addMessageToSS({ content: inputValue, role: "customer" }));
      // ADD MESSAGE TO SESSION STORAGE FOR PERSISTENCE
      dispatch(sendMessage({ content: inputValue, role: "customer" }));
      setInputValue("");
    }
  };

  return isSupportWindowOpen ? (
    <section className="w-[82%] h-[75vh] bg-white flex flex-col fixed bottom-0 right-0 z-[3] rounded-tl-md shadow-2xl">
      {/* HEADER */}
      <div className="w-full bg-gray-900 p-[2vw] flex justify-between items-center rounded-tl-md">
        <h2 className="text-gray-100 text-[4vw]">Kundensupport</h2>
        <button
          onClick={() => dispatch(toggleSupportWindow())}
          className="flex justify-center items-center text-gray-300 p-2">
          <FontAwesomeIcon icon={faXmark} className="text-[7vw]" />
        </button>
      </div>

      {/* MESSAGES FIELD */}
      <div
        ref={messagesFieldRef}
        className="w-full h-[85%] p-[2vw] text-[3.5vw] relative bg-gray-50 overflow-y-auto">
        <div className="w-full h-full flex flex-col p-[3vw]">
          {/* RENDER MESSAGES */}
          {messagesFromSS &&
            messagesFromSS.length > 0 &&
            messagesFromSS.map((message, index) => (
              <div
                key={index}
                className={`w-full flex ${
                  message.role === "customer" ? "justify-end" : "justify-start"
                } mb-[2vw]`}>
                <div
                  className={`max-w-[80%] p-[2vw] ${
                    message.role === "customer"
                      ? "bg-gray-900 text-white rounded-2xl rounded-br-none"
                      : "bg-white text-gray-800 rounded-2xl rounded-bl-none border border-gray-200"
                  } shadow-sm`}>
                  {message.content}
                </div>
              </div>
            ))}

          {/* SUGGESTIONS FIELD */}
          {suggestionsVisible && (
            <div className="w-full flex flex-col gap-[1.5vw] absolute bottom-0 left-0 p-[3vw] bg-white border-t border-gray-100">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="w-full bg-white p-[2vw] rounded-lg cursor-pointer border border-gray-200 flex items-center"
                  onClick={() => handleSuggestionSelection(suggestion)}>
                  <span className="text-gray-700">{suggestion}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* INPUT FIELD */}
      <div className="w-full h-[18%] flex justify-center items-center bg-white border-t border-gray-200 gap-[1.5vw] px-[2vw] py-[4vw]">
        <input
          value={inputValue}
          type="text"
          className="w-full h-full px-[2vw] rounded-lg border border-gray-200 focus:outline-none focus:border-customOrange bg-gray-50"
          placeholder="Ihre Nachricht..."
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="w-[15vw] h-full text-gray-300 bg-gray-900 hover:bg-gray-800 active:bg-gray-700 transition-colors rounded-lg flex items-center justify-center"
          onClick={handleSubmit}>
          <FontAwesomeIcon icon={faPaperPlane} className="text-[7vw]" />
        </button>
      </div>
    </section>
  ) : (
    <button
      className="w-[16vw] h-[16vw] rounded-full bg-[rgba(0,0,0,0.8)] fixed right-[3vw] bottom-[3vw] cursor-pointer z-[2] flex items-center justify-center shadow-lg"
      onClick={() => dispatch(toggleSupportWindow())}>
      <FontAwesomeIcon icon={faComments} className="text-white text-[8vw]" />
    </button>
  );
};

export default CustomerSupport;
