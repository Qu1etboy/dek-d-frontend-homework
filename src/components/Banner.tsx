import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination, Navigation } from "swiper/modules";

type BannerProps = {
  images: string[];
};

export default function Banner(props: BannerProps) {
  const { images } = props;

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      breakpoints={{
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
    >
      {images.map((image) => (
        <SwiperSlide key={image}>
          <img src={image} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
