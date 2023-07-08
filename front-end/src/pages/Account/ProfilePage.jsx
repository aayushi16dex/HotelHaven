import { useContext } from "react";
import { UserContext } from "../../UserContext";
import { useState } from "react";
import {Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "../Places/MyAccomodationsPage";
import AccountNav from "./AccountNav";

export default function AccountPage() {
    const apiUrl = import.meta.env.VITE_API_URL
    const { ready, user, setUser } = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);
    let { subpage } = useParams();  //hook

    if (subpage === undefined) {
        subpage = 'profile';
    }

    if (!ready) {
        return 'Loading......';
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }

    async function logout() {
        await axios.post('/auth/logout');
        setRedirect('/');
        setUser(null);
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
           <AccountNav/>
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
            
                   {user.gender === 'male' && (
                        <img className="h-44 mx-auto -mt-6 mb-3 " src={`${apiUrl}/uploads/maleUser.jpg`} alt="" />
                    )}
                    {user.gender === 'female' && (
                        <img className="h-44 mx-auto -mt-6 mb-3 border-gray-500" src={`${apiUrl}/uploads/femaleUser.jpg`}  alt="" />
                    )}
             
                
                    Logged in as {user.username} ({user.email})<br />
                    
                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                </div>
            )}

            {subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    );
}