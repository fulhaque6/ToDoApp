import {useState,useContext} from 'react';
import {Link, Navigate} from "react-router-dom";
import axios from "axios";
import {baseApiUrl, Context} from "../main.jsx";
import {toast} from "react-hot-toast";

const Register = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const {isAuthenticated,setIsAuthenticated,isLoading,setLoading} = useContext(Context);
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
       try {
           const response = await axios.post(`${baseApiUrl}/users/new`, {
               name,
               email,
               password
           },{
               headers: {
                   "Content-Type": "application/json",
               },
               withCredentials: true
           })
           toast.success(response.data.message);
           setLoading(false);
           setIsAuthenticated(true);
       }catch (error) {
           toast.error(error.response.data.message);
           setLoading(false);
           setIsAuthenticated(false);
       }
    }
    if (isAuthenticated) return <Navigate to="/" />;

    return (
        <div className="login">
            <section>
                <form onSubmit={onSubmit}>
                    <input value={name} onChange={(e)=> setName(e.target.value)} type="text" placeholder="Name" required />
                    <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="Email"/>
                    <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Password"/>
                    <button disabled={isLoading} type="submit">Sign Up</button>
                    <h4>Or</h4>
                    <Link to="/login">Log In</Link>
                </form>
            </section>
        </div>
    );
};

export default Register;