import { createSignal, For } from "solid-js";
import styles from "./ProjectsPage.module.css";
import useProjects from "../../services/service.project";
import type { Language, Library } from "../../models/types.project";
import ProjectCard from "../../components/ui/ProjectCard";
import FilterMenu from "../../components/ui/FilterMenu/FilterMenu";
import FilterTagBar from "../../components/ui/FilterTagBar/FilterTagBar";

export default function ProjectsPage() {
  const { loading, projects } = useProjects();
  const [isFilterMenuOpen, setIsFilterMenuOpen] = createSignal(false);
  const [selectedLanguages, setSelectedLanguages] = createSignal<Language[]>(
    []
  );
  const [selectedLibraries, setSelectedLibraries] = createSignal<Library[]>([]);

  const getFilteredProjects = () => {
    return projects().filter((project) => {
      if (!project.languages || !project.libraries) {
        return false;
      }

      const languageMatch =
        selectedLanguages().length === 0 ||
        selectedLanguages().every((lang) => project.languages.includes(lang));

      const libraryMatch =
        selectedLibraries().length === 0 ||
        selectedLibraries().every((lib) => project.libraries.includes(lib));

      return languageMatch && libraryMatch;
    });
  };

  const filtered = getFilteredProjects();

  const toggleLanguage = (language: Language) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((l) => l !== language)
        : [...prev, language]
    );
  };

  const toggleLibrary = (library: Library) => {
    setSelectedLibraries((prev) =>
      prev.includes(library)
        ? prev.filter((l) => l !== library)
        : [...prev, library]
    );
  };

  if (loading()) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div class={styles["content-container"]}>
        <section class={styles["filter-container"]}>
          <button onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen())}>
            {isFilterMenuOpen() ? "Close Filters" : "Open Filters"}
          </button>
          {selectedLanguages().length > 0 || selectedLibraries().length > 0 ? (
            <FilterTagBar
              tags={[...selectedLanguages(), ...selectedLibraries()]}
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
          {loading() ? (
            <p class={styles["loading-text"]}>Loading...</p>
          ) : (
            <For each={filtered}>
              {(project) => <ProjectCard project={project} />}
            </For>
          )}
        </section>
      </div>
    </main>
  );
}
