import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ChoiceService.module.scss";
import { isMobile } from "react-device-detect";


export const ChoiceService = ({service}) => {
    const navigate = useNavigate();

    function go2Service(){
        const path = `/service/${service.id}`;
        navigate(path);
    }

    return (
        <div className={styles.choice__service}>
            <div style={{ display: "flex" }}>
                <img src={service.photo} />
                <div style={{ width: "30%" }}>
                    <p style={{ marginBottom: isMobile ? "0px" : "" }}>{ service.title }</p>
                    <p style={{ marginTop: isMobile ? "0px" : "", color: "rgb(210, 210, 210)" }}>{ service.category.title }</p>
                </div>
            </div>
            <div className={styles.choice__service__right}>
                <p>{service.price} ₽</p>
                <button onClick={go2Service} >Записаться</button>
            </div>
        </div>
    );
};