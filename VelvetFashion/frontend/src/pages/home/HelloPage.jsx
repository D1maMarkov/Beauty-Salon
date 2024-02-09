import React, { useEffect } from "react";
import { Topnav } from "../../components/topnav/topnav";
import { Catalog } from "../../components/catalog/Catalog";
import { Images } from "../../components/images/Images";
import { Footer } from "../../components/footer/Footer";
import { Contacts } from "../../components/contacts/Contacts";
import { Reviews } from "../../components/reviews/Reviews";
import MobileBooked from "../../components/mobilebooked/MobileBooked";
import styles from "./HelloPage.module.scss";


const Home = () => {
    useEffect(() => {
        document.title = 'Салон красоты | Velvet Fashion';
    }, []);
    
    return (
         <div style={{ overflowX: "hidden", width: "100%"}}>
            <Topnav />
            
            <div className={styles.hello__page}>
                <div id={styles.title__info}>
                    <a style={{ position: "relative", top: 30, fontSize: "5vh" }} >Velvet Fashion</a>
                    <h5>beauty salon</h5>
                    <h2>Салон красоты</h2>
                    <div id={styles.about__text}>
                        <a>Посетите наш салон Velvet Fashion. Мы готовы предложить вам</a>
                        <a>разнообразные косметические и парикмахерские услуги</a>
                    </div>
                    <p>Наши услуги</p>
                    <ul>
                        <li>Парикмахерская</li>
                        <li>Ногтевой сервис</li>
                        <li>Косметлогия</li>
                    </ul>
                    <div style={{ width: "80%" }} >
                        <p>Доверьте заботу о своей красоте профессионалам. Мы ждём вас!</p>
                    </div>
                    <h4>Следите за акциями в социальных сетях</h4>
                    <div style={{ display: "flex"}}>

                        <div>
                            <p style={{ margin: "5px" }}>Акции</p>
                            <p style={{ margin: "5px" }}>Скидки</p>
                        </div>

                        <div className={styles.container__for__icon}>
                            <img src="/static/img/social/instagram.png" />
                        </div>

                        <div className={styles.container__for__icon}>
                            <img src="/static/img/social/telegram.png" />
                        </div>

                        <div className={styles.container__for__icon}>
                            <img src="/static/img/social/vk.png" />
                        </div>

                        <div className={styles.container__for__icon}>
                            <p>Подпишись</p>
                        </div>
                    </div>
                </div>

                <img id={styles.model} src="/static/img/sofia.png" />

                <img id={styles.slice1} className={styles.slice} src="/static/img/slice.png" />
                <div id={styles.slice2} className={styles.slice}></div>
                <img id={styles.slice3} className={styles.slice} src="/static/img/slice.png" />
            </div>

            <Catalog />
            <Reviews />
            <Images />
            <Contacts />
            <Footer />
            <MobileBooked />
         </div>
    );
}

export default Home;