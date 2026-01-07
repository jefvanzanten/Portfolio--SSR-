import { createSignal, createMemo } from "solid-js";
import { projects as projectsData } from "../data/projects";
import type { Language, Library } from "../models/types.project";

const [projects] = createSignal(projectsData);

const useProjects = () => {
  const [selectedLanguages, setSelectedLanguages] = createSignal<Language[]>(
    []
  );
  const [selectedLibraries, setSelectedLibraries] = createSignal<Library[]>([]);

  const filteredProjects = createMemo(() => {
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
  });

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

  const clearFilters = () => {
    setSelectedLanguages([]);
    setSelectedLibraries([]);
  };

  const activeTags = createMemo(() => [
    ...selectedLanguages(),
    ...selectedLibraries(),
  ]);

  return {
    projects,
    filteredProjects,
    selectedLanguages,
    selectedLibraries,
    toggleLanguage,
    toggleLibrary,
    clearFilters,
    activeTags,
  };
};

export default useProjects;
