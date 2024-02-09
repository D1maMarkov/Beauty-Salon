import React from "react";
import { Review } from "./Review/Review";
import { isBrowser } from 'react-device-detect';
import { getReviews } from "./getReviews";
import styles from "./Reviews.module.scss";


export const Reviews = () => {
    const allReviews = getReviews();

    let count = allReviews.map(review => review.estimation).reduce((partialSum, a) => partialSum + a, 0);
    const len = allReviews.length;

    count = Math.round(count / len * 10) / 10;
   
    return (
        <div id={styles.reviews} >
            <div style={{ width: "90%", marginLeft: "4%" }}>
                <h3 className={styles.title}>Отзывы</h3>
                
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

                <div style={isBrowser ? { columns: "2" } : { display: "flex", flexDirection: "column" }}>
                        {allReviews.map(review =>
                                <Review review={review} />
                        )}
                </div>
            </div>
        </div>
    );
};