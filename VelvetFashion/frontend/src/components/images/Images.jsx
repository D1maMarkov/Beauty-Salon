import React from "react";
import { Image } from "./Image/Image";
import { isBrowser } from 'react-device-detect';
import styles from "./Images.module.scss";


export const Images = () => {
    return (
        <div id={styles.container__for__photos}>
            {isBrowser ? (
                <>
                <h3 style={{ fontSize: "3vw" }}>Фото</h3>
                <div className={styles.images__wrapper}>
                    <div>
                        <div style={{ flexDirection: "column", width: "29%", margin: "2%"}}>
                            <Image src="/static/img/photos/back.png"/>
                            <Image src="/static/img/photos/3.webp"/>
                        </div>

                        <div style={{ flexDirection: "column", width: "29%", margin: "2%"}}>
                            <Image src="/static/img/photos/1.webp"/>
                            <Image src="/static/img/photos/2.webp" />
                        </div>

                        <div style={{ flexDirection: "column", width: "29%", margin: "2%"}}>
                            <Image src="/static/img/photos/0.webp"/>
                            <Image src="/static/img/photos/4.webp"/>
                        </div>
                    </div>
                </div>
                </>
            ):(
                <>
                <h3 style={{ fontSize: "5vw" }}>Фото</h3>
             
                <div className={styles.images__wrapper__mobile}>
                    <Image src="/static/img/photos/back.png" />
                    <Image src="/static/img/photos/3.webp" />
                    <Image src="/static/img/photos/1.webp" />
                    <Image src="/static/img/photos/2.webp" />
                    <Image src="/static/img/photos/0.webp" />
                    <Image src="/static/img/photos/4.webp" />
                </div>
            
                </>
            )}
        </div>
    );
};