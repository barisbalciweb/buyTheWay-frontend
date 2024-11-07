import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Counter from "./Counter";

const ProductInCart = ({ product }) => {
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
    <div className="flex relative">
      <img
        className="w-[40%] bg-productImgBg"
        src={images[0].url}
        alt={images[0].alt}
      />
      <div>
        <h3 className="text-[4vw]">{name}</h3>
        <p className="text-[3.5vw]">{price}€</p>
        <Counter />
      </div>
    </div>
  );
};

export default ProductInCart;
