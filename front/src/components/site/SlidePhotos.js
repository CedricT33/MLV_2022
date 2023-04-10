import React from "react";
import { Navigation, A11y, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function SlidePhotos({donnees}) {

  const photosTriees = donnees?.photos?.sort((a,b) => a.ordre_affichage - b.ordre_affichage);

  const slidesPhotos = photosTriees?.map(photo => {
    return (
      <SwiperSlide key={photo._id}>
        <div>
          <h2>{photo.nom}</h2>
          <div><img alt={photo.nom} src={photo.url} /></div>
        </div>
      </SwiperSlide>
    )
  });
  
  return (
    <div id="Slide3">
      <div className="imagebg"></div>
      <h1><span>P</span>hotos</h1>
      <Swiper
          modules={[Navigation, A11y, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation
        >
        {slidesPhotos}
      </Swiper>
    </div>
  );
}