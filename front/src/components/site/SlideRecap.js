import {Link} from 'react-router-dom';

export default function SlideRecap() {

  
  return (
    <div id="Slide8">
      <div className="adresse">
        <div><span>M</span>agali <span>L</span>ocation <span>V</span>aisselle</div>
        <div>
          <div>rue de la briqueterie</div>
          <div>60190 Moyenneville</div>
          <div>(proche Estrées St Denis)</div>
        </div>
      </div>
      <div className="reseaux-sociaux">
        <a href='mailto:maglv@free.fr' className="mail"><span className='offscreen'>Mail de MLV</span></a>
        <a href='https://www.facebook.com/mlvaisselle/' className="facebook"><span className='offscreen'>Facebook de MLV</span></a>
        <a href='https://www.mariages.net/decoration-mariage/magali-location-vaisselle--e11271' className="coeur"><span className='offscreen'>Mariage point net</span></a>
      </div>
      <div className="tel">
        <div><span>Tel</span> : 03.44.42.35.69</div>
        <div><span>Portable</span> : 06.61.40.30.75</div>
        <div><span>E mail</span> : maglv@free.fr</div>
      </div>
    </div>
  );
}