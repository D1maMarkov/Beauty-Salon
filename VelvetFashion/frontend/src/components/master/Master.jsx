import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Review } from "../reviews/Review/Review";
import stylesReview from "../reviews/Reviews.module.scss";
import { BrowserView, MobileView } from 'react-device-detect';
import styles from "./Master.module.scss";


export const Master = () => {
    document.body.style.backgroundColor = "rgb(245, 245, 245)";

    const navigate = useNavigate();

    const params = useParams();
    const id = params.id;

    const [reviews, setReviews] = useState([]);
    const [master, setMaster] = useState();

    function getReviews(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setReviews(xhttp.response);
            }
        }

        xhttp.open("GET", "/get-reviews-to-master/" + id);
        xhttp.send();
    }

    function openReviews(){
        document.getElementById(styles.reviews__to__master).style.display = "block";
        document.getElementById(styles.reviews__to__master).classList.add(stylesReview.open__reviews);
        setTimeout(() => document.getElementById(styles.reviews__to__master).style.display = "block", 490);
        setTimeout(() => document.getElementById(styles.reviews__to__master).classList.remove(stylesReview.open__reviews), 490);
    }

    function closeReviews(){
        document.getElementById(styles.reviews__to__master).classList.add(stylesReview.close__reviews);
        setTimeout(() => document.getElementById(styles.reviews__to__master).style.display = "none", 490);
        setTimeout(() => document.getElementById(styles.reviews__to__master).classList.remove(stylesReview.close__reviews), 490);
    }

    function getMaster(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setMaster(xhttp.response);
            }
        }
        xhttp.open("GET", "/get-master/" + id);
        xhttp.send();
    }

    useEffect(() => {
        getMaster();
        getReviews();
     }, []);

    useEffect(() => {
        if (master != undefined){
            document.title = master.profession +  " | " + master.name;
        }
    }, [master]);

    return (
        <>
            <BrowserView>
                <div style={{ display: "none" }} id={styles.reviews__to__master}>
                    <img onClick={closeReviews} id={styles.cross} src="/static/img/cross.png" />
                    <div style={{ width: "80%", margin: "10%" }} >
                        <h2>Отзывы</h2>
                        {reviews.length > 0 ? (
                            reviews.map(review =>
                                <Review review={review} />
                        )):(
                            <a>.</a>
                        )}
                    </div>
                </div>
                <div onClick={() => navigate(-1)} className={styles.back__to__service__master} ><a>{"<"}</a></div>
                <div id={styles.border} ></div>
                {master != undefined ? (
                <div style={{ width: "90%",  margin: "5%", marginTop: "5vh", marginLeft: "8%", marginBottom: "0px", display: "flex"}}>
                    <div className={styles.container__for__master}>
                        <img id={styles.master} src={master.photo} />
                        <div onClick={openReviews} id={styles.container__for__response}>
                            <div className={styles.response}>
                                <img src="/static/img/contacts/speech.png"/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.about}>
                        <h2>{ master.profession}</h2>
                        <h3>{ master.name }</h3><br/>
                        <div style={{ width: "500px", fontWeight: "bold"}}>
                            <a>{ master.biography }</a>
                        </div>
                        <div id={styles.container__for__icons}>
                            <div style={{ display: "flex"}}>
                                <div className={styles.container__for__master__icon}>
                                    <div className={styles.master__circle}>
                                        <img src="/static/img/masterIcon/graduet.png" />
                                    </div>
                                    <p>есть высшее образование</p>
                                </div>
                                <div className={styles.container__for__master__icon}>
                                    <div className={styles.master__circle}>
                                        <img src="/static/img/masterIcon/work.png" />
                                    </div>
                                    <p>более 5 лет в профессии</p>
                                </div>
                            </div>
                            <div className={styles.container__for__master__icon}>
                                <div className={styles.master__circle}>
                                    <img src="/static/img/masterIcon/sisors.png" />
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
                <div onClick={e => navigate(-1)} className={styles.back__to__service__master}><a>{"<"}</a></div>
                <div style={{ width: "90%",  margin: "5%", marginTop: "5vh", marginLeft: "6%", marginBottom: "0px"}}>
                    {master != undefined ? (
                        <>
                    <div className={styles.container__for__master}>
                        <img id={styles.master} src={ master.photo } />
                    </div>
                    <div className={styles.about}>
                        <h2>{ master.profession}</h2>
                        <h3>{ master.name}</h3><br/>
                        <div id={styles.container__with__master__description}>
                            <a>{ master.biography }</a>
                        </div>
                        <div id={styles.container__for__icons}>
                            <div style={{ display: "flex"}}>
                                <div className={styles.container__for__master__icon}>
                                    <div className={styles.master__circle}>
                                        <img src="/static/img/masterIcon/graduet.png" />
                                    </div>
                                    <p style={{ marginTop: "1vw" }} >есть высшее образование</p>
                                </div>
                                <div className={styles.container__for__master__icon}>
                                    <div className={styles.master__circle}>
                                        <img src="/static/img/masterIcon/work.png" />
                                    </div>
                                    <p style={{ marginTop: "1vw" }} >более 5 лет в профессии</p>
                                </div>
                            </div>
                            <div className={styles.container__for__master__icon}>
                                <div className={styles.master__circle}>
                                    <img src="/static/img/masterIcon/sisors.png" />
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

                <div style={{ width: "90%", margin: "5%" }} >
                    <h2>Отзывы</h2>
                    {reviews.length > 0 ? (
                        reviews.map(review =>
                            <Review review={review} />
                    )):(
                        <a>.</a>
                    )}
                </div>
            </MobileView>
        </>
    );
};