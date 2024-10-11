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
import { getToken, onMessage } from "firebase/messaging";

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
    // Request permission for notifications
    const requestPermission = async () => {
      try {
        const token = await getToken(messaging, {
          vapidKey: process.env.REACT_APP_FCM_VAPID_PUBLIC_KEY,
        });
        if (token) {
          console.log("FCM Token:", token);
          // Send the token to your server to send notifications
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          );
        }
      } catch (err) {
        console.log("Error occurred while retrieving token:", err);
      }
    };

    // Request permission on mount
    requestPermission();

    // Handle incoming messages when app is in foreground
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      // Display notification or update UI accordingly
      alert(`New message: ${payload.notification.body}`);
    });
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
