import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

import Home from "./ui/Home";
import CreateOrder, {
  action as newOrderAction,
} from "./fetaures/order/CreateOrder";
import Cart from "./fetaures/cart/Cart";
import Menu, { loader as menuLoader } from "./fetaures/menu/Menu";
import Order, { loader as orderLoader } from "./fetaures/order/Order";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import { action as updateOrderAction } from "./fetaures/order/UpdateOrder";
import { useEffect } from "react";
import { messaging } from "../firebase";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        action: newOrderAction,
        element: <CreateOrder />,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction,
      },
    ],
  },
]);

function App() {
  useEffect(() => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
        console.log("messaging", messaging);
        
        // You can now show notifications
      } else if (permission === "denied") {
        console.log("Notification permission denied.");
        // You cannot show notifications
      } else {
        console.log("Notification permission dismissed.");
      }
    });
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
