import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Review from "../reviews/Review";
import { BrowserView, MobileView } from 'react-device-detect';
import "./Master.css";


const Master = () => {
    document.body.style.backgroundColor = "rgb(245, 245, 245)";

    let navigate = useNavigate();
    const params = useParams();
    const id = params.id;
    const [allReviews, setReviews] = useState({});
    const [master, setMaster] = useState();

    function getReviews(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setReviews(xhttp.response);
            }
        }

        xhttp.open("GET", "/getReviews2Master/" + id);
        xhttp.send();
    }

    function openReviews(){
        document.getElementById("reviews2Master").style.display = "block";
        document.getElementById("reviews2Master").classList.add("openReviews");
        setTimeout(() => document.getElementById("reviews2Master").style.display = "block", 490);
        setTimeout(() => document.getElementById("reviews2Master").classList.remove("openReviews"), 490);
    }

    function closeReviews(){
        document.getElementById("reviews2Master").classList.add("closeReviews");
        setTimeout(() => document.getElementById("reviews2Master").style.display = "none", 490);
        setTimeout(() => document.getElementById("reviews2Master").classList.remove("closeReviews"), 490);
    }

    function getMaster(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setMaster(xhttp.response);
            }
        }
        xhttp.open("GET", "/getMaster/" + id);
        xhttp.send();
    }

    useEffect(() => {
        getMaster();
        getReviews();
     }, []);

    useEffect(() => {
        if (master != undefined){
        document.title = master.profession +  " | " + master.name;
        console.log(master);
        }
    }, [master]);

    return (
        <div>
            <BrowserView>
                <div style={{ display: "none" }} id="reviews2Master">
                    <img onClick={closeReviews} id="cross" style={{ position: "absolute", width: "3vh", height: "3vh", top: "3vh", right: "2vh", cursor: "pointer" }} src="/static/img/cross.png" />
                    <div style={{ width: "80%", margin: "10%" }} >
                        <h2>Отзывы</h2>
                        {allReviews.length > 0 ? (
                            allReviews.map(review =>
                                <Review review={review} />
                        )):(
                            <a>.</a>
                        )}
                    </div>
                </div>
                <div onClick={e => navigate(-1)} className="back2ServiceMaster" ><a>{"<"}</a></div>
                <div id="border" ></div>
                {master != undefined ? (
                <div style={{ width: "90%",  margin: "5%", marginTop: "5vh", marginLeft: "8%", marginBottom: "0px", display: "flex"}}>
                    <div className="container4master">
                        <img id="master" src={master.photo} />
                        <div onClick={openReviews} id="container4response">
                            <div className="response">
                                <img id="comment" src="/static/img/contacts/speech.png" width="75px" height="75px" />
                            </div>
                        </div>
                    </div>
                    <div className="about">
                        <h2>{ master.profession}</h2>
                        <h3>{ master.name }</h3><br/>
                        <div style={{ width: "500px", fontWeight: "bold"}}>
                            <a>{ master.biography }</a>
                        </div>
                        <div id="container4icons" >
                            <div style={{ display: "flex"}}>
                                <div className="container4masterIcon">
                                    <div className="masterCircle">
                                        <img className="masterIcon" src="/static/img/masterIcon/graduet.png" />
                                    </div>
                                    <p>есть высшее образование</p>
                                </div>
                                <div className="container4masterIcon">
                                    <div className="masterCircle">
                                        <img className="masterIcon" src="/static/img/masterIcon/work.png" />
                                    </div>
                                    <p>более 5 лет в профессии</p>
                                </div>
                            </div>
                            <div className="container4masterIcon">
                                <div className="masterCircle">
                                    <img className="masterIcon" src="/static/img/masterIcon/sisors.png" />
                                </div>
                                <p>стилист</p>
                            </div>
                        </div>
                    </div>
                </div>
                ):(
                    <></>
                )}
            </BrowserView>

            <MobileView>
                <div onClick={e => navigate(-1)} className="back2ServiceMaster" ><a>{"<"}</a></div>
                <div style={{ width: "90%",  margin: "5%", marginTop: "5vh", marginLeft: "8%", marginBottom: "0px"}}>
                    {master != undefined ? (
                        <>
                    <div className="container4master">
                        <img id="master" src={ master.photo } />

                    </div>
                    <div className="about">
                        <h2>{ master.profession}</h2>
                        <h3>{ master.name}</h3><br/>
                        <div id="containerWithMasterDescription">
                            <a>{ master.biography }</a>
                        </div>
                        <div id="container4icons" >
                            <div style={{ display: "flex"}}>
                                <div className="container4masterIcon">
                                    <div className="masterCircle">
                                        <img className="masterIcon" src="/static/img/masterIcon/graduet.png" />
                                    </div>
                                    <p style={{ marginTop: "1vw" }} >есть высшее образование</p>
                                </div>
                                <div className="container4masterIcon">
                                    <div className="masterCircle">
                                        <img className="masterIcon" src="/static/img/masterIcon/work.png" />
                                    </div>
                                    <p style={{ marginTop: "1vw" }} >более 5 лет в профессии</p>
                                </div>
                            </div>
                            <div className="container4masterIcon">
                                <div className="masterCircle">
                                    <img className="masterIcon" src="/static/img/masterIcon/sisors.png" />
                                </div>
                                <p>стилист</p>
                            </div>
                        </div>
                    </div>
                    </>
                    ):(
                        <></>
                    )}
                </div>


                <div style={{ width: "80%", margin: "10%" }} >
                    <h2>Отзывы</h2>
                    {allReviews.length > 0 ? (
                        allReviews.map(review =>
                            <Review review={review} />
                    )):(
                        <a>.</a>
                    )}
                </div>


            </MobileView>
        </div>
    );
};

export default Master;