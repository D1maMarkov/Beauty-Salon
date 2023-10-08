import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../footer/Footer";
import Topnav from "../topnav/topnav";
import Contacts from "../contacts/Contacts";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import "./Service.css";


const ServicePage = () => {
    document.body.style.backgroundColor = "rgb(245, 245, 245)";

    let navigate = useNavigate();
    function go2Master(id){
        navigate("/master/" + id);
    }

    let params = useParams();

    let category = params.category;
    let title = params.title;
    let price = params.price;

    const [masters, setMasters] = useState([]);

    function getMasters(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setMasters(xhttp.response);
            }
        }
        xhttp.open("GET", "/getMasters/" + category);
        xhttp.send();
    }

    function go2Dates(){
        navigate("/createNotation/" + title);
    }


    useEffect(() => {
        getMasters();
        document.title = title;
    }, []);
    
    return (
        <div>
            <BrowserView>
                <Topnav />
            </BrowserView>

            <BrowserView>
                <div style={{ marginTop: "12vh", marginLeft: "10%", display: "flex", justifyContent: "space-between", paddingBottom: "15vh" }}>
                    <div>
                        <div onClick={e => navigate(-1)} id="back2catalog" >
                            <a style={{ fontSize: "5vh" }} >{"<"}  </a>
                            <a style={{ marginLeft: "10px" }} ><b>Каталог</b></a>
                        </div>
                        <div className="serviceDescription">
                            <p style={{ fontSize: "4vh", color: "rgb(200, 200, 200)", fontWeight: "normal" }} >{ category }</p>
                            <p style={{ fontSize: "5vh" }} >{ title }</p>
                            <p style={{ fontSize: "6vh" }}>{price} ₽</p>
                        </div>
                    </div>

                    <div style={{ marginTop: "20vh", marginRight: "10%" }} >
                        <a style={{ fontSize: "5vh" }} >Специалисты для записи</a>
                        <div style={{ marginTop: "3vh" }}>
                            {masters.map(master => (
                            <div className="master4booked">
                                <div style={{ display: "flex" }}>
                                    <img id="masterImg4booked" src={master.photo} />
                                    <div style={{ marginLeft: "10px" }} >
                                        <p style={{ fontWeight: "bold", marginBottom: "0px" }} >{master.name}</p>
                                        <p style={{ marginTop: "5px", marginBottom: "5px" }} >{master.profession}</p>
                                        <div style={{ verticalAlign: "middle" }} >
                                            <img className="star" src="/static/img/yellow.png" />
                                            <a><b>5.0</b></a><a style={{ marginLeft: "10px" }} >1 оценкa </a>
                                        </div>
                                    </div>
                                </div>

                                <button onClick={go2Dates} className="bookedButton" >Записаться</button>
                                <div onClick={() => go2Master(master.id)} className="detailed" ><a>i</a></div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </BrowserView>

            <MobileView>
                <div style={{ marginTop: "5vh", marginLeft: "10%", paddingBottom: "15vw" }}>
                    <div>
                        <div onClick={e => navigate(-1)} id="back2catalog" >
                            <a style={{ fontSize: "5vh" }} >{"<"}  </a>
                            <a style={{ marginLeft: "10px" }} ><b>Каталог</b></a>
                        </div>
                        <div className="serviceDescription">
                            <p style={{ fontSize: "4vh", color: "rgb(200, 200, 200)", fontWeight: "normal" }} >{ category }</p>
                            <p style={{ fontSize: "5vh" }} >{ title }</p>
                            <p style={{ fontSize: "6vh" }}>{price} ₽</p>
                        </div>
                    </div>

                    <div style={{ marginTop: "15vw", marginRight: "10%" }} >
                        <a style={{ fontSize: "5vh" }} >Специалисты для записи</a>
                        <div style={{ marginTop: "3vh" }}>
                            <div className="master4booked">
                            {masters.map(master => (
                            <div className="master4booked">
                                <div style={{ display: "flex" }}>
                                    <img id="masterImg4booked" src={master.photo} />
                                    <div style={{ marginLeft: "10px" }} >
                                        <p style={{ fontWeight: "bold", marginBottom: "0px" }} >{master.name}</p>
                                        <p style={{ marginTop: "5px", marginBottom: "5px" }} >{master.profession}</p>
                                        <div style={{ verticalAlign: "middle" }} >
                                            <img className="star" src="/static/img/yellow.png" />
                                            <a><b>5.0</b></a><a style={{ marginLeft: "10px" }} >1 оценкa </a>
                                        </div>
                                    </div>
                                </div>

                                <button onClick={go2Dates} className="bookedButton" >Записаться</button>
                                <div onClick={go2Master} className="detailed" ><a>i</a></div>
                            </div>
                            ))}

                                <button onClick={go2Dates} className="bookedButton" >Записаться</button>
                                <div onClick={go2Master} className="detailed" ><a>i</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </MobileView>

            <Contacts />
            <Footer />
        </div>
    );
};

export default ServicePage;