import React from "react";
import { useNavigate } from "react-router-dom";


const Service = ({service}) => {

    let navigate = useNavigate();
    function go2Service(){
        let path = "/service/" + service.category.title + "/" + service.title + "/" + service.price;
        navigate(path);
    }

    return (
        <div className="service" onClick={go2Service} >
            <img style={{ width: "90%", aspectRatio: "1/1", margin: "5%", marginBottom: "0", pointerEvents: "none"}} src={service.photo} />
            <div style={{ width: "90%", marginLeft: "6%", fontSize: "1.5vw" }}>
                <p style={{ marginBottom: "0px" }} >{ service.category.title }</p>
                <p style={{ fontWeight: "bold", marginTop: "5px" }}>{ service.title }</p>
                <p style={{ fontWeight: "bold" }}>{ service.price } ₽</p>
            </div>
        </div>
    );
};

export default Service;