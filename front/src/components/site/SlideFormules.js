import ListeFormules from "./ListeFormules";

export default function SlideFormules({ formules, categorie }) {

  const infoPrix = formules.length !== 0 ? (
    <div id="infoPrix">
      <div>Prix unitaire / pers</div>
      <div>HT</div>
      <div>TTC</div>
    </div>
  ) : null;

  const descriptions = categorie.description.split("/").map(description => {
    return <li key={description}>{description}</li>
  });

  return (
    <div>
      <h2>{categorie.nom}</h2>
      {infoPrix}
      <ListeFormules formules={formules}/>
      <ul className="description">{descriptions}</ul>
    </div>
  );
}