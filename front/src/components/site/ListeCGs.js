import CG from "./CG";

export default function ListeCGs({ conditions }) {

  if (conditions?.length === 0) return <div className="noProduit">Pas de conditions générales.</div>

  return (
    <ul>
      {conditions?.map(condition => {
        return (
          <CG key={condition._id} condition={condition} />
        )
      })}
    </ul>
  );
}