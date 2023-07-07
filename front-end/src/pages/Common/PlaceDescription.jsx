import DisplayPerks from "../PlacePerks/DisplayPerks";
export default function PlaceDescription({ place }) {
    return (
        <>
            <div className="mx-40">

                {/* Place description */}
                <div className="my-4 ">
                    <h2 className="font-semibold text-2xl mb-2">About this place</h2>
                    <p className=" flex text-justify justify-center text-gray-600">{place.description}</p>
                </div>

                <hr className="mb-3" />

                {/* Place perks */}
                <div className="my-4 ">
                    <h2 className="font-semibold text-2xl mb-2">What this place offers</h2>

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  ">
                        {place?.perks?.length > 0 && place.perks.map(perk => (
                            <div className="">
                                <DisplayPerks perk={perk} />
                            </div>
                        ))}
                    </div>
                </div>

                <hr className="mb-3" />

                {/* Accommodation details */}
                <div className="my-4">
                    <h2 className="font-semibold text-2xl mb-2">Accommodation Details</h2>
                    <div className="text-gray-600 ml-2">
                        <div className="flex flex-row w-96">
                            <div className="w-1/2 font-semibold">Check-in: </div>
                            <div className="w-1/2">{place.checkIn} </div>
                        </div>

                        <div className="flex flex-row w-96">
                            <div className="w-1/2 font-semibold">Check-out: </div>
                            <div className="w-1/2">{place.checkOut} </div>
                        </div>

                        <div className="flex flex-row w-96">
                            <div className="w-1/2 font-semibold">Max number of guests: </div>
                            <div className="w-1/2">{place.maxGuests} </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}