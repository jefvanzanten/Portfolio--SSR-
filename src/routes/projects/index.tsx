import { createFileRoute } from "@tanstack/solid-router";
import ProjectsPage from "../../pages/ProjectsPage/ProjectsPage";

export const Route = createFileRoute("/projects/")({
  component: ProjectsPage,
});
