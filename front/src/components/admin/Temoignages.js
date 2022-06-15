import Temoignage from "./Temoignage"

export default function Temoignages({ temoignages, setIdTemoignages }) {
    if (temoignages === undefined) return null
    return (
        <tbody>
            {temoignages.map(temoignage => {
                return <Temoignage key={temoignage._id} temoignage={temoignage} setIdTemoignages={setIdTemoignages} />
            })}
        </tbody>
    );
}