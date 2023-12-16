import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Service.module.scss";


export const Service = ({service}) => {
    const navigate = useNavigate();

    function go2Service(){
        const path = `/service/${service.id}`;
        navigate(path);
    }

    return (
        <div className={styles.service} onClick={go2Service} >
            <img src={service.photo} />
            <div>
                <p style={{ marginBottom: "0px" }} >{ service.category.title }</p>
                <p style={{ fontWeight: "bold", marginTop: "5px" }}>{ service.title }</p>
                <p style={{ fontWeight: "bold" }}>{ service.price } ₽</p>
            </div>
        </div>
    );
};