import Categorie from "./Categorie"

export default function Categories({ categories, setIdCategories }) {
    if (categories === undefined) return null
    return (
        <tbody>
            {categories.map(categorie => {
                return <Categorie key={categorie._id} categorie={categorie} setIdCategories={setIdCategories} />
            })}
        </tbody>
    );
}