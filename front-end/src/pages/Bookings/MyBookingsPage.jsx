import { useEffect, useState } from "react";
import AccountNav from "../Account/AccountNav"
import axios from "axios";
import PlaceImage from "../Common/PlaceImage";
import { Link } from "react-router-dom";
import BookingInfo from "./BookingInfo";


export default function MybookingsPage() {
    const [bookings, setbookings] = useState([]);
    useEffect(() => {
        axios.get('account/bookings').then(response => {
            setbookings(response.data);
        })
    }, []);
    return (
        <div>
            <AccountNav />
            <div>
                {bookings.length === 0 && (
                    <div>
                        <div className="text-center">
                            <h1 className="text-2xl mb-5">No hotels booked yet!</h1>
                            <h3 className="text-lg">Unleash your wanderlust and set your sights on new horizons.</h3>
                            <h3 className="text-lg">It's time to plan your next epic adventure!</h3>
                        </div>
                        <Link to={'/account/places'} >
                            <button className="px-7 py-2 text-base flex gap-2 justify-center mx-auto mt-12 border-primary bg-primary text-white rounded-3xl">
                                <div className="text-lg"> Search hotels</div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-lg mt-0.5">
                                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                )}
                
                {bookings?.length > 0 && bookings.map(booking => (

                    <Link to={'/account/bookings/' + booking._id} className="mb-6 flex gap-4 shadow-md mx-40 border rounded-2xl overflow-hidden">
                        <div className="flex w-64 h-36 bg-gray-500 shrink-0">
                            {booking.placeId.photos.length && (
                                <PlaceImage place={booking.placeId} />
                            )}
                        </div>

                        <div className="py-3 pr-3 grow -mb-4">
                            <h2 className="text-lg font-semibold">{booking.placeId.title}</h2>

                            <div className="flex gap-1 border-b  border-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mt-1 ">
                                    <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                                </svg>

                                <h3 className="text-sm font-extralight">{booking.placeId.address}</h3>
                            </div>
                            <BookingInfo booking={booking} />
                        </div>

                        <div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}