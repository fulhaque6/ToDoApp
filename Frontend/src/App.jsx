import {BrowserRouter,Route,Routes} from "react-router-dom";
import './styles/app.scss'
import Home from "./pages/Home.jsx";
import Header from "./components/Header.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import {Toaster} from "react-hot-toast";
import {useContext, useEffect} from "react";
import axios from "axios";
import {Context} from "./main.jsx";
import {baseApiUrl} from "./main.jsx";

function App() {
    const {setIsAuthenticated,setUser,setLoading} = useContext(Context);
    useEffect(() => {
        setLoading(true);
        axios.get(`${baseApiUrl}/users/myProfile`,{
            withCredentials: true
        }).then((response) => {
            setIsAuthenticated(true);
            setUser(response.data.user);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
            setUser({});
            setIsAuthenticated(false);
            setLoading(false);
        })
    }, []);
  return (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
        </Routes>
        <Toaster/>
    </BrowserRouter>
  )
}

export default App
