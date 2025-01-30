import {
  faFacebook,
  faSquareInstagram,
  faSquareWhatsapp,
  faTiktok,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { accordion } from "../data/data";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ScrollToTop from "../components/ScrollTop";

const icons = [
  { importName: faTiktok },
  { importName: faFacebook },
  { importName: faSquareInstagram },
  { importName: faSquareWhatsapp },
  { importName: faTwitter },
];

const Footer = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const location = useLocation();

  // CLOSE ACCORDION ON ROUTE CHANGE
  useEffect(() => {
    setOpenIndex(null);
  }, [location]);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <footer className="mt-[12vw]">
      <ScrollToTop />
      {/* FOOTER TOP */}
      <section id="footer-top" className="flex flex-col items-center">
        {accordion.map((el, index) => (
          <div key={index} className="w-full">
            <button
              className={`w-full flex justify-between border-b-customBorder py-[4vw] px-[2vw] ${
                openIndex === index ? "text-customOrange font-bold" : ""
              }`}
              onClick={() => toggleAccordion(index)}>
              {/* ACCORDION HEADER */}
              <p className="text-[4vw]">{el.title}</p>
              <FontAwesomeIcon
                className="text-[4vw]"
                icon={openIndex === index ? faAngleUp : faAngleDown}
              />
            </button>

            {openIndex === index && (
              <div className={"max-h-[200px] overflow-y-auto bg-gray-100"}>
                {/* ACCORDION CONTENT */}
                <p className="text-[4vw] p-[4vw]">{el.content}</p>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* FOOTER BOTTOM */}
      <section
        id="footer-bottom"
        className="flex flex-col items-center gap-[4vw] bg-[#585858] py-[6vw] text-white">
        <section className="flex flex-col justify-center">
          <div className="flex flex-col gap-[1vw]">
            <p className="font-bold text-[3vw]">Follow us:</p>
            <div className="flex gap-[7vw] text-[10vw]">
              {icons.map((icon, index) => (
                <FontAwesomeIcon
                  key={index}
                  className="text-[7vw]"
                  icon={icon.importName}
                />
              ))}
            </div>
          </div>
        </section>
        <ul className="flex justify-center items-center gap-[5vw] font-bold text-white text-[4vw]">
          <li>AGB</li>
          <li>Datenschutz</li>
          <li>Impressum</li>
        </ul>
        <small className="text-[3vw]">
          © 2024 Barış Balcı. Alle Rechte vorbehalten.
        </small>
      </section>
    </footer>
  );
};

export default Footer;
