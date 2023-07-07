import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PlaceAddress from "../Common/PlaceAddress"
import PlaceGallery from "../Photos/PlaceGallery";
import PlaceDescription from "../Common/PlaceDescription";
import BookingInfo from "./BookingInfo";
import AccountNav from "../Account/AccountNav";

export default function ViewBookingPage() {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    useEffect(() => {
        if (id) {
            axios.get('account/bookings').then(response => {
                const findBooking = response.data.find(({ _id }) => _id === id);
                if (findBooking) {
                    setBooking(findBooking);
                }
            })
        }
    }, [id]);

    if (!booking) {
        return '';
    }
    return (
        <>
        <AccountNav/>
        <div className="mx-auto -mt-5">
            <div className="my-4 ">
                <h2 className="font-semibold text-2xl mb-2 mx-40">My Booking Information</h2>
                <div className="mx-40">
                    <BookingInfo booking={booking} />
                </div>
            </div>
            <hr className="mb-3 mx-40" />
            {/* Place title */}
            <h2 className="text-2xl mx-40 mt-2 font-semibold">{booking.placeId.title}</h2>
            <PlaceAddress place={booking.placeId} className={"mx-40"} />
            <PlaceGallery place={booking.placeId} />
            <PlaceDescription place={booking.placeId} />
        </div>
        </>
    );
}