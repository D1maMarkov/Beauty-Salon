import React from "react";
import styles from "./Contacts.module.scss";


export const Contacts = () => {
    return (
        <div id={styles.contacts}>
            <h2>Контакты</h2>
            <p style={{ fontSize: "3vh" }} >Санкт-Петербург, улица Варшавская</p>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                <div className={styles.contact}>
                    <img src="/static/img/contacts/phone.png" />
                    <p>+7(948)348-10-69</p>
                </div>

                <div className={styles.contact}>
                    <img src="/static/img/contacts/tg.png" />
                    <p>Telegram</p>
                </div>
                <div className={styles.contact}>
                    <img src="/static/img/contacts/viber.png" />
                    <p>Viber</p>
                </div>
                <div className={styles.contact}>
                    <img src="/static/img/contacts/whatsapp.png" />
                    <p>WhatsApp</p>
                </div>
            </div>
        </div>
    );
};