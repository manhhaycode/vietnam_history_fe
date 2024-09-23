import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppRoutes from "../routes";
import { NextUIProvider } from "@nextui-org/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppRoutes />,
  },
]);

export default function AppProvider() {
  return (
    <NextUIProvider>
      <main className="dark text-foreground bg-background">
        <RouterProvider router={router}></RouterProvider>
      </main>
    </NextUIProvider>
  );
}
