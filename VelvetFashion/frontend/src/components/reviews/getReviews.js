import { useState, useEffect } from "react";

export function getReviews(){
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch("/get-reviews")
            .then(response => response.json())
            .then(response => {
                setReviews(response);
            })
    }, []);

    return reviews;
}