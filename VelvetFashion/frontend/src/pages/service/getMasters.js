export function getMasters(setMasters, category){
    fetch("/get-masters/" + category)
        .then(response => response.json())
        .then(response => {
            setMasters(response);
        })
}