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
import UpdateOrder from "../pages/UpdateOrder";
import Merchant from "../pages/Merchant";
import UpdatePurchase from "../pages/UpdatePurchase";
import UpdateProduct from "../pages/UpdateProduct";
import UpdateUser from "../pages/UpdateUser";
import AddPurchase from "../pages/AddPurchase";
import NotAuthorized from "../pages/NotAuthorized";
import Customer from "../pages/Customer";
import Payments from "../pages/Payments";
import AddPayment from "../pages/Addpayment";
import UpdatePayment from "../pages/UpdatePayment";


const router = createBrowserRouter([
    {
        path: "/", element: <Layout />, children: [
            { index: true, element: <Home /> },
            { path: "/customers", element: <Customers /> },
            { path: "/customers/:id", element: <Customer /> },
            { path: "/orders", element: <Sales /> },
            { path: "/orders/:id", element: <OrderPage /> },
            { path: "/orders/:id/update", element: <UpdateOrder /> },
            { path: "/orders/add", element: <AddOrder /> },
            { path: "/merchants", element: <Merchants /> },
            { path: "/merchants/:id", element: <Merchant /> },
            { path: "/expenses", element: <Expenses /> },
            { path: "/expenses/add", element: <AddExpense /> },
            { path: "/expenses/:id/update", element: <UpdateExpense /> },
            { path: "/purchases", element: <Purchases /> },
            { path: "/purchases/add", element: <AddPurchase /> },
            { path: "/purchases/:id", element: <PurchasePage /> },
            { path: "/purchases/:id/update", element: <UpdatePurchase /> },
            { path: "/payments", element: <Payments /> },
            { path: "/payments/add", element: <AddPayment /> },
            { path: "/payments/:id/update", element: <UpdatePayment /> },
            { path: "/products", element: <Products /> },
            { path: "/products/add", element: <AddProduct /> },
            { path: "/products/:id/update", element: <UpdateProduct /> },
            { path: "/categories", element: <Categories /> },
            { path: "/users", element: <Users /> },
            { path: "/users/add", element: <AddUser /> },
            { path: "/users/:id/update", element: <UpdateUser /> },
        ]
    },
    { path: "/login", element: <Login /> },
    { path: "/forget-password", element: <ForgetPassword /> },
    { path: "/reset-password", element: <ResetPassword /> },
    { path: "/un-authorized", element: <NotAuthorized /> },
    { path: "*", element: <NotFound /> },
])

export default router