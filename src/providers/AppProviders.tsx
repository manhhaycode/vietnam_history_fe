import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import AppRoutes from "../routes";
import { NextUIProvider } from "@nextui-org/react";
import { ErrorBoundary } from "react-error-boundary";
import Error from "@/components/Error";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/libs/tanstack-query";

const router = createBrowserRouter(createRoutesFromElements(AppRoutes()));

export default function AppProvider() {
  return (
    <ErrorBoundary fallback={<Error />}>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <main className="text-foreground bg-background">
            <RouterProvider router={router}></RouterProvider>
          </main>
        </NextUIProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
