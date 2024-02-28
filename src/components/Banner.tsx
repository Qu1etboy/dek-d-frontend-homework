import Link from "next/link";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination, Navigation } from "swiper/modules";

type Banner = {
  id: number;
  image: string;
  link: string;
};

type BannerProps = {
  banners: Banner[];
};

export default function Banner(props: BannerProps) {
  const { banners } = props;

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
      {banners.map((banner, idx) => (
        <SwiperSlide key={banner.id}>
          <Link target="_blank" href={banner.link}>
            <Image src={banner.image} alt={`banner image ${idx + 1}`} fill />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
