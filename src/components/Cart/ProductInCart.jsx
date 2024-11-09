import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Counter from "./Counter";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  inWishlist,
  removeFromWishlist,
} from "../../features/wishlist/wishlistSlice";

const ProductInCart = ({ item }) => {
  const { id, name, price, images } = item.item;

  const dispatch = useDispatch();

  const isInWishlist = useSelector((state) => inWishlist(state, id));

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    isInWishlist
      ? dispatch(removeFromWishlist(id))
      : dispatch(addToWishlist(id));
  };

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
        <div className="flex items-center gap-[3vw]">
          <Counter item={item} />
          <FontAwesomeIcon
            icon={isInWishlist ? faHeartSolid : faHeartRegular}
            className={`text-[7vw] ${isInWishlist && "text-red-500"}`}
            onClick={handleAddToWishlist}
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
