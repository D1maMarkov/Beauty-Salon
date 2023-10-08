import React from "react";
import { useNavigate } from "react-router-dom";
import "./ChoiceService.css";


const ChoiceService = ({service}) => {

    let navigate = useNavigate();
    function go2Service(){
        let path = "/service/" + service.category.title + "/" + service.title + "/" + service.price;
        navigate(path);
    }

    return (
        <div className="choiceService">
            <div style={{ display: "flex", width: "50%"}}>
                <img src={service.photo} />
                <div style={{ marginTop: "1.75vh", width: "30%" }}>
                    <p>{service.title}</p>
                    <p style={{ color: "rgb(210, 210, 210)" }}>{ service.category.title }</p>
                </div>
            </div>
            <div style={{ display: "flex", width: "50%", position: "absolute", right: "-3vw" }}>
                <p class="price">{service.price} ₽</p>
                <button className="choiceButton" onClick={go2Service} >Записаться</button>
            </div>
        </div>
    );
};

export default ChoiceService;