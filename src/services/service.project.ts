import { createSignal } from "solid-js";
import { projects as projectsData } from "../data/projects";

export default function useProjects() {
  const [projects] = createSignal(projectsData);
  const [loading] = createSignal(false);

  return { projects, loading };
}
