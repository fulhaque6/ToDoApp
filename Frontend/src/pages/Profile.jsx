import React, {useContext, useEffect} from 'react';
import {baseApiUrl, Context} from "../main.jsx";
import Loader from "../components/Loader.jsx";
import axios from "axios";

const Profile = () => {
    const {isLoading,user} = useContext(Context);

    return (
        isLoading ?
            <Loader/> :
            <div>
                <h1>{user?.name}</h1>
                <p>{user?.email}</p>
            </div>
    );
};

export default Profile;