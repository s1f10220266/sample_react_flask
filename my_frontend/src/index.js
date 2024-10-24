import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import RoutingTable from "./RoutingTable";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={RoutingTable}/>
);

