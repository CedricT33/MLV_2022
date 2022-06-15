import React from "react";
import ListeCGs from "./ListeCGs";

export default function SlideCG({donnees}) {

  const conditionsTriees = donnees?.cgs?.sort((a,b) => a.ordre_affichage - b.ordre_affichage);
  
  return (
    <div id="Slide6">
      <div className="imagebg"></div>
      <h1><span>Conditions</span>Générales</h1>
      <p>
        <span>La prise en charge de tout le matériel implique l'acceptation</span>
        <span>des conditions générales suivantes.</span>
        <span>Ces dernières sont portées à la connaissance du client</span>
        <span>à la signature du devis ou du bon de commande.</span>
      </p>
      <ListeCGs conditions={conditionsTriees}></ListeCGs>
    </div>
  );
}