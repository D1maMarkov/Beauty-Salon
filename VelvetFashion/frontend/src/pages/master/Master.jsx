import React, {useState, useEffect, useRef} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Review } from "../../components/reviews/Review/Review";
import { BrowserView, MobileView } from 'react-device-detect';
import { getMaster, getReviews } from "./APIrequests";
import styles from "./Master.module.scss";


const MasterPage = () => {
    const navigate = useNavigate();

    const params = useParams();
    const id = params.id;

    const reviews = getReviews(id);
    const master = getMaster(id);

    const [openReviews, setOpenReviews] = useState(false);

    const reviewsRef = useRef();

    function changeReviews(){
        const reviews = reviewsRef.current;

        if(reviews){
            if (openReviews){
                reviews.style.right = "0vw";
                reviews.style.boxShadow = "0 0 0 200vw rgba(0,0,0,0.3)";
            }
            else{
                reviews.style.right = "-40vw";
                reviews.style.boxShadow = "none";
            }
        }
    }

    useEffect(changeReviews, [openReviews]);

    useEffect(() => {
        if (master != undefined){
            document.title = master.profession +  " | " + master.name;
        }
    }, [master]);

    return (
        <div style={{backgroundColor: "rgb(245, 245, 245)"}}>
            <div onClick={() => navigate(-1)} className={styles.back__to__service__master} >
                <a>{"<"}</a>
            </div>

            {master != undefined ? (
                <>
                <BrowserView>
                    <div id={styles.border} ></div>

                    <div ref={reviewsRef} id={styles.reviews__to__master}>
                        <img onClick={() => setOpenReviews(false)} id={styles.cross} src="/static/img/cross.png"/>
                        <div style={{ width: "80%", margin: "10%" }} >
                            <h2>Отзывы</h2>
                            {reviews.length > 0 ? (
                                reviews.map(review =>
                                    <Review review={review} />
                            )):(
                            <></>
                            )}
                        </div>
                    </div>

                    <div className={styles.wrapper} style={{display: "flex", position: "relative"}}>
                        <div className={styles.container__for__master}>
                            <img id={styles.master} src={master.photo} />
                            <div onClick={() => setOpenReviews(!openReviews)} id={styles.container__for__response}>
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
                </BrowserView>

                <MobileView>
                    <div className={styles.wrapper} style={{padding: "5vw"}}>
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
                        
                        <h2>Отзывы</h2>
                        {reviews.map(review =>
                            <Review review={review} />
                        )}
                    </div>
                </MobileView>
                </>
                ):(
                    <></>
                )
            }
        </div>
    );
};

export default MasterPage;