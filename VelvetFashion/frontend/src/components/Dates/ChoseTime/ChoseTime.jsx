import React, { useState } from "react";
import { useGetTimes } from "../../../hooks/useGetTimes";
import Alert from "../../Alert";
import styles from "./ChoseTime.module.scss";


const dayTimes = {
    morning: ["9:30", "10:30", "11:30"],
    afternoon: ["12:30", "13:30", "14:30", "15:30", "16:30", "17:30"],
    evening: ["18:30", "19:30", "20:30", "21:30", "22:30"]
}

const dayNames = {
    morning: "Утро",
    afternoon: "День", 
    evening: "Вечер",
}


export const ChoseTime = ({service, activeDate, dates, setOpenModal, setChosedDate, month}) => {
    const times = useGetTimes(service);

    function getTime(time){
        if (activeDate == null){
            setOpenAlert(true);
            return;
        }

        setOpenModal(true);

        setChosedDate({
            date: dates[activeDate].date,
            month: month,
            time: time
        })
    }

    function dateIsBusy(currentDate, time){
        let dateObj = {}
        dates.map(date => date.date == currentDate ? dateObj = {date: date.date, time: time, month: date.month} : null);
        let busy = false;

        times.map(date => {
            let currentBusy = true;
            date.date != dateObj.date ? currentBusy = false : null;
            date.time != dateObj.time ? currentBusy = false : null;
            date.month != dateObj.month ? currentBusy = false : null;

            if (currentBusy && !busy){
                busy = currentBusy;
            }
        });

        return busy;
    }

    const [openAlert, setOpenAlert] = useState(false);

    const handleClose = () => {
        setOpenAlert(false);
    }

    return (
        <>
        <Alert open={openAlert} severity="warning" text="Выберите дату для записи" handleClose={handleClose} />

        <div className={styles.container__for__dates}>
            {Object.keys(dayTimes).map(key => 
                <div>
                    <h2>{ dayNames[key] }</h2>
                    <div className={styles.time__wrapper} >
                        {dayTimes[key].map(time => 
                            dateIsBusy(activeDate == null ? null : dates[activeDate].date, time) ? (
                                <div className={styles.time + " " + styles.time__disabled}>
                                    <a>{ time }</a>
                                </div>
                            ):(
                                <div onClick={() => getTime(time)} className={styles.time}>
                                    <a>{ time }</a>
                                </div>
                            )
                        )}
                    </div>
                </div>        
            )}
        </div>
        </>
    )
}