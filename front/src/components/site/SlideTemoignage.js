export default function SlideTemoignage({ temoignage }) {

  const photo = temoignage?.url_photo.length !== 0 ? <img alt='' src={temoignage.url_photo}/> : <div>{temoignage.nom[0]}</div>;

  return (
    <div className="temoignage">
      <div className="photo-temoignage">{photo}</div>
      <div className="nom-temoignage">{temoignage.nom}</div>
      <div className="texte-temoignage">{temoignage.texte}</div>
    </div>
  );
}