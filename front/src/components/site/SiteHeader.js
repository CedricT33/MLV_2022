export default function SiteHeader() {


  const clicHamburger = (elmt) => {
    const nav = elmt.target.nextElementSibling;
    const presentation = document.getElementById("presentation");
    const lis = Array.from(document.getElementById('Slide1').getElementsByTagName('li'));
    const as = Array.from(document.getElementById('Slide1').getElementsByTagName('a'));
    nav.classList.toggle('active');
    presentation.classList.toggle('active');
    lis.forEach(li => {
      li.classList.toggle('active');
    });
    as.forEach(a => {
      a.classList.toggle('active');
    });
  }
  
  return (
    <header>
      <div id="menu-nav-clic" onClick={clicHamburger}></div>
      <div className="menu-nav">
        <i></i><i></i><i></i>
      </div>
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