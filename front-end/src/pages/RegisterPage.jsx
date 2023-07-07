import axios from "axios"
import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext"

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [errors, setErrors] = useState({});
    const [redirect, setRedirect] = useState(false);

    const handleGender = (event) => {
        setGender(event.target.value);
    }

    const validateForm = () => {
        const errors = {};

        // required fields
        if (!username || !email || !password || !gender ){
            errors.display = "All fields are required";
        }

        // Validate username
        else if (username.length < 3) {
            errors.username = "Username should be at least 3 characters long";
        }

        // Validate email
        else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is invalid";
        }

        // Validate password
        else if (password.length < 8) {
            errors.password = "Password should be at least 8 characters long";
        }
        setErrors(errors);
        // Return true if there are no errors
        return Object.keys(errors).length === 0;
    }

    async function registerUser(e) {
        e.preventDefault(); //prevents reloading of page

        if (validateForm()) {
            try {
                await axios.post("/auth/register", {
                    username,
                    email,
                    password,
                    gender
                });
                alert("Registration successful! \nLogin to continue!");
                setRedirect(true);
            }
            catch (e) {
                if (e.response.data.msg === "Email has already been registered"){
                    alert("Email already registered! \nTry to login!");
                    setRedirect(true);
                }
                else{
                    alert("Registration failed!")
                }
            }
        }
    }

    if (redirect) {
        return <Navigate to={'/login'} />
    }

    return (
        <div className="mt-4 grow flex items-center justify-around ">
            <div className="border border-gray-300 rounded-xl p-6 border-x-2 border-y-2">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-xs mx-auto" onSubmit={registerUser}>
                    <input type="text"
                        placeholder="Username"
                        value={username}
                        onChange={ev => setUsername(ev.target.value)}
                        className="placeholder:text-gray-500"
                    />
                    {errors.username && <div className="text-red-500 -mt-2 ml-2">{errors.username}</div>}

                    <input type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                        className="placeholder:text-gray-500"
                    />
                    {errors.email && <div className="text-red-500 -mt-2 ml-2">{errors.email}</div>}

                    <input type="password"
                        placeholder="Password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                        className="placeholder:text-gray-500"
                    />
                    {errors.password && <div className="text-red-500 -mt-2 ml-2">{errors.password}</div>}

                    <div className="flex gap-6 m-2 border-gray-500">
                        <span className="text-gray-500 text-base font-semibold">Gender : </span>
                        <label className="flex gap-3">
                            <input type="radio"
                                value="male"
                                checked={gender === 'male'}
                                onChange={handleGender}
                            />
                            <span className="text-gray-500 text-base">Male</span>
                        </label>
                        <label className="flex gap-3">
                            <input
                                type="radio"
                                value="female"
                                checked={gender === 'female'}
                                onChange={handleGender}
                            />
                            <span className="text-gray-500 text-base">Female</span>
                        </label>
                    </div>
                    {errors.display && <div className="text-red-500 -mt-2 ml-2">{errors.display}</div>}

                    <button className="primary mt-3">Register</button>

                    <div className="text-center text-gray-500 mt-2">
                        Already have an account? <Link to={'/login'} className="underline text-black font-bold">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );

}