import { createSignal, For, Suspense, type Component } from "solid-js";
import styles from "./ProjectsPage.module.css";
import useProjects from "../../hooks/useProjects";
import type { Language, Library } from "../../models/types.project";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import FilterMenu from "../../components/FilterMenu/FilterMenu";
import FilterTagBar from "../../components/FilterTagBar/FilterTagBar";

const ProjectsPage: Component = () => {
  const {
    filteredProjects,
    selectedLanguages,
    selectedLibraries,
    toggleLanguage,
    toggleLibrary,
    activeTags,
  } = useProjects();

  const [isFilterMenuOpen, setIsFilterMenuOpen] = createSignal(false);

  return (
    <main>
      <div class={styles["content-container"]}>
        <section class={styles["filter-container"]}>
          <button onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen())}>
            {isFilterMenuOpen() ? "Close Filters" : "Open Filters"}
          </button>
          {activeTags().length > 0 ? (
            <FilterTagBar
              tags={activeTags()}
              onTagClick={(tag) => {
                if (selectedLanguages().includes(tag as Language)) {
                  toggleLanguage(tag as Language);
                } else {
                  toggleLibrary(tag as Library);
                }
              }}
            />
          ) : null}
        </section>
        {isFilterMenuOpen() && (
          <FilterMenu
            closemenu={() => setIsFilterMenuOpen(false)}
            selectedLanguages={selectedLanguages()}
            selectedLibraries={selectedLibraries()}
            toggleLanguage={toggleLanguage}
            toggleLibrary={toggleLibrary}
          />
        )}
        <section class={styles["project-container"]}>
          <Suspense fallback={<p class={styles["loading-text"]}>Loading...</p>}>
            <For each={filteredProjects()}>
              {(project) => <ProjectCard project={project} />}
            </For>
          </Suspense>
        </section>
      </div>
    </main>
  );
};

export default ProjectsPage;
