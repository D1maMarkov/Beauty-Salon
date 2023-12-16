import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./master.module.scss";


export const MasterOnServesPage = ({master, service}) => {
    const navigate = useNavigate();

    function goToDates(){
        navigate("/create-notation/" + service.id);
    }

    function goToMaster(){
        navigate("/master/" + master.id);
    }

    return (
        <div className={styles.master__for__booked}>
            <div style={{ display: "flex" }}>
                <img id={styles.master__img__for__booked} src={master.photo} />
                <div>
                    <p style={{ fontWeight: "bold", marginBottom: "0px" }} >{master.name}</p>
                    <p style={{ marginTop: "5px", marginBottom: "5px" }} >{master.profession}</p>
                    <div>
                        <img className={styles.star} src="/static/img/yellow.png" />
                        <a><b>5.0</b></a><a style={{ marginLeft: "10px" }} >1 оценкa </a>
                    </div>
                </div>
            </div>

            <button onClick={goToDates} className={styles.booked__button} >Записаться</button>
            <div onClick={goToMaster} className={styles.detailed} ><a>i</a></div>
        </div>
    );
};