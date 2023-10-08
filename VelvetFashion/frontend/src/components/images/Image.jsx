import React from "react";
import { isMobile } from 'react-device-detect';


const Image = ({src, height}) => {
    function scaleFunc(event){
        event.target.style.transform = 'scale(1.2)';
        event.target.style.transition = '.3s';
    }

    function scaleFuncReset(event){
        event.target.style.transform = 'scale(1)';
    }

    return (
        <div>
        {!(isMobile) ? (
            <div style={{ width: "100%", height: height, marginBottom: "3vw", boxShadow: "0 0 20px #d83bff", borderRadius: "15px", overflow: "hidden" }}>
                <img onMouseOver={scaleFunc} onMouseOut={scaleFuncReset} src={src} width="100%" height="100%"/>
            </div>
        ):(
            <div style={{ minWidth: "55vw", width: "auto", height: "50vh", margin: "3vw", boxShadow: "0 0 20px #d83bff", borderRadius: "15px", overflow: "hidden" }}>
                <img onMouseOver={scaleFunc} onMouseOut={scaleFuncReset} src={src} width="100%" height="100%"/>
            </div>
        )
        }
        </div>
    );
};

export default Image;