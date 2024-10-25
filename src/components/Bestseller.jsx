import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import produktImg from "../assets/images/Jacke.png";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const fakeProduktData = [
  { produktName: "Jacke", price: 99.99, img: produktImg },
  { produktName: "Jacke", price: 99.99, img: produktImg },
  { produktName: "Jacke", price: 99.99, img: produktImg },
  { produktName: "Jacke", price: 99.99, img: produktImg },
];

const Bestseller = () => {
  return (
    <div>
      <div className="w-[150vw] flex gap-[3vw]">
        {fakeProduktData.map((produkt) => (
          <div className="flex flex-col gap-[2vw] relative">
            <FontAwesomeIcon
              icon={faHeart}
              className="text-[5vw] absolute z-10 top-[1vw] right-[1vw]"
            />
            <img
              className="w-[40vw] bg-[#FAF8F6]"
              src={produkt.img}
              alt={produkt.produktName}
            />
            <div>
              <h3 className="text-[4vw]">{produkt.produktName}</h3>
              <p className="text-[3.5vw]">{produkt.price}€</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bestseller;
