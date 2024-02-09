import React, { useState, useRef } from "react";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { isBrowser } from 'react-device-detect';
import styles from "./topnav.module.scss";
import stylesHelloPage from "../../pages/home/HelloPage.module.scss"
import stylesCatalog from "../catalog/catalog.module.scss";
import stylesReviews from "../reviews/Reviews.module.scss";
import stylesImages from "../images/Images.module.scss";
import stylesContacts from "../contacts/Contacts.module.scss";


export const Topnav = () => {
    const navigate = useNavigate();

    const [openCall, setOpenCall] = useState(false);
    const [openWrite, setOpenWrite] = useState(false);
    
    function bookedOnline(){
        navigate("/booked-online");
    }

    const phoneRef = useRef();
    const callRef = useRef();
    const messageRef = useRef();
    const writeRef = useRef();

    window.addEventListener('click', function(e){
        if (!phoneRef.current.contains(e.target) && !callRef.current.contains(e.target)){
            setOpenCall(false);
        }

        if (!messageRef.current.contains(e.target) && !writeRef.current.contains(e.target)){
            setOpenWrite(false);
        }
    });

    return (
        <header className={styles.topnav}>
            <div className={styles.topnav__segment}>
                {isBrowser ? (
                    <img onClick={() => navigate("/")} className={styles.logo} src="/static/img/logo.png"/>
                ):(
                    <></>
                )}
                
                <Link to={stylesHelloPage.title__info} spy={true} smooth={true} offset={-50} duration={500}>О нас</Link>
                <Link to={stylesCatalog.catalog} spy={true} smooth={true} offset={0} duration={500}>Услуги</Link>
                <Link to={stylesReviews.reviews} spy={true} smooth={true} offset={-50} duration={500}>Отзывы</Link>
                <Link to={stylesImages.container__for__photos} spy={true} smooth={true} offset={0} duration={500}>Фото</Link>
                <Link to={stylesContacts.contacts} spy={true} smooth={true} offset={0} duration={500}>Контакты</Link>
            </div>

            <div ref={phoneRef} className={styles.phone__number} style={{ display: openCall ? "block" : "none" }}>
                <div>
                    <h4>Телефон организации</h4>
                    <img id="cross" src="/static/img/cross.png" onClick={() => setOpenCall(false)} />
                </div>
                <hr/>
                <h1>+7 (948) 348-10-69</h1>
            </div>

            {isBrowser ? (
                <div className={styles.topnav__segment}>
                    <div className={styles.topnav__contact}>
                        <div ref={writeRef} className={styles.contact__icon} onClick={() => setOpenWrite(true)} >
                            <img src="/static/img/contacts/message.png" />
                            <p>Написать</p>
                        </div>

                        <div ref={messageRef} className={styles.message__menu} style={{ display: openWrite ? "flex" : "none" }}>
                            <div className={styles.message__menu__contact}>
                                <img class={styles.message__menu__icon} src="/static/img/contacts/whatsapp.png" />
                                <p>WhatsApp</p>
                            </div>
                            <div className={styles.message__menu__contact}>
                                <img class={styles.message__menu__icon} src="/static/img/contacts/viber.png" />
                                <p>Viber</p>
                            </div>
                            <div className={styles.message__menu__contact}>
                                <img class={styles.message__menu__icon} src="/static/img/contacts/tg.png" />
                                <p>Telegram</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.topnav__contact} onClick={() => setOpenCall(true)} >
                        <div ref={callRef} className={styles.contact__icon}>
                            <img src="/static/img/contacts/phone.png" />
                            <p>Позвонить</p>
                        </div>
                    </div>

                    <div id={styles.online} onClick={bookedOnline} >
                        <a>Записаться онлайн</a>
                    </div>
                </div>
            ):(
                <></>
            )}
        </header>
    );
};