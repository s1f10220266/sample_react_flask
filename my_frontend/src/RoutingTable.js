import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import TopPage from "./TopPage";
import App1 from "./App1";

const RoutingTable = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<TopPage />} />
            <Route path='/chat' element={<App1 />} />
        </>
    )
);


export default RoutingTable;
