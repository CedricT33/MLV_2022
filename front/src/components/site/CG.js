export default function CG({ condition }) {

  const paragraphe = condition.paragraphe.split("/").map(ligne => {
    return <span key={ligne}>{ligne}</span>
  });

  const titre = <h3><span>{condition.titre[0]}</span>{condition.titre.replace(/^./, "")}</h3>

  return (
    <>
    <li className="condition">
      {titre}
      <p>{paragraphe}</p>
    </li>
    </>
  );
}