import React, { useState, useEffect } from "react";
import { Image } from "./Image/Image";
import { isBrowser } from 'react-device-detect';
import styles from "./Images.module.scss";


export const Images = () => {
    const [iter, setIter] = useState(0);
    const [images, setImages] = useState([]);
    const [oneMore, setOneMore] = useState(true);

    function getImages(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setImages([...images, ...xhttp.response.images]);
                setOneMore(xhttp.response.one_more);
            }
        }

        xhttp.open("GET", "/get-images/" + iter);
        xhttp.send();
    }

    useEffect(getImages, [iter]);

    return (
        <div id={styles.container__for__photos}>
            <h3>Фото</h3>

            <div className={isBrowser ? styles.images__wrapper : styles.images__wrapper__mobile}>
                {images.map(src => 
                    <Image src={src} />
                )}
            </div>

            <div className={styles.button__wrapper}>
                {oneMore ? (
                    <button onClick={() => setIter(iter + 1)} >Показать ещё</button>
                ):(
                    <button disabled>Показать ещё</button>
                )}
            </div>
        </div>
    );
};