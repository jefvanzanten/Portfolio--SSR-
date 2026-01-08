import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/solid-router";
import { HydrationScript } from "solid-js/web";
import { lazy, Show } from "solid-js";

import styleCss from "../styles.css?url";
import Navigation from "../components/Navigation/Navigation";
import { useImageViewModal } from "../hooks/useImageViewModal";
// import ImageViewModal from "../components/ImageViewModal/ImageViewModal";

const ImageViewModal = lazy(
  () => import("../components/ImageViewModal/ImageViewModal")
);

// Devtools in development mode only
const TanStackRouterDevtools = import.meta.env.DEV
  ? lazy(() =>
      import("@tanstack/solid-router-devtools").then((m) => ({
        default: m.TanStackRouterDevtools,
      }))
    )
  : () => null;

export const Route = createRootRouteWithContext()({
  head: () => ({
    links: [{ rel: "stylesheet", href: styleCss }],
    meta: [
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0",
      },
    ],
  }),
  shellComponent: RootComponent,
});

function RootComponent() {
  const { isOpen } = useImageViewModal();

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
        <Navigation />
        <Outlet />
        <Show when={isOpen()}>
          <ImageViewModal />
        </Show>
        <TanStackRouterDevtools />
        <Scripts />
      </body>
    </html>
  );
}
