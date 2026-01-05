import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/solid-router";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";

import { HydrationScript } from "solid-js/web";
import { Suspense } from "solid-js";

import styleCss from "../styles.css?url";
import ImageViewModal from "../components/ui/ImageViewModal";

export const Route = createRootRouteWithContext()({
  head: () => ({
    links: [{ rel: "stylesheet", href: styleCss }],
  }),
  shellComponent: RootComponent,
});

function RootComponent() {
  return (
    <html style={{ "background-color": "#0a0a0a" }}>
      <head>
        <HydrationScript />
        <style>
          {`html, body { background-color: #0a0a0a; color: white; margin: 0; }`}
        </style>
      </head>
      <body style={{ "background-color": "#0a0a0a", color: "white" }}>
        <HeadContent />
        <Suspense>
          <Outlet />
          <ImageViewModal />
          <TanStackRouterDevtools />
        </Suspense>
        <Scripts />
      </body>
    </html>
  );
}
