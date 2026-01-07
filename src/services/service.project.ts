import { createSignal } from "solid-js";
import { projects as projectsData } from "../data/projects";
// import { perf } from "../utils/performance";

const [projects] = createSignal(projectsData);
export default function useProjects() {
  // perf.measureSync("Projects data parse", () => {
  //   perf.logSize("Projects data", projectsData);
  // });

  return { projects };
}
