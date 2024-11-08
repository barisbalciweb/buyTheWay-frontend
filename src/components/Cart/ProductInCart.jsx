import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Counter from "./Counter";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ProductInCart = ({ item }) => {
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
  } = item.item;

  return (
    <div className="flex relative m-[4vw] gap-[2vw]">
      <img
        className="w-[40%] bg-productImgBg"
        src={images[0].url}
        alt={images[0].alt}
      />
      <div className="flex flex-col justify-between">
        <h3 className="text-[5vw]">{name}</h3>
        <div>
          <p className="text-[4vw]">
            <b>Preis:</b> {price} €
          </p>
          <p className="text-[4vw]">
            <b>Größe:</b> {item.size}
          </p>
        </div>
        <div className="flex gap-[3vw]">
          <Counter item={item} />
          <FontAwesomeIcon
            className="flex justify-center items-center text-[7vw]"
            icon={faHeart}
          />
        </div>
      </div>
      <FontAwesomeIcon
        className="text-[5vw] text-gray-600 absolute z-10 top-0 right-0"
        icon={faTrash}
      />
    </div>
  );
};

export default ProductInCart;
