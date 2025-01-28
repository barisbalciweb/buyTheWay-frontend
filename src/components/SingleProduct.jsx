import { Link } from "react-router-dom";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { calculateDiscountedPrice } from "../utils/calculateDiscountedPrice";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  inWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";
import { toggleLoginModal } from "../features/ui/uiSlice";

const SingleProduct = ({ item }) => {
  const dispatch = useDispatch();

  // GLOBAL STATES
  const { isAuthenticated } = useSelector((state) => state.auth);

  const { id, name, price, images, brand, discountPercentage } = item.product;

  const isInWishlist = useSelector((state) => inWishlist(state, item.product));

  const productTitle = brand + " " + name;

  const handleAddToWishlist = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      dispatch(toggleLoginModal());
      return;
    }

    isInWishlist
      ? dispatch(removeFromWishlist(id))
      : dispatch(addToWishlist(item.product));
  };

  return (
    <Link to={`/store/product/${id}`} className="relative block">
      <FontAwesomeIcon
        icon={isInWishlist ? faHeartSolid : faHeartRegular}
        className={`text-[6vw] absolute right-[2vw] top-[2vw] z-10 ${
          isInWishlist && "text-red-500"
        }`}
        onClick={handleAddToWishlist}
      />
      <div className="relative">
        <img
          className="bg-productImgBg"
          src={images[0].url}
          alt={images[0].alt}
        />
        {discountPercentage > 0 && (
          <p className="text-[4vw] text-customOrange font-bold absolute top-[1vw] left-[1vw]">
            -{discountPercentage}%
          </p>
        )}
      </div>
      <div>
        <h3 className="text-[4vw]">
          {productTitle.length > 20
            ? productTitle.slice(0, 18) + "..."
            : productTitle}
        </h3>
        <div className="flex gap-[1vw] text-[3.5vw]">
          <p className={`${discountPercentage > 0 && "line-through"}`}>
            {price}€
          </p>
          {discountPercentage > 0 && (
            <p className="text-customOrange font-bold">
              {calculateDiscountedPrice(price, discountPercentage)}€
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SingleProduct;
