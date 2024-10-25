import {
  faFacebook,
  faSquareInstagram,
  faSquareWhatsapp,
  faTiktok,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer>
      <section id="footer-top">
        <ul>
          <li>Über uns</li>
          <li>Kontakt</li>
          <li>Versand und Lieferung</li>
          <li>Zahlungsarten</li>
          <li>Rücksendungen und Umtausch</li>
        </ul>
      </section>
      <section
        id="footer-bottom"
        className="flex flex-col items-center gap-[4vw] bg-[#585858] py-[6vw] text-white">
        <section className="flex flex-col justify-center">
          <div>
            <p className="font-bold text-[3vw]">Follow us:</p>
            <div className="flex gap-[5vw] text-[10vw]">
              <FontAwesomeIcon className="w-[7vw]" icon={faTiktok} />
              <FontAwesomeIcon className="w-[7vw]" icon={faFacebook} />
              <FontAwesomeIcon className="w-[7vw]" icon={faSquareInstagram} />
              <FontAwesomeIcon className="w-[7vw]" icon={faSquareWhatsapp} />
              <FontAwesomeIcon className="w-[7vw]" icon={faTwitter} />
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
