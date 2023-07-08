import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PlaceGallery from "../Photos/PlaceGallery";
import PlaceAddress from "../Common/PlaceAddress";
import PlaceDescription from "../Common/PlaceDescription";
import BookingComponent from "../Bookings/BookingComponent";

export default function ViewPlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get("/account/place/" + id).then(response => {
            setPlace(response.data);
        });

    }, [id]);
    // runs it whenever id is changed

    return (
        <>
            {place ? (
                <div className="-mt-2 -mx-8 px-8 py-8 relative">

                    {/* Place title */}
                    <h1 className="text-2xl flex justify-center">{place.placeDoc.title}</h1>
                    <PlaceAddress place={place.placeDoc} className={"justify-center"} />
                    <div>
                        <PlaceGallery place={place.placeDoc} />

                        <div className="mt-8 gap-8 grid lg:grid-cols-[2fr_1fr] md:grid-cols-1">
                            <PlaceDescription place={place.placeDoc} />
                            <BookingComponent place={place.placeDoc} />
                        </div> 

                        <hr className="mb-3 mx-40 w-96" />

                        <div className="my-4 mx-40">
                            <h2 className="font-semibold text-2xl mb-5">Meet your host</h2>
                            {place.ownerGender === "male" && (
                                <div className="ml-3">
                                    <img className=" mb-3 h-32 w-32 pt-1 border-4 border-gray-500 rounded-full bg-white" src={`${apiUrl}/uploads/maleHost.png`} alt="user" />
                                    <p className=" flex text-gray-600"> Hosted by  {place.ownerName}</p>
                                </div>
                            )}


                            {place.ownerGender === "female" && (
                                <div className="ml-3">
                                    <img className=" mb-3 h-32 w-32 border-4 pt-2 border-gray-500 rounded-full" src={`${apiUrl}/uploads/femaleHost.jpg`} alt="user" />
                                    <p className=" flex text-gray-600"> Hosted by  {place.ownerName}</p>
                                </div>
                            )}

                        </div>

                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}