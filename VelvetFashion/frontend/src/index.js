import React from "react";
import ReactDOM from 'react-dom';
import App from "./App";
import { Master } from "./components/master/Master";
import { Dates } from "./components/Dates/Dates";
import { ChoiceServices } from "./components/ChoiceServices/ChoiceServices";
import { ServicePage } from "./components/service/ServicePage";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./index.css";


ReactDOM.render((
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/booked-online" element={<ChoiceServices />} />
            <Route path="/create-notation/:serviceId" element={<Dates />} />
            <Route path="/master/:id" element={<Master />} />
            <Route path="/service/:id" element={<ServicePage/>} />
        </Routes>
    </BrowserRouter>
), document.getElementById("root"));