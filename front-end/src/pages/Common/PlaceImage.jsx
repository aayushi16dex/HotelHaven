
export default function PlaceImage({place, index=0, className=null }){
    if (!place.photos?.length){
        return '';
    }

    return (
        <img className={className} src={"http://localhost:5000/uploads/" + place.photos[index]} alt="" />
    )
}