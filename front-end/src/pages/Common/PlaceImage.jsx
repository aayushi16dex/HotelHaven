
export default function PlaceImage({ place, index = 0 }) {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!place.photos?.length) {
        return '';
    }

    return (
        <img className="w-64 h-36 object-cover" src={`${apiUrl}/uploads/${place.photos[index]}`} alt="" />
    )
} 