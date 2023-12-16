import { useEffect, useState } from "react";


export function useGetTimes(serviceId){
    const [times, setTimes] = useState([]);

    function getBusyTimes(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setTimes(xhttp.response);
            }
        }

        xhttp.open("GET", "/get-busy-times/" + serviceId);
        xhttp.send();
    }

    useEffect(getBusyTimes, []);
    
    return times;
}