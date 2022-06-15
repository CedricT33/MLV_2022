import { useState, useEffect } from "react";
import DataService from "../../services/DataService";
import SiteHeaderScroll from "./SiteHeaderScroll";
import SlideAccueil from "./SlideAccueil";
import SlideTarifs from "./SlideTarifs";
import SlidePhotos from "./SlidePhotos";
import SlideContact from "./SlideContact";
import SlideAcces from "./SlideAcces";
import SlideCG from "./SlideCG";
import SlideTemoignages from "./SlideTemoignages";
import SlideRecap from "./SlideRecap";
import SiteFooter from "./SiteFooter";
import { Loading, loader } from "../../services/LoaderService";
import { Popin } from "../../services/PopinService";


export default function MLV() {
  const [donnees, setDonnees] = useState([]);
  const Donnees = new DataService("all");


  function recupererToutesLesDonnees() {
    loader.show();
    Donnees.getAll().then(donnees => {
      setDonnees(donnees);
    }).catch(e => {
      // TODO : afficher popin erreur
    }).finally( () => {
      loader.hide();
    });
  }

  useEffect(() => {
    recupererToutesLesDonnees();
  }, []);

  return (
    <div>
      <SiteHeaderScroll></SiteHeaderScroll>
      <SlideAccueil></SlideAccueil>
      <SlideTarifs donnees={donnees}></SlideTarifs>
      <SlidePhotos donnees={donnees}></SlidePhotos>
      <SlideContact></SlideContact>
      <SlideAcces></SlideAcces>
      <SlideCG donnees={donnees}></SlideCG>
      <SlideTemoignages donnees={donnees}></SlideTemoignages>
      <SlideRecap></SlideRecap>
      <SiteFooter></SiteFooter>
      <Popin/>
      <Loading/>
    </div>
  );
}