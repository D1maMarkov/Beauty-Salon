import { useState, useEffect } from "react";

export function getReviews(id){
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch("/get-reviews-to-master/" + id)
            .then(response => response.json())
            .then(response => {
                setReviews(response);
            })
    }, []);

    return reviews;
}

export function getMaster(id){
    const [master, setMaster] = useState([]);

    useEffect(() => {
        fetch("/get-master/" + id)
            .then(response => response.json())
            .then(response => {
                setMaster(response);
            })
    }, []);

    return master;
}