import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const SingleProduct = ({ product }) => {
  return (
    <Link to={`store/${product.productId}`} className="relative">
      <FontAwesomeIcon
        icon={faHeart}
        className="text-[5vw] absolute z-10 top-[1vw] right-[1vw]"
      />
      <img
        className="w-full bg-productImgBg"
        src={product.img}
        alt={product.productName}
      />
      <div>
        <h3 className="text-[4vw]">{product.productName}</h3>
        <p className="text-[3.5vw]">{product.price}€</p>
      </div>
    </Link>
  );
};

export default SingleProduct;
