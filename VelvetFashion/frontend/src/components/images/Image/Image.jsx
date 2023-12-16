import React from "react";
import { isMobile } from 'react-device-detect';
import styles from "./Image.module.scss";


export const Image = ({src}) => {
    return (
        <>
        {!isMobile ? (
            <div className={styles.image} style={{ width: "100%" }}>
                <img src={src} />
            </div>
        ):(
            <div className={styles.image} style={{ minWidth: "55vw", width: "auto", height: "50vh", margin: "3vw" }}>
                <img src={src} />
            </div>
        )
        }
        </>
    );
};