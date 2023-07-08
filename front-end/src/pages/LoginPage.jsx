import { Link, Navigate } from "react-router-dom";
import axios from "axios"
import { useContext, useState } from "react";
import { UserContext } from "../UserContext"

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [ready, setReady] = useState(false);
    const { setUser } = useContext(UserContext);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};

        // Required email and password
        if (!email || !password) {
            errors.display = "All fields are required";
        }

        setErrors(errors);

        // Return true if there are no errors
        return Object.keys(errors).length === 0;
    }

    async function loginUser(e) {
        e.preventDefault(); //prevents reloading of page
        const validation = validateForm();
        console.log(validation);
        if (validation) {
            try {
                await axios.post("/auth/login", {
                    email,
                    password
                });      
                setRedirect(true);
                fetchUserName();
                alert("Login successful!");
            }
            catch (e) {
                if (e.response.data.msg === "Invalid credentials"){
                    alert("Invalid credentials!");
                }
                else{
                    alert("Login failed!")
                }
                setEmail("");
                setPassword("");
            }
        }
       
    }
 
    async function fetchUserName(){
        try{
            await axios.get('/auth/profile').then(({data}) => {
                setUser(data);
                setReady(true);
                console.log({data});
            });
        }
        catch(e){
            console.log(e);
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="mt-4 grow flex items-center justify-around ">
            <div className="border border-gray-300 rounded-xl p-6 border-x-2 border-y-2">
                <h1 className="text-3xl text-center mb-4">Login</h1>
                <form className="max-w-xs mx-auto" onSubmit={loginUser}>
                    <input type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                        className="placeholder:text-gray-500"
                    />
                      
                    <input type="password"
                        placeholder="Password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                        className="placeholder:text-gray-500"
                    />
                    
                    <Link className="text-sm mt-1 text-gray-600">Forgot password?</Link>

                    {errors.display && <div className="text-red-500 mt-2 -mb-2 ml-2">{errors.display}</div>}

                    <button className="primary mt-3">Login</button>

                    <div className="text-center text-gray-500 mt-2">
                        Don't have an account yet? <Link to={'/register'} className="underline text-black font-bold">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );

}