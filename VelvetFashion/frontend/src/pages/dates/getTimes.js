import { useEffect, useState } from "react";


export function getTimes(serviceId){
    const [times, setTimes] = useState([]);

    useEffect(() => {
        fetch("/get-busy-times/" + serviceId)
            .then(response => response.json())
            .then(response => {
                setTimes(response);
            })
    }, [])

    return times;
}