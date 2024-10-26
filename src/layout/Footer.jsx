import {
  faFacebook,
  faSquareInstagram,
  faSquareWhatsapp,
  faTiktok,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// STYLES
const liStyle = "w-[95%] flex justify-between border-b-[0.5vw] py-[4vw]";
const footTopIconStyle = "text-[4vw]";
const footBotIconStyle = "text-[7vw]";
const pStyle = "text-[4vw]";

const liTitles = [
  "Über uns",
  "Kontakt",
  "Versand und Lieferung",
  "Zahlungsarten",
  "Rücksendungen und Umtausch",
];

const icons = [
  { importName: faTiktok },
  { importName: faFacebook },
  { importName: faSquareInstagram },
  { importName: faSquareWhatsapp },
  { importName: faTwitter },
];

const Footer = () => {
  return (
    <footer className="mt-[20vw]">
      {/* FOOTER TOP */}
      <section id="footer-top">
        <ul className="flex flex-col items-center">
          {liTitles.map((title) => (
            <li key={title} className={liStyle}>
              <p className={pStyle}>{title}</p>
              <FontAwesomeIcon
                className={footTopIconStyle}
                icon={faAngleDown}
              />
            </li>
          ))}
        </ul>
      </section>

      {/* FOOTER BOTTOM */}
      <section
        id="footer-bottom"
        className="flex flex-col items-center gap-[4vw] bg-[#585858] py-[6vw] text-white">
        <section className="flex flex-col justify-center">
          <div className="flex flex-col gap-[1vw]">
            <p className="font-bold text-[3vw]">Follow us:</p>
            <div className="flex gap-[7vw] text-[10vw]">
              {icons.map((icon, i) => (
                <FontAwesomeIcon
                  key={i}
                  className={footBotIconStyle}
                  icon={icon.importName}
                />
              ))}
            </div>
          </div>
        </section>
        <ul className="flex justify-center items-center gap-[4vw] font-bold text-white text-[3vw]">
          <li>AGB</li>|<li>Datenschutz</li>|<li>Impressum</li>
        </ul>
        <small className="text-[2vw]">
          © 2024 Barış Balcı. Alle Rechte vorbehalten.
        </small>
      </section>
    </footer>
  );
};

export default Footer;
