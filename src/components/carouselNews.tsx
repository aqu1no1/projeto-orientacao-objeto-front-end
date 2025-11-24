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
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
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
