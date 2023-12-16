import React, { useState, useEffect} from "react";
import { ChoiceService } from "./ChoiceService";
import { Topnav } from "../topnav/topnav";
import { Footer } from "../footer/Footer";
import { Contacts } from "../contacts/Contacts";
import styles from "./ChoiceService.module.scss";


export const ChoiceServices = () => {
    document.body.style.backgroundColor = "rgb(230, 230, 230)";

    const [allServices, setAllServices] = useState([]);
    const [services, setServices] = useState([]);

    function getServices(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setAllServices(xhttp.response);
            }
        }
        xhttp.open("GET", "/get-services");
        xhttp.send();
    }

    function Filter(value){
        const newServices = [...allServices].filter(service => service.title.toLowerCase().includes(value.toLowerCase()) || service.category.title.toLowerCase().includes(value.toLowerCase()));
        setServices(newServices);
    }

    useEffect(getServices, []);
    useEffect(() => setServices(allServices), [allServices]);

    return (
         <>
            <Topnav />
            <input className={styles.search} onChange={e => Filter(e.target.value)} placeholder="Искать..." />

            {services.length > 0 ? (
                <div className={styles.container__for__choice__services}>
                    <div style={{ display: "flex" }}>
                        <a id={styles.text__for__services}>Услуги</a><a id={styles.text__for__services2} > ({services.length})</a>
                     </div>
                     {services.map(service =>
                        <ChoiceService service={service} />
                     )}
                </div>
             )
             : (
                <h2 className={styles.not__found}>Таких услуг нет в ассортименте</h2>
             )}

             <Contacts />
             <Footer />
         </>
    );
}