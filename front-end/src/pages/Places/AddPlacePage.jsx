import Perks from "../PlacePerks/Perks";
import PhotosUploader from "./PhotosUploader";
import axios from "axios";
import { differenceInCalendarDays } from 'date-fns'
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../Account/AccountNav";

export default function AddPlacePage() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(0);
    const [errors, setErrors] = useState({});
    const [redirect, setRedirect] = useState(false);

    let numOfNights = 0;

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/account/place/' + id).then(response => {
            const data = response.data.placeDoc;
            setTitle(data.title);
            setType(data.type);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        })
    }, [])

  
    const validateForm = () => {
        const errors = {};
        if (checkIn && checkOut) {
            numOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
        }
    
        // Required fields
        if (title === "" || type === "" || address === "" || addedPhotos === "" ||
            description === "" || checkIn === "" ||
            checkOut === "" || maxGuests === "" || price === "") {
            errors.display = "All fields are required";
        }

        else if (price === 0) {
            errors.display = "Price cannot be 0"
        }

        setErrors(errors);
        
        // Return true if there are no errors
        return Object.keys(errors).length === 0;
    }

    async function savePlace(e) {
        e.preventDefault();

        if (validateForm()) {
            let placeData = {
                title, type, address, addedPhotos,
                description, perks, checkIn,
                checkOut, maxGuests, price
            }
            if (id) {
                //update
                try {
                    await axios.put('/account/updatePlace', {
                        id, ...placeData
                    });
                    setRedirect(true);
                }
                catch (e) {
                    console.log(e);
                }
            }
            else {
                // add
                try {
                    await axios.post('/account/addPlace', placeData);
                    setRedirect(true);
                }
                catch (e) {
                    console.log(e);
                }
            }
        }
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <>
            <div>
                <AccountNav />
                <form onSubmit={savePlace} className="border border-gray-300 rounded-xl p-6 border-x-2 border-y-2 mx-44">
                    <h2 className="text-lg ml-2 mt-4">Title</h2>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Add a catchy title" />


                    <h2 className="text-lg ml-2 mt-4">Address</h2>
                    <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address of the place" />

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <h2 className="text-lg ml-2 mt-4">Type</h2>
                            <input type="text" value={type} onChange={e => setType(e.target.value)} placeholder="Type of place: villa, cottage" />
                        </div>
                        <div>
                            <h2 className="text-lg ml-2 mt-4">Price per night</h2>
                            <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
                        </div>
                    </div>

                    <h2 className="text-lg ml-2 mt-4">Photos</h2>
                    <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                    <h2 className="text-lg ml-2 mt-4">Description</h2>
                    <textarea type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Add some description about the place" />

                    <h2 className="text-lg ml-2 mt-4">Perks</h2>
                    <p className="text-gray-500 text-sm ml-4">Select all perks of the place</p>
                    <div className=" mt-2 ml-4 grid gap-2 grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        <Perks selected={perks} onChange={setPerks} />
                    </div>

                    <h2 className="text-lg ml-2 mt-4">Check in & out time</h2>
                    <div className="grid grid-cols-3 ml-4 gap-9">
                        <div>
                            <h3 className="mt-2 mb-1 ml-2">Check-in time</h3>
                            <input type="time" value={checkIn} onChange={e => setCheckIn(e.target.value)} placeholder="10:00" />
                        </div>

                        <div>
                            <h3 className="mt-2 mb-1 ml-2">Check-out time</h3>
                            <input type="time" value={checkOut} onChange={e => setCheckOut(e.target.value)} placeholder="10:00" />
                        </div>

                        <div>
                            <h3 className="mt-2 mb-1 ml-2">Max number of guests</h3>
                            <input type="number" value={maxGuests} onChange={e => setMaxGuests(e.target.value)} placeholder="Maximum guests" />
                        </div>
                    </div>

                    {errors.display && <div className="text-red-500 mt-2 -mb-2 ml-2">{errors.display}</div>}

                    <div className="justify-center">
                        <button className="primary my-4 ">Save</button>
                    </div>
                </form>
            </div>
        </>
    );
}