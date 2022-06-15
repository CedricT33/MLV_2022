import Formule from "./Formule"

export default function Formules({ formules, setIdFormules }) {
    if (formules === undefined) return null
    return (
        <tbody>
            {formules.map(formule => {
                return <Formule key={formule._id} formule={formule} setIdFormules={setIdFormules} />
            })}
        </tbody>
    );
}