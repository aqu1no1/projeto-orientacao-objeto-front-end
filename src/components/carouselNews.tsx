import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

type CarouselNewsItem = {
  id: number;
  imagem: string;
};

type CarouselNewsProps = {
  itens: CarouselNewsItem[];
};

export default function CarouselNews({ itens }: CarouselNewsProps) {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={3}
      centeredSlides={true}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      breakpoints={{
        320: {
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
      {itens.map((item) => (
        <SwiperSlide key={item.id}>
          <div className="rounded overflow-hidden shadow w-full h-[1000px]">
            <img
              src={item.imagem}
              className="w-full h-full object-contain"
              alt=""
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
