import React from "react";
import styles from "./Review.module.scss";


export const Review = ({review}) => {
    return (
        <div className={styles.review}>
            <img className={styles.review__img} src={review.username.photo } />
            <div className={styles.review__body}>
                <p>{ review.username.username }</p>
                <div className={styles.star__rate}>
                    <img src="/static/img/yellow.png" />
                    <img src="/static/img/yellow.png" />
                    <img src="/static/img/yellow.png" />
                    <img src="/static/img/yellow.png" />
                    <img src="/static/img/yellow.png" />
                    <p style={{ marginLeft: "10px"}} >{ review.date }</p>
                </div>
                <div style={{width: "80%", display: "flex", position: "relative"}} ><a>{review.body}</a></div>
            </div>
        </div>
    );
};