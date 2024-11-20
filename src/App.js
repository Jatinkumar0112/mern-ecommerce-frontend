import React, { useEffect } from "react";
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import "./App.css";
// import ProductList from './features/product-list/ProductList';
import Home from "./pages/Home";
import AdminHome from "./pages/AdminHome";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
// import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/CheckOut";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import { checkAuthAsync, selectLoggedInUser, selectUserChecked } from "./features/auth/AuthSlice";
import PageNotFound from "./pages/404";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrdersPage from "./pages/UserOrderPage";
import StripeCheckout from "./pages/StripeCheckout";
import UserProfilePage from "./pages/UserProfilePage";
import {
  fetchLoggedInUserAsync,
  fetchLoggedInUserOrderAsync,
} from "./features/user/userSlice";
import LogOut from "./features/auth/components/LogOut";
import { ForgotPassword } from "./features/auth/components/ForgotPassword";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import AdminProductForm from "./pages/AdminProductForm";
import AdminOrdersPage from "./pages/AdminOrdersPage";
// import { Cart } from './features/cart/Cart';
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/SignUp",
    element: <SignUpPage></SignUpPage>,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout></Checkout>
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage></ProductDetailPage>
      </Protected>
    ),
  },
  {
    path: "/admin/product-detail/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage></AdminProductDetailPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
        <AdminProductForm></AdminProductForm>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage></AdminOrdersPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form/edit/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductForm></AdminProductForm>
      </ProtectedAdmin>
    ),
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage></OrderSuccessPage>,
  },
  {
    path: "/my-orders",
    element: (
      <UserOrdersPage></UserOrdersPage>
      // we will add Page later right now using component directly.
    ),
  },
  {
    path: "/profile",
    element: (
      <UserProfilePage></UserProfilePage>
      // we will add Page later right now using component directly.
    ),
  },
  {
    path: "/stripe-checkout/",
    element: (
      <Protected><StripeCheckout></StripeCheckout></Protected>
      
      // we will add Page later right now using component directly.
    ),
  },
  {
    path: "/logout",
    element: (
      <LogOut></LogOut>
      // we will add Page later right now using component directly.
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <ForgotPassword></ForgotPassword>
      // we will add Page later right now using component directly.
    ),
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked);
  useEffect(()=>{
    dispatch(checkAuthAsync());
  },[dispatch])
  useEffect(() => {
    if (user) {
      // console.log({user})
      dispatch(fetchItemsByUserIdAsync());
      //we can get req.userId by token or backend so no need to give in front-end
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user]);
  return (
    <div className="App">
      {/* <Home></Home> */}
      {/* <LoginPage></LoginPage> */}
      {/* <SignUpPage></SignUpPage> */}
      {userChecked && <RouterProvider router={router} />}
    </div>
  );
}

export default App;
