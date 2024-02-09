import React, { Suspense, lazy } from "react";
import ReactDOM from 'react-dom';
import Layout from "./components/layout/layout";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./index.css";

const HomePage = lazy(() => import("./pages/home/HelloPage"))
const MasterPage = lazy(() => import("./pages/master/Master"))
const DatesPage = lazy(() => import("./pages/dates/Dates"))
const ChoiceServicesPage = lazy(() => import("./pages/choiceServices/ChoiceServices"))
const ServicePage = lazy(() => import("./pages/service/ServicePage"))

const routes = [
    { path: '/', component: <HomePage />},
    { path: '/booked-online', component: <ChoiceServicesPage /> },
    { path: '/create-notation/:serviceId', component: <DatesPage /> },
    { path: '/master/:id', component: <MasterPage /> },
    { path: '/service/:id', component: <ServicePage/> },
];

ReactDOM.render((
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Suspense><Layout /></Suspense>}>
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={route.component}
                    >
                    </Route>
                ))}
            </Route>
        </Routes>
    </BrowserRouter>
), document.getElementById("root"));