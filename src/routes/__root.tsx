import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/solid-router";
import { HydrationScript } from "solid-js/web";
import { lazy } from "solid-js";

import styleCss from "../styles.css?url";

const ImageViewModal = lazy(() => import("../components/ui/ImageViewModal"));

// Alleen devtools laden in development
const TanStackRouterDevtools =
  import.meta.env.DEV
    ? lazy(() =>
        import("@tanstack/solid-router-devtools").then((m) => ({
          default: m.TanStackRouterDevtools,
        }))
      )
    : () => null;

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
        <Outlet />
        <ImageViewModal />
        <TanStackRouterDevtools />
        <Scripts />
      </body>
    </html>
  );
}
