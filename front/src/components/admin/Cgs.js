import Cg from "./Cg"

export default function Cgs({ cgs, setIdCgs }) {
    if (cgs === undefined) return null
    return (
        <tbody>
            {cgs.map(cg => {
                return <Cg key={cg._id} cg={cg} setIdCgs={setIdCgs} />
            })}
        </tbody>
    );
}