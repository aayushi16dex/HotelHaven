import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './HomeStyle.css'

export default function Home() {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true); // State for loading status
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        axios.get('/account/places').then(response => {
            setPlaces([...response.data]);
            setLoading(false); // Set loading to false after places are fetched
        });
    }, []);

    return (
        <>
            <div className="mt-5 text-xl justify-center flex">
                "Unlocking the world one hotel at a time - empowering users to choose their dream destinations for unforgettable stays."
            </div>
            <div className="mt-5 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {/* Conditionally render loader or places */}
                {loading ? (
                    <>
                       
  <h1 class="head1">
    <span class="let1 loader">l</span>  
    <span class="let2 loader">o</span>  
    <span class="let3 loader">a</span>  
    <span class="let4 loader">d</span>  
    <span class="let5 loader">i</span>  
    <span class="let6 loader">n</span>  
    <span class="let7 loader">g</span>  
  </h1>
                    </>
                ) : (
                    places.length > 0 && places.map(place => (
                        <Link to={'/account/viewPlace/' + place._id} key={place}>
                            <div className="mb-2 bg-gray-500 rounded-2xl ">
                                {place.photos?.[0] && (
                                    <img className="rounded-2xl object-cover aspect-square" src={`${apiUrl}/uploads/${place.photos[0]}`} />
                                )}
                            </div>
                            <h3 className="font-semibold">{place.address}</h3>
                            <h3 className="text-sm truncate text-gray-500 ">{place.title}</h3>
                            <h3><span className="font-semibold"> &#8377; {place.price} </span> per night</h3>
                        </Link>
                    ))
                )}
            </div>
        </>
    );
}
