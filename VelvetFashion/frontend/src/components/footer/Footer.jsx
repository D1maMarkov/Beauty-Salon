import React from "react";
import { isBrowser } from 'react-device-detect';
import styles from "./Footer.module.scss";


export const Footer = () => {
    function up(){
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    return (
        <footer>
            <p>©2023 салон красоты "Velvet Fashion"</p>

            {isBrowser ? (
                <button onClick={up} ><a>{"<"}</a></button>
            ):(
                <></>
            )}
        </footer>
    );
};