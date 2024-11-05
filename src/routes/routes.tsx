import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Customers from "../pages/Customers";
import Sales from "../pages/Sales";
import Merchants from "../pages/Merchants";
import Users from "../pages/Users";
import Purchases from "../pages/Purchases";
import NotFound from "../pages/NotFound";
import Expenses from "../pages/Expenses";
// import AddCustomer from "../pages/AddCustomer";
import AddMerchant from "../pages/AddMerchant";
import AddUser from "../pages/AddUser";
import AddOrder from "../pages/AddOrder";
import Login from "../pages/Login";
import ForgetPassword from "../pages/ForgetPassword";
import ResetPassword from "../pages/ResetPassword";
import Categories from "../pages/Categories";
import Products from "../pages/Products";
import AddExpense from "../pages/AddExpese";
import AddProduct from "../pages/AddProduct";
import OrderPage from "../pages/Order";
import PurchasePage from "../pages/Purchase";
import UpdateExpense from "../pages/UpdateExpense";


const router = createBrowserRouter([
    {
        path: "/", element: <Layout />, children: [
            { index: true, element: <Home /> },
            { path: "/customers", element: <Customers /> },
            // { path: "/customers/add", element: <AddCustomer /> },
            { path: "/orders", element: <Sales /> },
            { path: "/orders/id", element: <OrderPage /> },
            { path: "/orders/add", element: <AddOrder /> },
            { path: "/merchants", element: <Merchants /> },
            { path: "/merchants/add", element: <AddMerchant /> },
            { path: "/expenses", element: <Expenses /> },
            { path: "/expenses/add", element: <AddExpense /> },
            { path: "/expenses/:id/update", element: <UpdateExpense /> },
            { path: "/purchases", element: <Purchases /> },
            { path: "/purchases/id", element: <PurchasePage /> },
            { path: "/products", element: <Products /> },
            { path: "/products/add", element: <AddProduct /> },
            { path: "/categories", element: <Categories /> },
            { path: "/users", element: <Users /> },
            { path: "/users/add", element: <AddUser /> },
        ]
    },
    { path: "/login", element: <Login /> },
    { path: "/forget-password", element: <ForgetPassword /> },
    { path: "/reset-password", element: <ResetPassword /> },
    { path: "*", element: <NotFound /> },
])

export default router