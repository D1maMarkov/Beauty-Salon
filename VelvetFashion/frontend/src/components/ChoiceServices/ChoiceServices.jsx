import React, { useState, useEffect} from "react";
import ChoiceService from "./ChoiceService";
import Topnav from "../topnav/topnav";
import Footer from "../footer/Footer";
import Contacts from "../contacts/Contacts";
import "./ChoiceService.css";


function ChoiceServices() {
    document.body.style.backgroundColor = "rgb(230, 230, 230)";

    const [AllServices, setAllServices] = useState([]);
    const [Services, setServices] = useState([]);

    function getServices(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setAllServices(xhttp.response);
            }
        }
        xhttp.open("GET", "/getServices");
        xhttp.send();
    }

    function Filter(value){
        const newServices = [...AllServices].filter(service => service.title.toLowerCase().includes(value.toLowerCase()) || service.category.title.toLowerCase().includes(value.toLowerCase()) );
        setServices(newServices);
    }

    useEffect(() => getServices(), []);
    useEffect(() => setServices(AllServices), [AllServices]);

    return (
         <div>
            <Topnav />
            <input class="search" onChange={e => Filter(e.target.value)} placeholder="Искать..." />

            {Services.length > 0 ? (
                <div className="container4ChoiceServices">
                    <div style={{ display: "flex" }}>
                        <a id="text4services" >Услуги</a><a id="text4services2" > ({Services.length})</a>
                     </div>
                     {Services.map(service =>
                        <ChoiceService service={service} />
                     )}
                </div>
             )
             : (
                <h2 style={{ textAlign: "center", marginBottom: "20vh" }} >Таких услуг нет в ассортименте</h2>
             )}

             <Contacts />
             <Footer />
         </div>
    );
}

export default ChoiceServices;