import man from "../../assets/images/hero-man.jpg";
import woman from "../../assets/images/hero-woman.jpg";

// SLIDER
import "swiper/css";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const HeroSlider = () => {
  return (
    <Swiper
      className="!w-full !h-full absolute top-0 left-0"
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}>
      <SwiperSlide>
        <img
          className="h-full w-full object-cover brightness-[0.8]"
          src={woman}
          alt="hero-woman"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img className="h-full w-full object-cover" src={man} alt="hero-man" />
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroSlider;
