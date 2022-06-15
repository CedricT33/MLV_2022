import SiteHeader from "./SiteHeader";
import SitePresentation from "./SitePresentation";

export default function SlideAccueil() {

  
  return (
    <div id="Slide1">
      <div className="imagebg"></div>
      <SiteHeader></SiteHeader>
      <SitePresentation></SitePresentation>
    </div>
  );
}