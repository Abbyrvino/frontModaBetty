import React from "react";
import { EditUser } from "../components/EditUser";
import Navbar from "../components/Navbar";
import { expirationSession } from "../utils/authUtil";

const Profile = () => {
    return ( 
        <>
            <Navbar title={"Perfil"}/>
            <EditUser></EditUser>
        </>
     );
}
 
export default Profile;