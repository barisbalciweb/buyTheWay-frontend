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
import { removeFromCart } from "../../features/cart/cartSlice";

const ProductInCart = ({ item }) => {
  const { id, name, price, images, brand } = item.item;

  const productTitle = brand + " " + name;

  const dispatch = useDispatch();
  const isInWishlist = useSelector((state) => inWishlist(state, item.item));

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    isInWishlist
      ? dispatch(removeFromWishlist(item.item))
      : dispatch(addToWishlist(item.item));
  };

  return (
    <div className="flex relative m-[4vw] gap-[2vw]">
      <img
        className="w-[40%] bg-productImgBg"
        src={images[0].url}
        alt={images[0].alt}
      />
      <div className="flex flex-col justify-between">
        <h3 className="text-[5vw]">{productTitle}</h3>
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

      {/* REMOVE ITEM FROM CART */}
      <button
        className="absolute z-10 top-0 right-0"
        onClick={() => dispatch(removeFromCart(id))}>
        <FontAwesomeIcon className="text-[5vw] text-gray-600" icon={faTrash} />
      </button>
    </div>
  );
};

export default ProductInCart;
