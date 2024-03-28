import { createBrowserRouter, } from "react-router-dom";
import Main from "../components/Main/Main";
import Home from "../components/Pages/Home/Home";
import Details from "../components/Pages/Details/Details";
import Carts from "../components/Pages/Carts/Carts";
import DashBoard from "../components/Pages/DashBoard/DashBoard";
import DashboardLayout from "../components/Main/DashboardLayout";
import Checkout from "../components/Pages/Checkout/Checkout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'details/:id',
                element: <Details></Details>,
                loader: ({params}) => fetch(`https://dummyjson.com/products/${params.id}`)
            },
            // {
            //     path: 'carts',
            //     element:<Carts></Carts>
            // },
            {
                path: 'checkout',
                element:<Checkout></Checkout>
            }
        ]
    },
    {
        path:'dashboard',
        element:<DashboardLayout></DashboardLayout>,
        children:[
            {
                path:'',
                element:<DashBoard></DashBoard>
            }
        ]
    }
]);
