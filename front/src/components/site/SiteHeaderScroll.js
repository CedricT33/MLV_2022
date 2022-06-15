export default function SiteHeaderScroll() {

  //---------BARRE MENU APPARAIT A 500PX---------//
  window.onscroll = (ev) => {
      if(window.pageYOffset > 500) {
          document.getElementById('headerScroll').classList.add("visible");
          document.getElementById('headerScroll').classList.remove("invisible");
      } else {
          document.getElementById('headerScroll').classList.remove("visible");
          document.getElementById('headerScroll').classList.add("invisible");
      }
  };
  
  return (
    <header id="headerScroll" className="invisible">
        <nav>
          <ul>
            <li><a href="#Slide1">Accueil</a></li>
            <li><a href="#Slide2">Tarifs</a></li>
            <li><a href="#Slide3">Photos</a></li>
            <li><a href="#Slide4">Contact</a></li>
            <li><a href="#Slide5">Acces-plan</a></li>
            <li><a href="#Slide6">Conditions générales</a></li>
          </ul>
        </nav>
    </header>
  );
}