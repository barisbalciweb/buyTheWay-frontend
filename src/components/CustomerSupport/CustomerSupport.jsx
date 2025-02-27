import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { BeatLoader } from "react-spinners";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  addMessageToSS,
  deleteMessagesFromSS,
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
  const [popUpVisible, setPopUpVisible] = useState(false);

  // GLOBAL STATES
  const { messagesFromSS } = useSelector((state) => state.customerSupport);
  const { isSupportWindowOpen } = useSelector((state) => state.ui);
  const { status } = useSelector((state) => state.customerSupport.messageSent);

  useEffect(() => {
    // GET MESSAGES FROM SESSION STORAGE ON COMPONENT MOUNT
    dispatch(getMessagesFromSS());
  }, [isSupportWindowOpen]);

  useEffect(() => {
    // AUTO SCROLL TO BOTTOM WHEN NEW MESSAGE IS ADDED
    scrollToBottom();
    // HIDE SUGGESTIONS IF MESSAGES AREN'T EMPTY
    if (messagesFromSS.length > 1) setSuggestionsVisible(false);
    // WAIT FOR STATE CHANGE FOR TYPING STATUS AND SCROLL TO BOTTOM AGAIN
    const timeout = setTimeout(() => {
      scrollToBottom();
    }, 100);

    return () => clearTimeout(timeout);
  }, [messagesFromSS]);

  // UPDATE TYPING STATUS
  useEffect(() => {
    setTyping(status === "loading");
  }, [status]);

  const scrollToBottom = () => {
    if (messagesFieldRef?.current) {
      const messagesFieldDiv = messagesFieldRef.current;
      messagesFieldDiv.scrollTop = messagesFieldDiv.scrollHeight;
    }
  };

  const sendMessageHelper = (message, type) => {
    // ADD MESSAGE TO STATE FOR RENDERING
    dispatch(addMessageToSS({ content: message, role: "customer" }));
    // ADD MESSAGE TO SESSION STORAGE FOR PERSISTENCE
    dispatch(sendMessage({ content: message, role: "customer" }));
    setInputValue("");
    if (type === "suggestion") setSuggestionsVisible(true);
  };

  const handleSuggestionSelection = (suggestion) => {
    sendMessageHelper(suggestion, "suggestion");
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      sendMessageHelper(inputValue, "input");
    }
  };

  const handleEndChat = () => {
    setPopUpVisible(false);
    setSuggestionsVisible(true);
    dispatch(toggleSupportWindow());
    dispatch(deleteMessagesFromSS());
  };

  return isSupportWindowOpen ? (
    <section className="w-[82%] h-[75vh] flex flex-col fixed bottom-0 right-0 z-[3] rounded-tl-md shadow-2xl">
      {/* HEADER */}
      <div className="w-full h-[18vw] bg-gray-900 p-[2vw] flex justify-between items-center rounded-tl-md relative">
        <h2 className="text-gray-100 text-[4vw]">Kundensupport</h2>
        {messagesFromSS.length > 1 && (
          <button
            onClick={() => setPopUpVisible(true)}
            className="flex justify-center bg-red-700 items-center text-[3vw] text-gray-50 p-2">
            Chat beenden
          </button>
        )}
        <button
          onClick={() => dispatch(toggleSupportWindow())}
          className="flex justify-center items-center text-gray-300">
          <FontAwesomeIcon icon={faChevronDown} className="text-[7vw]" />
        </button>
      </div>

      {/* MESSAGES FIELD */}
      <div
        ref={messagesFieldRef}
        className="w-full h-[85%] p-[2vw] text-[3.5vw] relative bg-gray-50 overflow-y-auto">
        <div className="w-full h-full flex flex-col justify-start items-center p-[3vw]">
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
                      ? "bg-gray-900 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                  } break-words rounded-2xl shadow-sm`}>
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
          {typing && <BeatLoader color="#000" size={10} className="mt-[4vw]" />}
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

      {/* POPUP */}
      {popUpVisible && (
        <div className="w-full h-full absolute flex justify-center items-center bg-[rgba(0,0,0,0.8)]">
          <div className="w-full flex flex-col gap-[4vw] justify-center items-center bg-gray-50 p-[5vw] text-[4.5vw]">
            <p className="text-center">
              Möchten Sie den Chat wirklich beenden?
            </p>
            <div className="flex gap-[4vw] text-gray-50">
              <button className="bg-red-700 p-[3vw]" onClick={handleEndChat}>
                Beenden
              </button>
              <button
                className="bg-black p-[3vw] text-gray-50"
                onClick={() => setPopUpVisible(false)}>
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}
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
