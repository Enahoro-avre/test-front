import * as React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import EditInput from "./components/EditInput";


import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: `/edit/:id`,
    element: <EditInput />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
