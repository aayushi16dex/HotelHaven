import { Routes, Route } from "react-router-dom"
import './App.css'
import Home from './pages/Home'
import LoginPage from "./pages/LoginPage"
import Layout from "./Layout"
import RegisterPage from "./pages/RegisterPage"
import ProfilePage from './pages/Account/ProfilePage'
import axios from "axios"
import {UserContextProvider} from "./UserContext"
import MyAccomodationsPage from "./pages/Places/MyAccomodationsPage"
import AddPlacePage from "./pages/Places/AddPlacePage"
import ViewPlacePage from "./pages/Places/ViewPlacePage"
import MyBookingsPage from "./pages/Bookings/MyBookingsPage"
import ViewBookingPage from "./pages/Bookings/ViewBookingPage"

// back-end url
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials = true;

function App() {
  
  return (
    <UserContextProvider>
      <Routes> 
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<MyAccomodationsPage />} />
          <Route path="/account/places/new" element={<AddPlacePage />} />
          <Route path="/account/places/:id" element={<AddPlacePage />} />
          <Route path="/account/viewPlace/:id" element={<ViewPlacePage />} />
          <Route path="/account/bookings" element={<MyBookingsPage />} />
          <Route path="/account/bookings/:id" element={<ViewBookingPage/>}/>
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
