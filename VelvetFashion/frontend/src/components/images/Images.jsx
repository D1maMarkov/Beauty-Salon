import React from "react";
import Image from "./Image";
import { BrowserView, MobileView } from 'react-device-detect';


const Images = () => {
    return (
        <div id="container4photos" style={{ paddingTop: "30px", marginTop: "70px" }}>
            <BrowserView>
                <h3 style={{ color: "black", marginLeft: "4%", fontSize: "3vw" }}>Фото</h3>
                <div style={{ display: "flex", flexDirection: "column", width: "94%", marginLeft: "3%" }}>
                    <div style={{ display: "flex" }}>
                        <div style={{ display: "flex", flexDirection: "column", width: "29%", margin: "2%"}}>
                            <Image src="/static/img/photos/back.png" width="100px" height="70vh" />
                            <Image src="/static/img/photos/3.webp" width="100px" height="70vh" />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", width: "29%", margin: "2%"}}>
                            <Image src="/static/img/photos/1.webp" width="100px" height="40vh" />
                            <Image src="/static/img/photos/2.webp" width="100px" height="40vh" />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", width: "29%", margin: "2%"}}>
                            <Image src="/static/img/photos/0.webp" width="100px" height="70vh" />
                            <Image src="/static/img/photos/4.webp" width="100px" height="70vh" />
                        </div>
                    </div>
                </div>
            </BrowserView>

            <MobileView>
                <h3 style={{ color: "black", marginLeft: "4%", fontSize: "5vw" }}>Фото</h3>
                <div style={{ display: "flex", width: "94%", marginLeft: "3%",overflowX: "scroll", flexShrink: "0" }}>
                    <Image src="/static/img/photos/back.png" height="70vh" />
                    <Image src="/static/img/photos/3.webp" height="70vh" />
                    <Image src="/static/img/photos/1.webp" height="40vh" />
                    <Image src="/static/img/photos/2.webp" height="40vh" />
                    <Image src="/static/img/photos/0.webp" height="70vh" />
                    <Image src="/static/img/photos/4.webp" height="70vh" />
                </div>
            </MobileView>
        </div>
    );
};

export default Images;