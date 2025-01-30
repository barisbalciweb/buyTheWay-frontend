// SLIDER
import "swiper/css";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useState } from "react";

const HeroSlider = () => {
  const [secondSlideLoaded, setSecondSlideLoaded] = useState(false);

  return (
    <Swiper
      className="!w-full !h-full absolute top-0 left-0"
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      onSlideChange={({ realIndex }) => {
        if (!secondSlideLoaded && realIndex === 1) setSecondSlideLoaded(true);
      }}>
      <SwiperSlide>
        <img
          className="h-full w-full object-cover brightness-[0.8]"
          src={"/images/hero-woman.webp"}
          alt="hero-woman"
          fetchpriority="high"
        />
      </SwiperSlide>
      <SwiperSlide>
        {/* ONLY LOAD SECOND SLIDE WHEN IT IS VISIBLE */}
        {secondSlideLoaded && (
          <img
            className="h-full w-full object-cover"
            src={"/images/hero-man.webp"}
            alt="hero-man"
          />
        )}
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroSlider;
