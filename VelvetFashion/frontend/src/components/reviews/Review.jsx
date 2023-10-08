import React from "react";
import "./Reviews.css";


const Review = ({review}) => {
    return (
        <div className="review">
            <img className="reviewImg" width="40px" height="40px" src={review.username.photo } />
            <div style={{ display: "flex", flexDirection: "column", height: "auto" }}>
                <p style={{ marginBottom: "0px"}} >{ review.username.username }</p>
                <div style={{ display: "flex", verticalAlign: "center" }} >
                    <img className="reviewStar" src="/static/img/yellow.png" />
                    <img className="reviewStar" src="/static/img/yellow.png" />
                    <img className="reviewStar" src="/static/img/yellow.png" />
                    <img className="reviewStar" src="/static/img/yellow.png" />
                    <img className="reviewStar" src="/static/img/yellow.png" />
                    <p style={{ marginLeft: "10px"}} >{ review.date }</p>
                </div>
                <div style={{width: "80%", display: "flex", position: "relative"}} ><a>{review.body}</a></div>
            </div>
        </div>
    );
};

export default Review;