import { createBrowserRouter } from "react-router-dom";
import ManagementStudent from "../pages/ManagementStudent";
import UpdateStudent from "../pages/UpdateStudent";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ManagementStudent />,
    children: [
      {
        path: "event/:id",
        element: <UpdateStudent />,
      },
    ],
  },
]);
