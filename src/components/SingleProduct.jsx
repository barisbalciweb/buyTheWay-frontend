import { Link } from "react-router-dom";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  inWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";

//! product doesnt contain any size property
const SingleProduct = ({ product }) => {
  const { id, name, price, images, brand } = product;

  const productTitle = brand + " " + name;

  // const { selectedProduct } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const isInWishlist = useSelector((state) => inWishlist(state, product));

  const handleAddToWishlist = (e) => {
    console.log(product);

    e.preventDefault();
    isInWishlist
      ? dispatch(removeFromWishlist(product))
      : //! the problem is her, size is missing
        dispatch(addToWishlist(product));
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
      <img
        className="bg-productImgBg"
        src={images[0].url}
        alt={images[0].alt}
      />
      <div>
        <h3 className="text-[4vw]">
          {productTitle.length > 20
            ? productTitle.slice(0, 18) + "..."
            : productTitle}
        </h3>
        <p className="text-[3.5vw]">{price}€</p>
      </div>
    </Link>
  );
};

export default SingleProduct;
