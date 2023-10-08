import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {isMobile } from 'react-device-detect'
import "./Dates.css";


const Dates = () => {
    document.body.style.backgroundColor = "white";

    const params = useParams();
    const service = params.service;

    const navigate = useNavigate();

    const currentDate = new Date();
    const dd = currentDate.getDate();
    const yyyy = currentDate.getFullYear();

    let mm = (currentDate.getMonth() + 1);

    let days = daysInMonth(mm, Number(yyyy));

    let dict = [];
    for (let i = Number(dd); i <= days; i++){
        dict.push({"day": getDayOfWeek(mm + '-' + i + '-' + yyyy), "date": i, "month": getMonthByNum(mm)});
    }

    mm = (mm + 1) % 12;
    if (mm == 0){
        mm++;
    }

    days = daysInMonth(mm, Number(yyyy));

    for (let i = 1; i <= days; i++){
        dict.push({"day": getDayOfWeek(mm + '-' + i + '-' + yyyy), "date": i, "month": getMonthByNum(mm)});
    }

    mm = (mm + 1) % 12;
    if (mm == 0){
        mm++;
    }

    days = daysInMonth(mm, Number(yyyy));

    for (let i = 1; i <= days; i++){
        dict.push({"day": getDayOfWeek(mm + '-' + i + '-' + yyyy), "date": i, "month": getMonthByNum(mm)});
    }

    let currentDates = dict.slice(0, 11);
    if (isMobile){
        currentDates = dict.slice(0, 6);
    }
    else{
        currentDates = dict.slice(0, 11);
    }

    const [Dates, useDates] = useState(currentDates);

    let count = 0;
    let Time = 0;

    const morning = ["9:30", "10:30", "11:30"];
    const afternoon = ["12:30", "13:30", "14:30", "15:30", "16:30", "17:30"];
    const vecher = ["18:30", "19:30", "20:30", "21:30", "22:30"];

    const [month, setMonth] = useState(0);

    function newDates(count){
        document.getElementById("PageNumber").innerHTML = count;
        document.getElementById("decrement").style.color = "rgb(110, 110, 210)";
        document.getElementById("decrement").style.pointerEvents = "auto";
        if (count == 5){
            document.getElementById("increment").style.color = "rgb(210, 210, 210)";
            document.getElementById("increment").style.pointerEvents = "none";
        }
        if (count == 0){
            document.getElementById("decrement").style.color = "rgb(210, 210, 210)";
            document.getElementById("decrement").style.pointerEvents = "none";
        }

        let dates = dict.slice(count * 11, (count + 1) * 11);
        if (isMobile){
            dates = dict.slice(count * 6, (count + 1) * 6);
        }

        useDates(dates);
        let month1 = dates[0]['month'];
        let month2 = dates[dates.length - 1]['month'];

        if (month1 == month2){
            setMonth(month1);
        }
        else{
            setMonth(month1 + " - " + month2);
        }
    }

    function getDayOfWeek(date) {
        const dayOfWeek = new Date(date).getDay();
        return isNaN(dayOfWeek) ? null :
            ["вс", "пн", "вт", "ср", "чт", "пт", "сб"][dayOfWeek];
    }

    function getMonthByNum(month){
        return ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь",	"Ноябрь", "Декабрь"][month - 1]
    }

    function daysInMonth (month, year) {
        return new Date(year, month, 0).getDate();
    }

    function getActive(index){
        let htmlDates = $(".Date");

        for (let i = 0; i < htmlDates.length; i++){
            htmlDates.get(i).classList.remove("activeDate");
        }

        $("#" + index).get(0).classList.add("activeDate");
    }

    function getTime(id){
        let numDates = document.getElementsByClassName("activeDate")[0];
        if (numDates == null){
            alert("Выберите дату для записи");
            return;
        }

        let time = numDates.getElementsByTagName("p")[0].innerHTML;
        time += " " +  document.getElementById(id).getElementsByTagName("a")[0].innerHTML;
        Time = time;

        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                document.getElementById("bookedForm").style.display = "flex";
            }
            else if (this.readyState == 4 && this.status == 202){
                alert("\nЗапись на это время уже существует");
            }
        }

        xhttp.open("GET", "/checkTime/" + Time);
        xhttp.send();
    }

    function validForm(){
        let name = document.getElementById("name").value;
        let secondname = document.getElementById("secondname").value;
        let phone = document.getElementById("phoneForm").value;

        let re = /[+][7]\d{10}/g;
        let myArray = re.exec(phone);

        if (myArray && phone.length == 12){
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200){
                    alert("Ваша запись успешно сохранена!");
                    document.getElementById("bookedForm").style.display = "none";
                }
                else if (this.readyState == 4 && this.status == 202){
                    alert("\nЗапись на это время уже существует");
                }
            }

            xhttp.open("GET", "/getBookedOnline/" + name + "/" + secondname + "/" + phone + "/" + Time + "/" + service);
            xhttp.send();
        }
        else{
            alert("Неверный формат номера телефона");
        }
    }

    function closeForm(){
        document.getElementById("bookedForm").style.display = "none";
    }

    useEffect(() => {
        let month1 = Dates[0]['month'];
        let month2 = Dates[Dates.length - 1]['month'];

        if (month1 == month2){
            setMonth(month1);
        }
        else{
            setMonth(month1 + " - " + month2);
        }
    }, []);

    useEffect(() => {
        document.title = "Онлайн запись";
    }, []);

    return (
        <div>
            <div id="bookedForm" style={{ display: "none" }} className="bookedForm">
                <img id="cross" onClick={closeForm} style={{ width: "3vh", height: "3vh", position: "absolute", top: "3vh", right: "3vh", cursor: "pointer" }} src="/static/img/cross.png" />
                <div style={{ width: "76%" }}>
                    <p>Введите ваше имя</p>
                    <input id="name" placeholder="имя..." />
                    <p>Введите вашу фамилию</p>
                    <input id="secondname" placeholder="фамилия..." />
                    <p>Укажите контактный номер телефона (+7)</p>
                    <input id="phoneForm" type="tel" placeholder="номер телефона..." />
                    <button id="submitButton" onClick={validForm} >Подтвердить</button>
                </div>
            </div>

            <p id="PageNumber" style={{ display: "none" }} >0</p>
            <div className="navDate">
                <div onClick={e => navigate(-1)} className="back2ServicePage" ><a><b>{"<"}</b></a></div>
                <h2>Выберите дату и время</h2>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3 style={{ marginLeft: "2%" }} >{ month }</h3>
                    <div style={{display: "flex", marginRight: "6%"}}>
                        <button id="decrement" style={{ color: "rgb(210, 210, 210)" }} onClick={() => newDates(Number(document.getElementById("PageNumber").innerHTML) - 1)} >{"<"}</button>
                        <button id="increment" style={{ color: "rgb(110, 110, 210)" }} onClick={() => newDates(Number(document.getElementById("PageNumber").innerHTML) + 1)} >{">"}</button>
                    </div>
                </div>
                <div style={{ display: "flex" }} >
                    {Dates.map((day, index) =>
                        <div id={index} onClick={e => getActive(index)} className="Date" >
                            <p style={{ marginBottom: "2px", marginTop: "10px" }} >{ day.day }</p>
                            <p style={{ fontWeight: "bold", marginTop: "2px", marginBottom: "10px" }} >{ day.date }</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="container4dates">
                <div>
                    <h2>Утро</h2>
                    <div style={{ display: "flex" }} >
                        {morning.map((time, index) =>
                            <div onClick={e => getTime("morning" + index)} id={"morning" + index} className="time" >
                                <a>{ time }</a>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <h2>День</h2>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {afternoon.map((time, index) =>
                            <div onClick={e => getTime("afternoon" + index)} id={"afternoon" + index} className="time" >
                                <a>{ time }</a>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <h2>Вечер</h2>
                    <div style={{ display: "flex", flexWrap: "wrap"  }}>
                        {vecher.map((time, index) =>
                            <div onClick={e => getTime("evening" + index)} id={"evening" + index} className="time" >
                                <a>{ time }</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Dates;