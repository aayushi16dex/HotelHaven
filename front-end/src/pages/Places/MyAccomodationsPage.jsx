import { Link } from "react-router-dom";
import AccountNav from "../Account/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PlacesPage() {
    
    const [places, setPlaces] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        axios.get('account/user-places').then(({data}) => {
            setPlaces(data);
        })
    },[]);

    

    // The empty array [] passed as second argument to 
    // the useEffect hook means that the effect should 
    // only run once, immediately after the component is 
    // mounted.

    return (
        <div>
            <AccountNav/>
                <div className="text-center">
                    <Link to={'/account/places/new'} className=" inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full -mt-14">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new place
                    </Link>
                </div>

                <div className="mt-8 w-3/4 mx-auto"> 
                    {places.length > 0 && places.map(place => (
                        <Link to={'/account/places/' + place._id} key={place} className="flex mb-8 gap-4 shadow-xl border-t-2 p-4 rounded-2xl">
                            <div className="flex w-32 h-32 bg-gray-500 shrink-0 rounded-full">
                                {place.photos.length && (
                                    <img className="object-cover w-32 h-32 shadow-xl rounded-full " src={`${apiUrl}/uploads/${place.photos[0]}`} alt=""/>
                                )}
                            </div>

                            <div className="grow-0 shrink">
                                <h2 className="text-xl">{place.title}</h2>
                                <h3 className="flex gap-3 font-extralight text-base -mb-3">
                                    <div>{place.address}</div>
                                    <div className="text-sm">| </div>
                                    <div>{place.type}</div>
                                </h3>
                                <hr className="border border-gray-300 my-4 leading-3 " />
                                <p className="text-sm -mt-1">{place.description}</p>
                            </div>
                        </Link>
                    ))}
                   
                </div>
        </div>
    );
}