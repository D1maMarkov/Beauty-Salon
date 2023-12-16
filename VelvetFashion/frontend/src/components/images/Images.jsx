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
                <div style={{ flexDirection: "column", width: "94%", marginLeft: "3%" }}>
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
                <div style={{ width: "94%", marginLeft: "3%",overflowX: "scroll", flexShrink: "0" }}>
                    <Image src="/static/img/photos/back.png" height="70vh" />
                    <Image src="/static/img/photos/3.webp" height="70vh" />
                    <Image src="/static/img/photos/1.webp" height="40vh" />
                    <Image src="/static/img/photos/2.webp" height="40vh" />
                    <Image src="/static/img/photos/0.webp" height="70vh" />
                    <Image src="/static/img/photos/4.webp" height="70vh" />
                </div>
                </>
            )}
        </div>
    );
};