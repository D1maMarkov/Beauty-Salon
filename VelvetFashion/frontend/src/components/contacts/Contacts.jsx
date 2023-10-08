import React from "react";
import "./Contacts.css";


const Contacts = () => {
    return (
        <div id="contacts">
            <h2>Контакты</h2>
            <p>Санкт-Петербург, улица Варшавская</p>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                <div className="contact">
                    <img class="icon" src="/static/img/contacts/phone.png" />
                    <p>+7(948)348-10-69</p>
                </div>

                <div className="contact">
                    <img class="icon" src="/static/img/contacts/tg.png" />
                    <p>Telegram</p>
                </div>
                <div className="contact">
                    <img class="icon" src="/static/img/contacts/viber.png" />
                    <p>Viber</p>
                </div>
                <div className="contact">
                    <img class="icon" src="/static/img/contacts/whatsapp.png" />
                    <p>WhatsApp</p>
                </div>
            </div>
        </div>
    );
};

export default Contacts;