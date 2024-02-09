export function getServices(setServices){
    fetch("/get-services")
        .then(response => response.json())
        .then(response => {
            setServices(response)
        })
}