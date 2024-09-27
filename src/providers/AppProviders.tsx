import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import AppRoutes from "../routes";
import { NextUIProvider } from "@nextui-org/react";

const router = createBrowserRouter(createRoutesFromElements(AppRoutes()));

export default function AppProvider() {
  return (
    <NextUIProvider>
      <main className="text-foreground bg-background">
        <RouterProvider router={router}></RouterProvider>
      </main>
    </NextUIProvider>
  );
}
