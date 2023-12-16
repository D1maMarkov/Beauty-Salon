import React from "react";
import { useNavigate } from "react-router-dom";
import { isMobile } from 'react-device-detect';
import styles from "./MobileBooked.module.scss";


const MobileBooked = () => {

    const navigate = useNavigate();

    function bookedOnline(){
        navigate("/bookedOnline");
    }

    return (
        isMobile ? <button onClick={bookedOnline} id={styles.mobile__booked}>Записаться онлайн</button> : <></>
    );
};

export default MobileBooked;