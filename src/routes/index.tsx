import { createFileRoute } from "@tanstack/solid-router";
import HomePage from "../pages/HomePage/HomePage";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <HomePage />;
}
