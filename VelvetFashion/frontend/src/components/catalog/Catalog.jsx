import React, { useState, useEffect } from "react";
import { Service } from "../service/Service";
import { isBrowser } from 'react-device-detect';
import styles from "./catalog.module.scss";


export const Catalog = () => {
    const [allServices, setAllServices] = useState([]);
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
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
    
    useEffect(() => {
        currentPageNumber > 0 ? setDecrement(true) : setDecrement(false);
        currentPageNumber < end ? setIncrement(true) : setIncrement(false);
        
    }, [currentPageNumber, end]);
    
    useEffect(() => {
        setEnd(Math.ceil(services.length / 4) - 1);
        setCurrentPageNumber(0);
    }, [services]); 
    
    
    return (
        <div id={styles.catalog}>
            <div style={{ width: "90%", marginLeft: "5%", marginTop: "5%" }} >
                <h3>Каталог</h3>
                <div className={styles.service__title}>
                    <div className={styles.categories__wrapper} >
                        <div id="category" onClick={() => getFilter("")} className={styles.active__p}>
                            <p>Все</p>
                        </div>
                    
                        {categories.map(category => 
                            <div id={"category" + category.id} onClick={() => getFilter(category.id)} >
                                <p>{ category.title }</p>
                            </div>
                        )}
                    </div>

                    {isBrowser ? (
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
                    ):(
                        <></>
                    )}
                </div>
            </div>
           
            <div className={styles.services}>
                {isBrowser ? (
                    services.slice(currentPageNumber * 4, (currentPageNumber + 1) * 4).map(service => <Service service={service} />)
                ):(
                    services.map(service => <Service service={service} />)
                )}
            </div>
        </div>
    );
};