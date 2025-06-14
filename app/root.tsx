import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { AuthProvider } from "./providers/authContext";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./providers/cartContext";
import { FavoritesProvider } from "./providers/favoritesContext";
import { queryClient } from "./api/api.config";
import React, { useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./providers/theme-provider";
import { Toaster } from "sonner";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function clientLoader({
  request,
  params,
}: Route.ClientLoaderArgs) {
  return null;
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function() {
            try {
              const theme = localStorage.getItem('vite-ui-theme');
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const root = document.documentElement;
              if (theme === 'dark' || (!theme && prefersDark)) {
                root.classList.add('dark');
                root.classList.remove('light');
              } else {
                root.classList.add('light');
                root.classList.remove('dark');
              }
            } catch (e) {
              // fail silently
            }
          })();
          `,
          }}
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Toaster offset="10vh" position="top-center" />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  useEffect(() => {
    if (!localStorage.getItem("city")) {
      localStorage.setItem("city", "Минск");
    }
  }, []);

  const [queryClientToProvide] = React.useState(() => queryClient);

  return (
    <QueryClientProvider client={queryClientToProvide}>
      <ThemeProvider>
        <CartProvider>
          <AuthProvider>
            <FavoritesProvider>
              <Outlet />
            </FavoritesProvider>
          </AuthProvider>
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

// export function HydrateFallback() {
//   return (
//     <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-background/50 text-foreground/50 animate-fade-out">
//       <Spinner className="h-52 w-52" />
//     </div>
//   );
// }

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
