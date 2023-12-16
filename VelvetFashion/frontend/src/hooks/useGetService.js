import { useState, useEffect } from "react";


export function useGetService(serviceId){
    const [service, setService] = useState();

    function getService(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setService(xhttp.response);
            }
        }

        xhttp.open("GET", "/get-service/" + serviceId);
        xhttp.send();
    }

    useEffect(getService, []);
    
    return service;
}