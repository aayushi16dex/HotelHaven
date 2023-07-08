import { useState } from "react";

const firstImg = {
    height: '20rem',
    width: '35rem'
};

const restImg = {
    height: '9.8rem',
    width: '19rem'
};

export default function PlaceGallery({ place }) {

    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    if (showAllPhotos) {
        return (
            <div>
                <div className="absolute bg-white pb-72 top-0 right-0 left-0 min-h-full min-w-screen">
                    <div className="p-8 grid gap-4">
                        <h2 className="text-3xl flex gap-2 justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mt-2">
                                <path fillRule="evenodd" d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z" clipRule="evenodd" />
                            </svg>
                            Photos of {place.title}
                        </h2>
                        <button onClick={() => setShowAllPhotos(false)} className="fixed left-4 top-28 flex rounded-full p-1 bg-white hover:bg-gray-100" >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-3 mx-60 md:grid-cols-1 sm:grid-cols-1">
                        {place?.photos?.length > 0 && place.photos.map(photo => (
                            <div >
                                <img style={firstImg} src={`${apiUrl}/uploads/${photo}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="mx-40">
                {/* Place images */}
                {/* first column is assigned twice the width of second column. */}
                <div onClick={() => setShowAllPhotos(true)} className="cursor-pointer gap-2 grid lg:grid-cols-[2fr_1fr] md:grid-cols-[2fr_1fr] sm:grid-cols-[2fr_1fr]  mt-3">

                    {place.photos?.[0] && (
                        <img style={firstImg} className="object-cover rounded-s-2xl" src={`${apiUrl}/uploads/${place.photos[0]}`} />
                    )}
                    <div className="relative">

                        <div style={restImg} className="flex bg-gray-500 shrink-0 mb-2">
                            {place.photos?.[1] && (
                                <img style={restImg} className="object-cover rounded-se-2xl" src={`${apiUrl}/uploads/${place.photos[1]}`} />
                            )}
                        </div>

                        <div style={restImg} className=" overflow-hidden flex bg-gray-500 shrink-0">
                            {place.photos?.[2] && (
                                <img style={restImg} className=" object-cover rounded-ee-2xl" src={`${apiUrl}/uploads/${place.photos[2]}`} />
                            )}
                        </div>
                        <button onClick={() => setShowAllPhotos(true)} className="flex gap-1 absolute bottom-3 right-3 rounded-md p-1 bg-white border-blue-950 border-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mt-1 text-gray-600">
                                <path d="M2 4.25A2.25 2.25 0 014.25 2h2.5A2.25 2.25 0 019 4.25v2.5A2.25 2.25 0 016.75 9h-2.5A2.25 2.25 0 012 6.75v-2.5zM2 13.25A2.25 2.25 0 014.25 11h2.5A2.25 2.25 0 019 13.25v2.5A2.25 2.25 0 016.75 18h-2.5A2.25 2.25 0 012 15.75v-2.5zM11 4.25A2.25 2.25 0 0113.25 2h2.5A2.25 2.25 0 0118 4.25v2.5A2.25 2.25 0 0115.75 9h-2.5A2.25 2.25 0 0111 6.75v-2.5zM15.25 11.75a.75.75 0 00-1.5 0v2h-2a.75.75 0 000 1.5h2v2a.75.75 0 001.5 0v-2h2a.75.75 0 000-1.5h-2v-2z" />
                            </svg>
                            Show all photos
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
}