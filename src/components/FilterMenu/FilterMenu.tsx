import { createEffect, type Component } from "solid-js";
import type { Language, Library } from "../../models/types.project";
import styles from "./FilterMenu.module.css";

type FilterMenuProps = {
  closemenu: () => void;
  selectedLanguages: Language[];
  selectedLibraries: Library[];
  toggleLanguage: (language: Language) => void;
  toggleLibrary: (library: Library) => void;
};

const FilterMenu: Component<FilterMenuProps> = (props) => {
  let containerRef: HTMLDivElement | undefined;

  createEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef && !containerRef.contains(event.target as Node)) {
        setTimeout(() => props.closemenu(), 300);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        props.closemenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [props.closemenu]);

  return (
    <div class={styles.container} ref={containerRef}>
      <fieldset class={styles.fieldset}>
        <legend class={styles.legend}>Programmeer- & script-talen</legend>
        <div class={styles.libraryGroup}>
          <div class={styles.item}>
            <input
              onChange={() => props.toggleLanguage("TypeScript")}
              checked={props.selectedLanguages.includes("TypeScript")}
              type="checkbox"
              id="typescript"
              name="languages"
            />
            <label for="typescript">TypeScript</label>
          </div>
          <div class={styles.item}>
            <input
              onChange={() => props.toggleLanguage("Kotlin")}
              checked={props.selectedLanguages.includes("Kotlin")}
              type="checkbox"
              id="kotlin"
              name="languages"
            />
            <label for="kotlin">Kotlin</label>
          </div>
          <div class={styles.item}>
            <input
              onChange={() => props.toggleLanguage("Java")}
              checked={props.selectedLanguages.includes("Java")}
              type="checkbox"
              id="java"
              name="languages"
            />
            <label for="java">Java</label>
          </div>
          <div class={styles.item}>
            <input
              onChange={() => props.toggleLanguage("CSS")}
              checked={props.selectedLanguages.includes("CSS")}
              type="checkbox"
              id="css"
              name="languages"
            />
            <label for="css">CSS</label>
          </div>
        </div>
      </fieldset>

      <fieldset class={styles.libraries}>
        <legend class={styles.legend}>Frameworks & libraries</legend>
        <div class={styles.libraryGroup}>
          <div class={styles.item}>
            <input
              onChange={() => props.toggleLibrary("React")}
              checked={props.selectedLibraries.includes("React")}
              type="checkbox"
              id="react"
              name="frameworks"
            />
            <label for="react">React</label>
          </div>
          <div class={styles.item}>
            <input
              onChange={() => props.toggleLibrary("TailwindCSS")}
              checked={props.selectedLibraries.includes("TailwindCSS")}
              type="checkbox"
              id="tailwind"
              name="frameworks"
            />
            <label for="tailwind">Tailwind CSS</label>
          </div>
          <div class={styles.item}>
            <input
              onChange={() => props.toggleLibrary("React-Router")}
              checked={props.selectedLibraries.includes("React-Router")}
              type="checkbox"
              id="react-router"
              name="frameworks"
            />
            <label for="react-router">React-Router</label>
          </div>
          <div class={styles.item}>
            <input
              onChange={() => props.toggleLibrary("TanStackQuery")}
              checked={props.selectedLibraries.includes("TanStackQuery")}
              type="checkbox"
              id="tsq"
              name="frameworks"
            />
            <label for="tsq">TanStack Query</label>
          </div>
        </div>
        <div class={styles.libraryGroup}>
          <div class={styles.item}>
            <input
              onChange={() => props.toggleLibrary("Nextjs")}
              checked={props.selectedLibraries.includes("Nextjs")}
              type="checkbox"
              id="next"
              name="frameworks"
            />
            <label for="next">Next.js</label>
          </div>
          <div class={styles.item}>
            <input
              onChange={() => props.toggleLibrary("Express")}
              checked={props.selectedLibraries.includes("Express")}
              type="checkbox"
              id="express"
              name="frameworks"
            />
            <label for="express">Express</label>
          </div>
          <div class={styles.item}>
            <input
              onChange={() => props.toggleLibrary("Drizzle")}
              checked={props.selectedLibraries.includes("Drizzle")}
              type="checkbox"
              id="drizzle"
              name="frameworks"
            />
            <label for="drizzle">Drizzle</label>
          </div>
          <div class={styles.item}>
            <input
              onChange={() => props.toggleLibrary("Better-Auth")}
              checked={props.selectedLibraries.includes("Better-Auth")}
              type="checkbox"
              id="better-auth"
              name="frameworks"
            />
            <label for="better-auth">Better-Auth</label>
          </div>
        </div>
        <div class={styles.libraryGroup}>
          <div class={styles.item}>
            <input
              onChange={() => props.toggleLibrary("React-Native")}
              checked={props.selectedLibraries.includes("React-Native")}
              type="checkbox"
              id="react-native"
              name="frameworks"
            />
            <label for="react-native">React-Native</label>
          </div>
          <div class={styles.item}>
            <input
              onChange={() => props.toggleLibrary("JetpackCompose")}
              checked={props.selectedLibraries.includes("JetpackCompose")}
              type="checkbox"
              id="jetpack-compose"
              name="frameworks"
            />
            <label for="jetpack-compose">Jetpack Compose</label>
          </div>
          <div class={styles.item}>
            <input
              onChange={() => props.toggleLibrary("JavaFX")}
              checked={props.selectedLibraries.includes("JavaFX")}
              type="checkbox"
              id="javafx"
              name="frameworks"
            />
            <label for="javafx">JavaFX</label>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default FilterMenu;
