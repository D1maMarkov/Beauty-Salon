import React from "react";
import { useNavigate } from "react-router-dom";
import { isMobile } from 'react-device-detect';
import "./MobileBooked.css";


const MobileBooked = () => {

    let navigate = useNavigate();
    function bookedOnline(){
        navigate("/bookedOnline");
    }

    return (
        isMobile ? <button onClick={bookedOnline} id="MobileBooked" >Записаться онлайн</button> : <></>
    );
};

export default MobileBooked;