import React, {useState, useEffect} from "react";
import Service from "../service/Service";
import { BrowserView, MobileView, isMobile } from 'react-device-detect';
import "./catalog.css";


const Catalog = ({filter, setFilter}) => {
    const [AllServices, setAllServices] = useState([]);
    const [Services, setServices] = useState([]);
    const [Categories, setCategories] = useState([]);
    const [currentServices, setCurrentServices] = useState(Services.slice(0, 4));
    const [increment, setIncrement] = useState(true);
    const [decrement, setDecrement] = useState(false);
    const start = 1;
    const [end, setEnd] = useState(0);
    

    function getServices(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setAllServices(xhttp.response);
            }
        }
        xhttp.open("GET", "/getServices");
        xhttp.send();
    }

    function getCategories(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setCategories(xhttp.response);
            }
        }
        xhttp.open("GET", "/getCategories");
        xhttp.send();
    }

    function getNextServices(){
        let current = document.getElementById("pageNumber").innerHTML;
        current = Number(current[0]);

        setCurrentServices(Services.slice(current * 4, current * 4 + 4));
        setDecrement(true);
        current++;

        if (current == end){
            setIncrement(false);
        }
       
        document.getElementById("pageNumber").innerHTML = current + "/" + end;
    }


    function getLastServices(){
        let current = document.getElementById("pageNumber").innerHTML;
        current = Number(current[0]);

        setCurrentServices(Services.slice((current - 2) * 4, (current - 1) * 4));
        setIncrement(true);
        current--;
        if (current == start){
            setDecrement(false);
        }

        document.getElementById("pageNumber").innerHTML = current + "/" + end;
    }

    function getFilter(param){
        document.getElementById("pageNumber").innerHTML = start + "/" + end;
        document.getElementById("categoryall").classList.remove("activeP");

        let categoriesP = document.getElementsByClassName("ServiceTitle")[0];
        categoriesP = categoriesP.getElementsByTagName("div");

        for (let i = 0; i < categoriesP.length; i++){
            categoriesP[i].classList.remove("activeP");
        }

        document.getElementById("category" + param).classList.add("activeP");

        if (param != "all"){
            setServices([...AllServices].filter(service => service.category.id == param));
        }
        else{
            setServices(AllServices);
        }
    }

    useEffect(() => {
        setEnd(Math.ceil(Services.length / 4));
        setDecrement(false);
        if (Math.ceil(Services.length / 4) > 1){
            setIncrement(true);
        }
        else{
            setIncrement(false);
        }
    }, [Services]);

    useEffect(() => {
        getServices();
        getCategories();
    }, []);

    useEffect(() => setServices(AllServices), [AllServices]);
    useEffect(() => isMobile ? setCurrentServices(Services) : setCurrentServices(Services.slice(0, 4)), [Services]); 
    
    return (
        <div id="catalog">
            <div style={{ width: "90%", marginLeft: "5%", marginTop: "5%" }} >
                <h3>Каталог</h3>
                <div className="ServiceTitle">
                    <div id="categoryall" onClick={() => getFilter("all")} className="activeP">
                        <p>Все</p>
                    </div>

                    {Categories.map(category => 
                        <div id={"category" + category.id} onClick={() => getFilter(category.id)} >
                            <p>{ category.title }</p>
                        </div>
                    )}

                    <BrowserView>
                        <div id="nextPage">
                            <p id="pageNumber">1/{end}</p>
                            {decrement ? (
                                <div onClick={getLastServices} id="decrement" className="nextCircle activeCircle">
                                    <a>{"<"}</a>
                                </div>
                            ):(
                                <div id="decrement" className="nextCircle">
                                    <a>{"<"}</a>
                                </div>
                            )}
                            {increment ? (
                                <div onClick={getNextServices} id="increment" className="nextCircle activeCircle">
                                    <a>{">"}</a>
                                </div>
                            ):(
                                <div id="increment" className="nextCircle">
                                    <a>{">"}</a>
                                </div>
                            )}
                        </div>
                    </BrowserView>

                    <MobileView>
                        <h1></h1>
                    </MobileView>
                </div>
            </div>

            <BrowserView>
                <div class="Services">
                    {currentServices.map(service => <Service service={service} />)}
                </div>
            </BrowserView>

            <MobileView>
                <div class="Services" style={{ overflowX: "scroll"}}>
                    {Services.map(service => <Service src={service.src} category={service.category} description={service.description} price={service.price} />
                    )
                    }
                </div>
            </MobileView>
        </div>
    );
};

export default Catalog;