import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Footer } from "../footer/Footer";
import { Topnav } from "../topnav/topnav";
import { Contacts } from "../contacts/Contacts";
import { isBrowser } from 'react-device-detect';
import { MasterOnServesPage } from "./master/master";
import { useGetService } from "../../hooks/useGetService";
import styles from "./Service.module.scss";


export const ServicePage = () => {
    document.body.style.backgroundColor = "rgb(245, 245, 245)";

    const navigate = useNavigate();

    const params = useParams();

    const serviceId = params.id;
    
    const service = useGetService(serviceId);

    const [masters, setMasters] = useState([]);

    function getMasters(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setMasters(xhttp.response);
            }
        }
        xhttp.open("GET", "/get-masters/" + service.category.id);
        xhttp.send();
    }

    useEffect(() => {
        if (service != null){
            getMasters();
            document.title = service.title;
        }
    }, [service]);
    
    return (
        <>
            {isBrowser ? (
                <Topnav />
            ):(<></>)}
            
            {service != null ? (
                <div className={isBrowser ? styles.content__desktop : styles.content__mobile}>
                    <div>
                        <div onClick={() => navigate(-1)} id={styles.back__to__catalog} >
                            <a style={{ fontSize: "5vh" }} >{"<"}  </a>
                            <a style={{ marginLeft: "10px" }} ><b>Каталог</b></a>
                        </div>

                        <div className={styles.service__description}>
                            <p style={{ fontSize: "4vh", color: "rgb(200, 200, 200)", fontWeight: "normal" }} >{ service.category.title }</p>
                            <p style={{ fontSize: "5vh" }} >{ service.title }</p>
                            <p style={{ fontSize: "6vh" }}>{ service.price } ₽</p>
                        </div>
                    </div>

                    <div style={{ marginTop: isBrowser ? "20vh" : "13vh", marginRight: "10%" }} >
                        <a style={{ fontSize: "5vh" }} >Специалисты для записи</a>
                        <div style={{ marginTop: "3vh" }}>
                            {masters.map(master => (
                                <MasterOnServesPage master={master} service={service} />
                            ))}
                        </div>
                    </div>
                </div>
            ):(
                <></>
            )}

            <Contacts />
            <Footer />
        </>
    );
};