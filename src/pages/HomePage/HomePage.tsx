import { For, Suspense, type Component } from "solid-js";

import styles from "./HomePage.module.css";
import NavButton from "../../components/NavButton/NavButton";
import useProjects from "../../hooks/useProjects";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

const HomePage: Component = () => {
  const { projects } = useProjects();

  return (
    <main>
      <div class={styles["content-container"]}>
        <section class={styles.introduction}>
          <h1>Full-stack en mobile developer</h1>
          <p>
            Hey, mijn naam is Jef. Momenteel volg ik de studie Software
            Development (HBO Associate Degree).
            <br />
            <br />
            Ik wissel met programmeren tussen frontend, backend en mobile
            projecten, zodat mijn kennis en vaardigheden op elk vlak blijven
            ontwikkelen.
          </p>
          <div class={styles["button-container"]}>
            <NavButton title="Bekijk projecten" to="/projects" />
            <NavButton title="Neem contact" to="/contact" />
          </div>
        </section>

        <section class={styles["featured-projects-container"]}>
          <div class={styles.title}>
            <span class={styles.line} />
            <h1>Featured Projects</h1>
            <span class={styles.line} />
          </div>

          <div class={styles["featured-projects-list"]}>
            <Suspense
              fallback={<p class={styles["loading-text"]}>Loading...</p>}
            >
              <For each={projects().filter((project) => project.highlighted)}>
                {(project) => <ProjectCard project={project} />}
              </For>
            </Suspense>
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomePage;
