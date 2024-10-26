import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

const ProductSlider = ({ fakeProductData }) => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    // centerMode: true,
    // centerPadding: "8%",
  };

  return (
    <Slider {...settings}>
      {fakeProductData.map((product) => (
        <Link
          to={`store/${product.productId}`}
          key={product.productId}
          className="relative bg-productImgBg">
          <FontAwesomeIcon
            icon={faHeart}
            className="text-[5vw] absolute z-10 top-[1vw] right-[1vw]"
          />
          <img className="w-full" src={product.img} alt={product.productName} />
          <div>
            <h3 className="text-[4vw]">{product.productName}</h3>
            <p className="text-[3.5vw]">{product.price}€</p>
          </div>
        </Link>
      ))}
    </Slider>
  );
};

export default ProductSlider;
