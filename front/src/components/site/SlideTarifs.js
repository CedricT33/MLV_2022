import React from "react";
import { Navigation, A11y, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SlideProduits from "./SlideProduits";
import SlideFormules from "./SlideFormules";

export default function SlideTarifs({donnees}) {

  const categoriesTriees = donnees?.categories?.sort((a,b) => a.ordre_affichage - b.ordre_affichage);
  const produitsTriees = donnees?.produits?.sort((a,b) => a.ordre_affichage - b.ordre_affichage);
  const formulesTriees = donnees?.formules?.sort((a,b) => a.ordre_affichage - b.ordre_affichage);

  const slidesProduits = categoriesTriees?.filter(cat => cat.nom !== "Formules")
    .map(categorie => {
      const produitsCategorie = produitsTriees?.filter(produit => {
        return produit.categorie === categorie.nom;
      })
      return (
        <SwiperSlide key={categorie._id}>
          <SlideProduits produits={produitsCategorie} categorie={categorie}/>
        </SwiperSlide>
      )
    }
  );

  const slideFormules = categoriesTriees?.filter(cat => cat.nom === "Formules")
    .map(categorie => {
      return (
        <SwiperSlide key={categorie._id}>
          <SlideFormules formules={formulesTriees} categorie={categorie}/>
        </SwiperSlide>
      )
    }
  );

  return (
    <div id="Slide2">
      <div className="imagebg"></div>
      <h1><span>Nos</span>Tarifs</h1>
      <Swiper
        modules={[Navigation, A11y, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
      >
      {slideFormules}
      {slidesProduits}
      </Swiper>
    </div>
  );
}