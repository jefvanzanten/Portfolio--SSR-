import { ssr, ssrHydrationKey, ssrAttribute, escape, createComponent } from "solid-js/web";
import { createSignal, Suspense, For, createEffect } from "solid-js";
import { u as useProjects, P as ProjectCard } from "./ProjectCard-CB9qMRoe.mjs";
import "./useImageViewModal-DQHEEIMU.mjs";
const styles$1 = {
  "content-container": "_content-container_qq8gg_1",
  "project-container": "_project-container_qq8gg_17",
  "filter-container": "_filter-container_qq8gg_45"
};
const container$1 = "_container_1n7d3_1";
const legend = "_legend_1n7d3_35";
const libraries = "_libraries_1n7d3_45";
const libraryGroup = "_libraryGroup_1n7d3_59";
const fieldset = "_fieldset_1n7d3_73";
const item = "_item_1n7d3_85";
const styles = {
  container: container$1,
  legend,
  libraries,
  libraryGroup,
  fieldset,
  item
};
var _tmpl$$2 = ["<div", "><fieldset", "><legend", ">Programmeer- & script-talen</legend><div", "><div", "><input", ' type="checkbox" id="typescript" name="languages"><label for="typescript">TypeScript</label></div><div', "><input", ' type="checkbox" id="kotlin" name="languages"><label for="kotlin">Kotlin</label></div><div', "><input", ' type="checkbox" id="java" name="languages"><label for="java">Java</label></div><div', "><input", ' type="checkbox" id="css" name="languages"><label for="css">CSS</label></div></div></fieldset><fieldset', "><legend", ">Frameworks & libraries</legend><div", "><div", "><input", ' type="checkbox" id="react" name="frameworks"><label for="react">React</label></div><div', "><input", ' type="checkbox" id="tailwind" name="frameworks"><label for="tailwind">Tailwind CSS</label></div><div', "><input", ' type="checkbox" id="react-router" name="frameworks"><label for="react-router">React-Router</label></div><div', "><input", ' type="checkbox" id="tsq" name="frameworks"><label for="tsq">TanStack Query</label></div></div><div', "><div", "><input", ' type="checkbox" id="next" name="frameworks"><label for="next">Next.js</label></div><div', "><input", ' type="checkbox" id="express" name="frameworks"><label for="express">Express</label></div><div', "><input", ' type="checkbox" id="drizzle" name="frameworks"><label for="drizzle">Drizzle</label></div><div', "><input", ' type="checkbox" id="better-auth" name="frameworks"><label for="better-auth">Better-Auth</label></div></div><div', "><div", "><input", ' type="checkbox" id="react-native" name="frameworks"><label for="react-native">React-Native</label></div><div', "><input", ' type="checkbox" id="jetpack-compose" name="frameworks"><label for="jetpack-compose">Jetpack Compose</label></div><div', "><input", ' type="checkbox" id="javafx" name="frameworks"><label for="javafx">JavaFX</label></div></div></fieldset></div>'];
function FilterMenu({
  closemenu,
  selectedLanguages,
  selectedLibraries,
  toggleLanguage,
  toggleLibrary
}) {
  createEffect(() => {
    const handleClickOutside = (event) => {
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closemenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closemenu]);
  return ssr(_tmpl$$2, ssrHydrationKey() + ssrAttribute("class", escape(styles.container, true), false), ssrAttribute("class", escape(styles.fieldset, true), false), ssrAttribute("class", escape(styles.legend, true), false), ssrAttribute("class", escape(styles.libraryGroup, true), false), ssrAttribute("class", escape(styles.item, true), false), ssrAttribute("checked", selectedLanguages.includes("TypeScript"), true), ssrAttribute("class", escape(styles.item, true), false), ssrAttribute("checked", selectedLanguages.includes("Kotlin"), true), ssrAttribute("class", escape(styles.item, true), false), ssrAttribute("checked", selectedLanguages.includes("Java"), true), ssrAttribute("class", escape(styles.item, true), false), ssrAttribute("checked", selectedLanguages.includes("CSS"), true), ssrAttribute("class", escape(styles.libraries, true), false), ssrAttribute("class", escape(styles.legend, true), false), ssrAttribute("class", escape(styles.libraryGroup, true), false), ssrAttribute("class", escape(styles.item, true), false), ssrAttribute("checked", selectedLibraries.includes("React"), true), ssrAttribute("class", escape(styles.item, true), false), ssrAttribute("checked", selectedLibraries.includes("TailwindCSS"), true), ssrAttribute("class", escape(styles.item, true), false), ssrAttribute("checked", selectedLibraries.includes("React-Router"), true), ssrAttribute("class", escape(styles.item, true), false), ssrAttribute("checked", selectedLibraries.includes("TanStackQuery"), true), ssrAttribute("class", escape(styles.libraryGroup, true), false), ssrAttribute("class", escape(styles.item, true), false), ssrAttribute("checked", selectedLibraries.includes("Nextjs"), true), ssrAttribute("class", escape(styles.item, true), false), ssrAttribute("checked", selectedLibraries.includes("Express"), true), ssrAttribute("class", escape(styles.item, true), false), ssrAttribute("checked", selectedLibraries.includes("Drizzle"), true), ssrAttribute("class", escape(styles.item, true), false), ssrAttribute("checked", selectedLibraries.includes("Better-Auth"), true), ssrAttribute("class", escape(styles.libraryGroup, true), false), ssrAttribute("class", escape(styles.item, true), false), ssrAttribute("checked", selectedLibraries.includes("React-Native"), true), ssrAttribute("class", escape(styles.item, true), false), ssrAttribute("checked", selectedLibraries.includes("JetpackCompose"), true), ssrAttribute("class", escape(styles.item, true), false), ssrAttribute("checked", selectedLibraries.includes("JavaFX"), true));
}
const container = "_container_1jevk_1";
const tag = "_tag_1jevk_13";
const style = {
  container,
  tag
};
var _tmpl$$1 = ["<div", ">", "</div>"], _tmpl$2$1 = ["<button", ">", "</button>"];
function FilterTagBar({
  tags,
  onTagClick
}) {
  return ssr(_tmpl$$1, ssrHydrationKey() + ssrAttribute("class", escape(style.container, true), false), escape(createComponent(For, {
    each: tags,
    children: (tag2) => ssr(_tmpl$2$1, ssrHydrationKey() + ssrAttribute("class", escape(style.tag, true), false), escape(tag2))
  })));
}
var _tmpl$ = ["<main", "><div", "><section", "><button>", "</button><!--$-->", "<!--/--></section><!--$-->", "<!--/--><section", ">", "</section></div></main>"], _tmpl$2 = ["<p", ">Loading...</p>"];
function ProjectsPage() {
  const {
    filteredProjects,
    selectedLanguages,
    selectedLibraries,
    toggleLanguage,
    toggleLibrary,
    activeTags
  } = useProjects();
  const [isFilterMenuOpen, setIsFilterMenuOpen] = createSignal(false);
  return ssr(_tmpl$, ssrHydrationKey(), ssrAttribute("class", escape(styles$1["content-container"], true), false), ssrAttribute("class", escape(styles$1["filter-container"], true), false), isFilterMenuOpen() ? "Close Filters" : "Open Filters", activeTags().length > 0 ? escape(createComponent(FilterTagBar, {
    get tags() {
      return activeTags();
    },
    onTagClick: (tag2) => {
      if (selectedLanguages().includes(tag2)) {
        toggleLanguage(tag2);
      } else {
        toggleLibrary(tag2);
      }
    }
  })) : escape(null), isFilterMenuOpen() && escape(createComponent(FilterMenu, {
    closemenu: () => setIsFilterMenuOpen(false),
    get selectedLanguages() {
      return selectedLanguages();
    },
    get selectedLibraries() {
      return selectedLibraries();
    },
    toggleLanguage,
    toggleLibrary
  })), ssrAttribute("class", escape(styles$1["project-container"], true), false), escape(createComponent(Suspense, {
    get fallback() {
      return ssr(_tmpl$2, ssrHydrationKey() + ssrAttribute("class", escape(styles$1["loading-text"], true), false));
    },
    get children() {
      return createComponent(For, {
        get each() {
          return filteredProjects();
        },
        children: (project) => createComponent(ProjectCard, {
          project
        })
      });
    }
  })));
}
const SplitComponent = ProjectsPage;
export {
  SplitComponent as component
};
