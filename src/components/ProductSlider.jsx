import { Link } from "react-router-dom";
import SingleProduct from "./SingleProduct";
// SLIDER
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// REDUX
import { setSelectedProduct } from "../features/products/productsSlice";
import { useDispatch } from "react-redux";

const ProductSlider = ({ products }) => {
  const dispatch = useDispatch();

  return (
    <Swiper
      className="w-full"
      spaceBetween={5}
      slidesPerView={2}
      centeredSlides={true}
      loop={true}
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      modules={[Pagination]}>
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <Link
            to={`/store/${product.id}`}
            onClick={() => dispatch(setSelectedProduct(product))}>
            <SingleProduct product={product} />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSlider;
