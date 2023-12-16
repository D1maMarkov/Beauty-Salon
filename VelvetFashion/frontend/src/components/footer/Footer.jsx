import React from "react";
import styles from "./Footer.module.scss";

export const Footer = () => {
    function up(){
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    return (
        <footer>
            <p>©2023 салон красоты "Velvet Fashion"</p>

            <button onClick={up} ><a>{"<"}</a></button>
        </footer>
    );
};