import React from "react";
import "./HelloPage.css";


const HelloPage = function() {
    document.body.style.backgroundColor = "white";
    
    return (
        <div className="HelloPage">
            <div id="titleInfo">
                <a style={{ position: "relative", top: 30, fontSize: "5vh" }} >Velvet Fashion</a>
                <h5>beauty salon</h5>
                <h2>Салон красоты</h2>
                <div id="aboutText">
                    <a>Посетите наш салон Velvet Fashion. Мы готовы предложить вам </a>
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

                    <div style={{ verticalAlign: "middle" }}>
                        <p style={{ margin: "5px" }}>Акции</p>
                        <p style={{ margin: "5px" }}>Скидки</p>
                    </div>

                    <div className="container4icon">
                        <img className="icon" src="/static/img/social/instagram.png" />
                    </div>

                    <div className="container4icon">
                        <img className="icon" src="/static/img/social/telegram.png" />
                    </div>

                    <div className="container4icon">
                        <img className="icon" src="/static/img/social/vk.png" />
                    </div>

                    <div className="container4icon" >
                        <p>Подпишись</p>
                    </div>
                </div>
            </div>
            <img id="model" src="/static/img/sofia.png" />

            <img id="slice1" className="slice" src="/static/img/slice.png" />
            <div id="slice2" className="slice"></div>
            <img id="slice3" className="slice" src="/static/img/slice.png" />
        </div>
    )
}

export default HelloPage;