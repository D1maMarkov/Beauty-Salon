import React from "react";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { BrowserView, isBrowser } from 'react-device-detect';
import styles from "./topnav.module.scss";
import stylesCatalog from "../catalog/catalog.module.scss";
import stylesReviews from "../reviews/Reviews.module.scss";
import stylesImages from "../images/Images.module.scss";
import stylesContacts from "../contacts/Contacts.module.scss";


export const Topnav = () => {
    const navigate = useNavigate();

    function bookedOnline(){
        navigate("/booked-online");
    }
   
    window.addEventListener('click', function(e){
        if (document.getElementById("write").contains(e.target)){
            let current = document.getElementById("messageMenu").style.display;
            if (current == "none"){
                document.getElementById("phoneNumber").style.display = "none";
                document.getElementById("messageMenu").style.display = "flex";
            }
            else{
                document.getElementById("messageMenu").style.display = "none";
            }
        }
        else if (document.getElementById("call").contains(e.target)){
            let current = document.getElementById("phoneNumber").style.display;
            if (current == "none"){
                document.getElementById("messageMenu").style.display = "none";
                document.getElementById("phoneNumber").style.display = "block";
            }
            else{
                document.getElementById("phoneNumber").style.display = "none";
            }
        }
        else{
            if (!document.getElementById("messageMenu").contains(e.target)){
                document.getElementById("messageMenu").style.display = "none";
            }
          
            if (document.getElementById("phoneNumber").contains(e.target)){
                if (document.getElementById("cross").contains(e.target)){
                    document.getElementById("phoneNumber").style.display = "none";
                }
            }
            else{
                document.getElementById("phoneNumber").style.display = "none";
            }
        }
    });

    return (
        <div className={styles.topnav}>
            <BrowserView>
                <a href="/"><img className={styles.logo} src="/static/img/logo.png"/></a>
            </BrowserView>

            {document.getElementById("titleInfo") == null ? (
                <a style={{ textDecoration: "none", color: "rgb(200, 200, 200)" }} href="/" >О нас</a>
            ):(
            <Link to="titleInfo" spy={true} smooth={true} offset={-50} duration={500}>О нас</Link>
            )}
            
            <Link to={stylesCatalog.catalog} spy={true} smooth={true} offset={0} duration={500}>Услуги</Link>
            <Link to={stylesReviews.reviews} spy={true} smooth={true} offset={-50} duration={500}>Отзывы</Link>
            <Link to={stylesImages.container__for__photos} spy={true} smooth={true} offset={0} duration={500}>Фото</Link>
            <Link to={stylesContacts.contacts} spy={true} smooth={true} offset={0} duration={500}>Контакты</Link>

            <div id="phoneNumber" className={styles.phone__number}>
                <div>
                    <h4>Телефон организации</h4>
                    <img id="cross" src="/static/img/cross.png" />
                </div>
                <hr/>
                <h1>+7 (948) 348-10-69</h1>
            </div>

            {isBrowser ? (
                <div style={{ display: "flex", position: "absolute", right: "30px"  }}>
                    <div className={styles.topnav__contact}>
                        <div id="write" className={styles.contact__icon}>
                            <img src="/static/img/contacts/message.png" />
                            <p>Написать</p>
                        </div>

                        <div id="messageMenu" className={styles.message__menu} style={{ display: "none" }}>
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

                    <div className={styles.topnav__contact}>
                        <div id="call" className={styles.contact__icon}>
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
        </div>
    );
};