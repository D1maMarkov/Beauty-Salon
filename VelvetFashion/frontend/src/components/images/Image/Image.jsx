import React from "react";
import { isBrowser } from 'react-device-detect';
import styles from "./Image.module.scss";


export const Image = ({src}) => {
    return (
        <>
        {isBrowser ? (
            <div className={styles.image}>
                <img src={src} />
            </div>
        ):(
            <div className={styles.image}>
                <img src={src} />
            </div>
        )
        }
        </>
    );
};