import Photo from "./Photo"

export default function Photos({ photos, setIdPhotos }) {
    if (photos === undefined) return null
    return (
        <tbody>
            {photos.map(photo => {
                return <Photo key={photo._id} photo={photo} setIdPhotos={setIdPhotos} />
            })}
        </tbody>
    );
}