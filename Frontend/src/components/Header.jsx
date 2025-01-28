import {Link} from "react-router-dom";
import {useContext} from "react";
import {baseApiUrl, Context} from "../main.jsx";
import axios from "axios";
import {toast} from "react-hot-toast";

const Header = () => {
    const {isAuthenticated,setIsAuthenticated,isLoading,setLoading,setUser} = useContext(Context);
    const logoutHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.get(`${baseApiUrl}/users/logout`, {
                withCredentials: true
            });
            toast.success(response.data.message);
            setLoading(false);
            setIsAuthenticated(false);
            setUser({});
        }catch (error) {
            toast.error(error.response.data.message);
            setLoading(false);
            setIsAuthenticated(true);
        }
    }
    return (
       <nav className="header">
           <div>
               <h2>Todo App</h2>
           </div>
           <article>
               <Link to={"/"}>Home</Link>
               <Link to={"/profile"}>Profile</Link>
               {
                   isAuthenticated ? <button disabled={isLoading} onClick={logoutHandler} className="btn">Logout</button> : <Link to={"/login"}>Login</Link>
               }
           </article>
       </nav>
    );
};

export default Header;