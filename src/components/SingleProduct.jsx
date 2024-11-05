import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SingleProduct = ({ product }) => {
  const {
    id,
    name,
    description,
    category,
    brand,
    price,
    discoundPercentage,
    sizes,
    availableSizes,
    colors,
    images,
    material,
    careInstructions,
    stock,
    soldCount,
  } = product;

  return (
    <div className="relative">
      <FontAwesomeIcon
        icon={faHeart}
        className="text-[5vw] absolute z-10 top-[1vw] right-[1vw]"
      />
      <img
        className="w-full bg-productImgBg"
        src={images[0].url}
        alt={images[0].alt}
      />
      <div>
        <h3 className="text-[4vw]">{name}</h3>
        <p className="text-[3.5vw]">{price}€</p>
      </div>
    </div>
  );
};

export default SingleProduct;
