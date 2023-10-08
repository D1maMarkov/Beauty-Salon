import React from "react";
import {Link} from "react-scroll";
import { useNavigate, useParams } from "react-router-dom";
import { BrowserView, MobileView, isBrowser } from 'react-device-detect';
import "./topnav.css";


const TopNav = () => {
    let navigate = useNavigate();

    function bookedOnline(){
        navigate("/bookedOnline");
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
            if (document.getElementById("messageMenu").contains(e.target)){
                let a = 2;
            }
            else{
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
        <div className="topnav">
            <BrowserView>
                <a href="/" ><img height="100%" width="auto" src="/static/img/logo.png" style={{ verticalAlign: "middle", position: "relative", top: "-5px" }} /></a>
            </BrowserView>
            <MobileView>
                <></>
            </MobileView>
            {document.getElementById("titleInfo") == null ? (
                <a style={{ textDecoration: "none", color: "rgb(200, 200, 200)" }} href="/" >О нас</a>
            ):(
            <Link to="titleInfo" spy={true} smooth={true} offset={-50} duration={500}>О нас</Link>
            )}
            <Link to="catalog" spy={true} smooth={true} offset={0} duration={500}>Услуги</Link>
            <Link to="reviews" spy={true} smooth={true} offset={-50} duration={500}>Отзывы</Link>
            <Link to="container4photos" spy={true} smooth={true} offset={0} duration={500}>Фото</Link>
            <Link to="contacts" spy={true} smooth={true} offset={0} duration={500}>Контакты</Link>


            <div id="phoneNumber" className="phoneNumber">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h4 style={{ color: "black", marginLeft: "2vh", marginBottom: "1vh" }} >Телефон организации</h4>
                    <img id="cross" style={{ width: "3vh", height: "3vh", marginTop: "3vh", marginRight: "2vh", cursor: "pointer" }} src="/static/img/cross.png" />
                </div>
                <hr style={{ border: "1px solid rgb(200, 200, 200)", marginTop: "2vh" }}/>
                <h1 style={{ color: "black", textAlign: "center", marginTop: "5vh" }}>+7 (948) 348-10-69</h1>
            </div>

            {isBrowser ? (
                <div style={{ display: "flex", position: "absolute", right: "30px"  }}>
                    <div className="topnav__contact">
                        <div id="write" style={{ display: "flex", flexDirection: "column" }}>
                            <img className="topnav_img" src="/static/img/contacts/message.png" />
                            <p>Написать</p>
                        </div>
                        <div id="messageMenu" className="messageMenu" style={{ display: "none" }}>
                            <div className="messageMenu_contact">
                                <img class="messageMenu_icon" src="/static/img/contacts/whatsapp.png" />
                                <p>WhatsApp</p>
                            </div>
                            <div className="messageMenu_contact">
                                <img class="messageMenu_icon" src="/static/img/contacts/viber.png" />
                                <p>Viber</p>
                            </div>
                            <div className="messageMenu_contact">
                                <img class="messageMenu_icon" src="/static/img/contacts/tg.png" />
                                <p>Telegram</p>
                            </div>
                        </div>
                    </div>

                    <div id="call" className="topnav__contact">
                        <img className="topnav_img" src="/static/img/contacts/phone.png" />
                        <p>Позвонить</p>
                    </div>

                    <div id="online" onClick={bookedOnline} >
                        <a>Записаться онлайн</a>
                    </div>
                </div>
            ):(
                <></>
            )}


        </div>
    );
};

export default TopNav;