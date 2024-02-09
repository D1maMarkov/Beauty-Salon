import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { isMobile } from 'react-device-detect'
import { getDates } from "./getDates";
import { Modal } from "./modal/modal";
import { ChoseTime } from "./ChoseTime/ChoseTime";
import styles from "./Dates.module.scss";


const DatesPage = () => {
    const params = useParams();
    
    const dict = getDates();
    const length = isMobile ? 6 :  11;
    const dictLength = Math.ceil(dict.length / length);
    
    const service = params.serviceId;

    const navigate = useNavigate();

    const [openModal, setOpenModal] = useState(false);

    const currentDates = dict.slice(0, length);

    const [dates, setDates] = useState(currentDates);
    const [month, setMonth] = useState(0);
    const [activeDate, setActiveDate] = useState(null);
    const [currentDatesPageNum, setCurrebtDatesPageNum] = useState(0);

    const [chosedDate, setChosedDate] = useState(null);


    function newDates(){
        setActiveDate(null);
        const dates = dict.slice(currentDatesPageNum * length, (currentDatesPageNum + 1) * length)

        setDates(dates);
    }

    useEffect(newDates, [currentDatesPageNum]);

    useEffect(() => {
        const month1 = dates[0]['month'];
        const month2 = dates[dates.length - 1]['month'];

        setMonth(month1 == month2 ? month1 : month1 + " - " + month2);
    }, [dates]);

    useEffect(() => {
        document.title = "Онлайн запись";
    }, []);

    return (
        <div style={{ backgroundColor: "white"}}>
            <Modal open={openModal} setOpen={setOpenModal} date={chosedDate} service={service} />

            <nav>
                <div onClick={() => navigate(-1)} className={styles.back__to__service__page}><a><b>{"<"}</b></a></div>
                <h2>Выберите дату и время</h2>
                <div className={styles.nav__body}>
                    <h3>{ month }</h3>
                    <div>
                        <button 
                            disabled={currentDatesPageNum == 0} 
                            onClick={() => setCurrebtDatesPageNum(currentDatesPageNum - 1)}
                            >
                            { "<" }
                        </button>

                        <button 
                            disabled={currentDatesPageNum == dictLength - 1} 
                            onClick={() => setCurrebtDatesPageNum(currentDatesPageNum + 1)}
                            >
                            { ">" }
                        </button>
                    </div>
                </div>
                <div style={{ display: "flex" }} >
                    {dates.map((day, index) =>
                        <div 
                            onClick={index == activeDate ? null : () => setActiveDate(index)} 
                            className={styles.date + " " + (index === activeDate ? styles.active__date : "")}
                            >
                            <p style={{ marginBottom: "2px", marginTop: "10px" }} >{ day.day }</p>
                            <p style={{ fontWeight: "bold", marginTop: "2px", marginBottom: "10px" }} >{ day.date }</p>
                        </div>
                    )}
                </div>
            </nav>

            <ChoseTime 
                month={month} 
                service={service} 
                activeDate={activeDate} 
                dates={dates} 
                setOpenModal={setOpenModal} 
                setChosedDate={setChosedDate} 
            />
        </div>
    );
};

export default DatesPage;