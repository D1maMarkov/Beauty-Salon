import React, { useState, useEffect } from "react";
import { Review } from "./Review/Review";
import { BrowserView, MobileView } from 'react-device-detect';
import styles from "./Reviews.module.scss";


export const Reviews = () => {
    const [allReviews, setReviews] = useState([]);

    function getReviews(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setReviews(xhttp.response);
            }
        }

        xhttp.open("GET", "/get-reviews");
        xhttp.send();
    }


    let count = allReviews.map(review => review.estimation).reduce((partialSum, a) => partialSum + a, 0);
    const len = allReviews.length;

    count = Math.round(count / len * 10) / 10;
    useEffect(getReviews, []);

    return (
        <div id={styles.reviews} >
            <div style={{ width: "90%", marginLeft: "4%" }}>
                <BrowserView>
                    <h3 style={{ color: "black", fontSize: "3vw" }}>Отзывы</h3>
                </BrowserView>

                <MobileView>
                    <h3 style={{ color: "black", fontSize: "6vw", position: "relative", top: "50%", transform: "translate(0%, -50%)", margin: "0px" }} >Отзывы</h3>
                </MobileView>
                
                <div style={{ display: "flex", marginTop: "4vh" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <h3>{ count }</h3>
                    </div>
                    <div className={styles.star__rate__wrapper}>
                        <div className={styles.star__rate}> 
                            <div>
                                <img src="static/img/yellow.png" />
                                <img src="static/img/yellow.png" />
                                <img src="static/img/yellow.png" />
                                <img src="static/img/yellow.png" />
                                <img src="static/img/yellow.png" />
                            </div>
                            <p><a>{ len }</a><a>Отзыва</a></p>
                        </div>
                    </div>
                </div>

                <BrowserView>
                    <div style={{ display: "flex"}}>
                        <div style={{ display: "flex", flexDirection: "column", width: "50%", marginRight: "3%" }} >
                            {allReviews.length > 0 ? (
                                   allReviews.slice(0, (allReviews.length / 2 + (allReviews.length % 2))).map(review =>
                                    <Review review={review} />
                                    )
                            ) : (
                                <></>
                            )}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", width: "50%" }} >
                            {allReviews.length > 0 ? (
                                   allReviews.slice(allReviews.length / 2 + (allReviews.length % 2), allReviews.length).map(review =>
                                    <Review review={review} />
                                    )
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </BrowserView>

                <MobileView>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {allReviews.length > 0 ? (
                               allReviews.slice(0, 3).map(review =>
                                <Review review={review} />
                                )
                        ) : (
                            <></>
                        )}
                    </div>
                </MobileView>

            </div>
        </div>
    );
};