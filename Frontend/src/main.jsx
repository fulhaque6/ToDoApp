import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {createContext,useState} from "react";

export const baseApiUrl = "http://localhost:3000/api/v1";

export const Context = createContext({isAuthenticated: false});

const ContextWrapper = ()=>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [user, setUser] = useState({});


    return(
        <Context.Provider value={{isAuthenticated, setIsAuthenticated, isLoading, setLoading, user, setUser}}>
            <App />
        </Context.Provider>
    );
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ContextWrapper/>
    </StrictMode>,
)
