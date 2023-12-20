import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { isMobile } from 'react-device-detect'
import { useGetDates } from "../../hooks/useGetDates";
import { Modal } from "./modal/modal";
import { ChoseTime } from "./ChoseTime/ChoseTime";
import styles from "./Dates.module.scss";


export const Dates = () => {
    document.body.style.backgroundColor = "white";

    const params = useParams();
    
    const dict = useGetDates();
    const length = isMobile ? Math.ceil(dict.length / 6) :  Math.ceil(dict.length / 11);
    
    const service = params.serviceId;

    const navigate = useNavigate();

    const [openModal, setOpenModal] = useState(false);

    const currentDates = isMobile ? dict.slice(0, 6) : dict.slice(0, 11);

    const [dates, setDates] = useState(currentDates);
    const [month, setMonth] = useState(0);
    const [activeDate, setActiveDate] = useState(null);
    const [currentDatesPageNum, setCurrebtDatesPageNum] = useState(0);

    const [chosedDate, setChosedDate] = useState(null);


    function newDates(){
        setActiveDate(null);
        const dates = !isMobile ?
            dict.slice(currentDatesPageNum * 11, (currentDatesPageNum + 1) * 11)
            :
            dict.slice(currentDatesPageNum * 6, (currentDatesPageNum + 1) * 6);

        setDates(dates);
    }

    useEffect(newDates, [currentDatesPageNum]);

    useEffect(() => {
        const month1 = dates[0]['month'];
        const month2 = dates[dates.length - 1]['month'];

        month1 == month2 ? setMonth(month1) : setMonth(month1 + " - " + month2);
    }, [dates]);

    useEffect(() => {
        document.title = "Онлайн запись";
    }, []);


    return (
        <>
            <Modal open={openModal} setOpen={setOpenModal} date={chosedDate} service={service} />

            <div className={styles.nav__date}>
                <div onClick={() => navigate(-1)} className={styles.back__to__service__page}><a><b>{"<"}</b></a></div>
                <h2>Выберите дату и время</h2>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3 style={{ marginLeft: "2%" }} >{ month }</h3>
                    <div style={{display: "flex", marginRight: "6%"}}>
                        {currentDatesPageNum == 0 ? (
                            <button style={{ color: "rgb(210, 210, 210)"}}>{"<"}</button>
                        ):(
                            <button style={{ color: "rgb(110, 110, 210)"}} onClick={() => setCurrebtDatesPageNum(currentDatesPageNum - 1)} >{"<"}</button>
                        )}

                        {currentDatesPageNum == length - 1 ? (
                            <button style={{ color: "rgb(210, 210, 210)" }}>{">"}</button>
                        ):(
                            <button style={{ color: "rgb(110, 110, 210)" }} onClick={() => setCurrebtDatesPageNum(currentDatesPageNum + 1)} >{">"}</button>
                        )}
                    </div>
                </div>
                <div style={{ display: "flex" }} >
                    {dates.map((day, index) =>
                        index == activeDate ?
                        <div id={index} className={styles.date + " " + styles.active__date}>
                            <p style={{ marginBottom: "2px", marginTop: "10px" }} >{ day.day }</p>
                            <p style={{ fontWeight: "bold", marginTop: "2px", marginBottom: "10px" }} >{ day.date }</p>
                        </div>
                        :
                        <div id={index} onClick={() => setActiveDate(index)} className={styles.date}>
                            <p style={{ marginBottom: "2px", marginTop: "10px" }} >{ day.day }</p>
                            <p style={{ fontWeight: "bold", marginTop: "2px", marginBottom: "10px" }} >{ day.date }</p>
                        </div>
                    )}
                </div>
            </div>

            <ChoseTime month={month} service={service} activeDate={activeDate} dates={dates} setOpenModal={setOpenModal} setChosedDate={setChosedDate} />
        </>
    );
};