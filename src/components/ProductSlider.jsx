import SingleProduct from "./SingleProduct";
// SLIDER
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ProductSlider = ({ products }) => {
  return (
    <Swiper
      className="w-full"
      spaceBetween={5}
      navigation={true}
      slidesPerView={2}
      loop={true}
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      modules={[Navigation, Pagination]}>
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <SingleProduct product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSlider;
