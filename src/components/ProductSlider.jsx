import SingleProduct from "./SingleProduct";
// SLIDER
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ProductSlider = ({ products }) => {
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
          <SingleProduct product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSlider;
