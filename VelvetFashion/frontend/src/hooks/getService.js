import { useState, useEffect } from "react";


export function getService(serviceId){
    const [service, setService] = useState();

    useEffect(() => {
        fetch("/get-service/" + serviceId)
            .then(response => response.json())
            .then(response => {
                setService(response);
            })
    
    }, []);
    
    return service;
}