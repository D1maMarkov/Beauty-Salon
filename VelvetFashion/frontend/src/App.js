import React, {useEffect} from "react";
import { Topnav } from "./components/topnav/topnav";
import { Catalog } from "./components/catalog/Catalog";
import { HelloPage } from "./components/hellopage/HelloPage";
import { Images } from "./components/images/Images";
import { Footer } from "./components/footer/Footer";
import { Contacts } from "./components/contacts/Contacts";
import { Reviews } from "./components/reviews/Reviews";
import MobileBooked from "./components/mobilebooked/MobileBooked";


function App() {
    useEffect(() => {
        document.title = 'Салон красоты | Velvet Fashion';
    }, []);
    
    return (
         <div style={{ overflowX: "hidden", width: "100%"}}>
             <Topnav />
             <HelloPage />
             <Catalog />
             <Reviews />
             <Images />
             <Contacts />
             <Footer />
             <MobileBooked />
         </div>
    );
}

export default App;