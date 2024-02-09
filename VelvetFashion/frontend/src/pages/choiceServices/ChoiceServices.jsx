import React, { useState, useEffect} from "react";
import { ChoiceService } from "../../components/choiceServices/ChoiceService";
import { Topnav } from "../../components/topnav/topnav";
import { Footer } from "../../components/footer/Footer";
import { Contacts } from "../../components/contacts/Contacts";
import { getServices } from "../../hooks/getServices";
import styles from "./ChoiceService.module.scss";


const ChoiceServicesPage = () => {
    const [allServices, setAllServices] = useState([]);
    const [services, setServices] = useState([]);

    function Filter(value){
        const newServices = [...allServices].filter(service => service.title.toLowerCase().includes(value.toLowerCase()) || service.category.title.toLowerCase().includes(value.toLowerCase()));
        setServices(newServices);
    }

    useEffect(() => getServices(setAllServices), []);
    useEffect(() => setServices(allServices), [allServices]);

    return (
        <div style={{ backgroundColor: "rgb(230, 230, 230)" }}>
            <Topnav />
            <input className={styles.search} onChange={e => Filter(e.target.value)} placeholder="Искать..." />

            {services.length > 0 ? (
                <div className={styles.container__for__choice__services}>
                    <div style={{ display: "flex" }}>
                        <a id={styles.text__for__services}>Услуги</a>
                        <a id={styles.text__for__services2}>({services.length})</a>
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
        </div>
    );
}

export default ChoiceServicesPage;