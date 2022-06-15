import React from "react";
import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SlideTemoignage from "./SlideTemoignage";

export default function SlideTemoignages({donnees}) {

  const temoignagesTriees = donnees?.temoignages?.sort((a,b) => a.ordre_affichage - b.ordre_affichage);

  const slidesTemoignages = temoignagesTriees?.map(temoignage => {
    return (
      <SwiperSlide key={temoignage._id}>
        <SlideTemoignage temoignage={temoignage}/>
      </SwiperSlide>
    )
  });

  return (
    <div id="Slide7">
      <div className="imagebg"></div>
      <Swiper
          modules={[Navigation, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
        >
        {slidesTemoignages}
      </Swiper>
    </div>
  );
}