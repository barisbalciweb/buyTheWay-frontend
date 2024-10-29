import Slider from "react-slick";
import SingleProduct from "./SingleProduct";

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
        <SingleProduct key={product.productId} product={product} />
      ))}
    </Slider>
  );
};

export default ProductSlider;
