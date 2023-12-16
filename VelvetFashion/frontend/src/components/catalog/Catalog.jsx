import React, { useState, useEffect } from "react";
import { Service } from "../service/Service";
import { BrowserView, MobileView, isMobile } from 'react-device-detect';
import styles from "./catalog.module.scss";


export const Catalog = () => {
    const [allServices, setAllServices] = useState([]);
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentServices, setCurrentServices] = useState(services.slice(0, 4));
    const [currentPageNumber, setCurrentPageNumber] = useState(0);

    const [end, setEnd] = useState(0);

    const [increment, setIncrement] = useState(true);
    const [decrement, setDecrement] = useState(true);

    function getServices(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setAllServices(xhttp.response);
                setServices(xhttp.response);
            }
        }
        xhttp.open("GET", "/get-services");
        xhttp.send();
    }

    function getCategories(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setCategories(xhttp.response);
            }
        }
        xhttp.open("GET", "/get-categories");
        xhttp.send();
    }


    function getCurrentServices(){
        setCurrentServices(services.slice(currentPageNumber * 4, (currentPageNumber + 1) * 4));
    }

    function getFilter(param){
        const categoriesP = document.getElementsByClassName(styles.service__title)[0].getElementsByTagName("div");

        for (let i = 0; i < categoriesP.length; i++){
            categoriesP[i].classList.remove(styles.active__p);
        }
        
        document.getElementById("category" + param).classList.add(styles.active__p);
        setServices([...allServices].filter(service => String(service.category.id).includes(param)));
    }

    useEffect(() => {
        getServices();
        getCategories();
    }, []);


    useEffect(() => isMobile ? setCurrentServices(services) : setCurrentServices(services.slice(0, 4)), [services]);

    useEffect(() => {
        currentPageNumber > 0 ? setDecrement(true) : setDecrement(false);
        currentPageNumber < end ? setIncrement(true) : setIncrement(false);

    }, [currentServices]);

    useEffect(getCurrentServices, [currentPageNumber]);
    
    useEffect(() => {
        setEnd(Math.ceil(services.length / 4) - 1);
        setCurrentPageNumber(0);
    }, [services]); 
    
    return (
        <div id={styles.catalog}>
            <div style={{ width: "90%", marginLeft: "5%", marginTop: "5%" }} >
                <h3>Каталог</h3>
                <div className={styles.service__title}>
                    <div id="category" onClick={() => getFilter("")} className={styles.active__p}>
                        <p>Все</p>
                    </div>

                    {categories.map(category => 
                        <div id={"category" + category.id} onClick={() => getFilter(category.id)} >
                            <p>{ category.title }</p>
                        </div>
                    )}

                    <BrowserView>
                        <div id={styles.next__page}>
                            <p>{currentPageNumber + 1 + "/" + (end + 1)}</p>
                            {decrement ? (
                                <div onClick={() => setCurrentPageNumber(currentPageNumber - 1)} className={styles.next__circle + " " + styles.active__circle}>
                                    <a>{"<"}</a>
                                </div>
                            ):(
                                <div className={styles.next__circle}>
                                    <a>{"<"}</a>
                                </div>
                            )}
                            {increment ? (
                                <div onClick={() => setCurrentPageNumber(currentPageNumber + 1)} className={styles.next__circle + " " + styles.active__circle}>
                                    <a>{">"}</a>
                                </div>
                            ):(
                                <div className={styles.next__circle}>
                                    <a>{">"}</a>
                                </div>
                            )}
                        </div>
                    </BrowserView>

                </div>
            </div>

            <BrowserView>
                <div className={styles.services}>
                    {currentServices.map(service => <Service service={service} />)}
                </div>
            </BrowserView>

            <MobileView>
                <div className={styles.services} style={{ overflowX: "scroll"}}>
                    {services.map(service => <Service service={service} />)}
                </div>
            </MobileView>
        </div>
    );
};