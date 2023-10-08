import React, {useState, useEffect} from "react";
import Review from "./Review";
import { BrowserView, MobileView } from 'react-device-detect';
import "./Reviews.css";


const Reviews = () => {
    const [allReviews, setReviews] = useState([]);

    function getReviews(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setReviews(xhttp.response);
            }
        }

        xhttp.open("GET", "/getReviews");
        xhttp.send();
    }

    let count = 0;
    let len = 0;
    for (let i = 0; i < allReviews.length; i++){
        count += allReviews[i].estimation;
        len++;
    }

    count = Math.round(count / len * 10) / 10;
    useEffect(getReviews, []);

    return (
        <div id="reviews" >
            <div style={{ width: "90%", marginLeft: "4%" }}>
                <BrowserView>
                    <h3 style={{ color: "black", fontSize: "3vw" }}>Отзывы</h3>
                </BrowserView>
                <MobileView>
                    <div style={{ verticalAlign: "middle" }} >
                        <h3 style={{ color: "black", fontSize: "6vw", position: "relative", top: "50%", transform: "translate(0%, -50%)", margin: "0px" }} >Отзывы</h3>
                    </div>
                </MobileView>
                <div style={{ display: "flex" }}>
                    <div style={{ display: "table", marginRight: "2vw"  }}>
                        <h3 style={{ display: "table-cell", fontSize: "6vh", marginRight: "2vw" }} >{ count }</h3>
                    </div>
                    <div>
                        <div style={{ display: "flex", verticalAlign: "center" }} >
                            <img style={{ position: "relative", marginTop: "4vh" }} width="20px" height="20px" src="static/img/yellow.png" />
                            <img style={{ position: "relative", marginTop: "4vh" }} width="20px" height="20px" src="static/img/yellow.png" />
                            <img style={{ position: "relative", marginTop: "4vh" }} width="20px" height="20px" src="static/img/yellow.png" />
                            <img style={{ position: "relative", marginTop: "4vh" }} width="20px" height="20px" src="static/img/yellow.png" />
                            <img style={{ position: "relative", marginTop: "4vh" }} width="20px" height="20px" src="static/img/yellow.png" />
                        </div>
                        <p style={{ fontSize: "2.5vh" }} ><a>{ len }</a><a style={{ marginLeft: "5px"}} >Отзыва</a></p>
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
                                <h4></h4>
                            )}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", width: "50%" }} >
                            {allReviews.length > 0 ? (
                                   allReviews.slice(allReviews.length / 2 + (allReviews.length % 2), allReviews.length).map(review =>
                                    <Review review={review} />
                                    )
                            ) : (
                                <h4></h4>
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
                            <h4></h4>
                        )}
                    </div>
                </MobileView>

            </div>
        </div>
    );
};

export default Reviews;