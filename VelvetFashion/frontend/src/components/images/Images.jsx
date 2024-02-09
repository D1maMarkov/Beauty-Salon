import React, { useState, useEffect } from "react";
import { Image } from "./Image/Image";
import { isBrowser } from 'react-device-detect';
import styles from "./Images.module.scss";


export const Images = () => {
    const [iter, setIter] = useState(0);
    const [images, setImages] = useState([]);
    const [oneMore, setOneMore] = useState(true);

    function getImages(){
        fetch("/get-images/" + iter)
            .then(response => response.json())
            .then(response => {
                setImages([...images, ...response.images]);
                setOneMore(response.one_more);
            })
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