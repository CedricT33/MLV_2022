import Formule from "./Formule";

export default function ListeFormules({ formules }) {

  if (formules.length === 0) return <div className="noProduit">Pas de formules.</div>

  return (
    <ul>
      {formules.map(formule => {
        return (
          <Formule key={formule._id} formule={formule} />
        )
      })}
    </ul>
  );
}