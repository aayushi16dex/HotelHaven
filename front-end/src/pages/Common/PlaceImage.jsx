
export default function PlaceImage({place, index=0, className=null }){
    if (!place.photos?.length){
        return '';
    }

    return (
        <img className={className} src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${place.photos[index]}`} alt="" />
    )
}