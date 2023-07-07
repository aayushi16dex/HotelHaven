import { differenceInCalendarDays } from 'date-fns'
import { Navigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios'

export default function BookingComponent({ place }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numOfGuests, setNumOfGuests] = useState(1);
    const [redirect, setRedirect] = useState('');
    let numOfNights = 0;
    let CheckInDate = 0;


    if (checkIn && checkOut) {
        numOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
        CheckInDate = differenceInCalendarDays(new Date(checkIn), new Date());
    }


    async function bookingPlace() {
        if (checkIn === "" || checkOut === "" ) {
            alert("Fill the booking details!");
        }
        else if (numOfNights < 0){
            alert("Oops! Dates Mismatch: Check-in > Check-out");
        }
        else if (CheckInDate < 0){
            alert("Oops! Check-in Date has passed");
        }
        else {
            const data = {
                checkIn, checkOut, numOfGuests,
                placeId: place._id,
                totalPrice: numOfNights * place.price * numOfGuests
            };
            const response = await axios.post('/account/bookingPlace', data);
            const bookingId = response.data._id;
            setRedirect('/account/bookings/' + bookingId);
        }
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className="bg-white shadow-lg p-4 rounded-2xl h-fit max-w-2xl md:mx-auto">
            <div className="text-2xl text-center">
                Price:  &#8377; {place.price} / per night
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className="py-3 px-4">
                        <label className='mr-3'>Check in:</label>
                        <input type="date"
                            value={checkIn}
                            onChange={e => setCheckIn(e.target.value)} />
                    </div>
                    <div className="py-3 px-4 border-t">
                        <label className='mr-3'>Check out:</label>
                        <input type="date"
                            value={checkOut}
                            onChange={e => setCheckOut(e.target.value)} />
                    </div>
                </div>

                <div className="py-3 px-4 border-t">
                    <label>Number of guests:</label>
                    <input type="number"
                        value={numOfGuests}
                        onChange={e => setNumOfGuests(e.target.value)} />
                </div>
            </div>

            <button onClick={bookingPlace} className="bg-primary mt-4 w-full rounded-2xl p-2 text-lg font-semibold text-white">
                Book this place
                {numOfNights > 0 && (
                    <span> for &#8377; {numOfNights * numOfGuests * place.price}</span>
                )}
            </button>
        </div>
    );
}