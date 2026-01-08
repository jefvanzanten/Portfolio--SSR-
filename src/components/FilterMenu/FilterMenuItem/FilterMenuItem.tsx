import type { Component } from "solid-js";
import styles from "./FilterMenuItem.module.css";
import type { Language, Library } from "../../../models/types.project";

type FilterMenuItemProps = {
  toggleLanguage: (language: Language) => void;
  selectedLanguages: Language;
  language: Language;
  type: Language | Library;
};

// TODO Need helper to check for hasLanguage(list, language);

const FilterMenuItem: Component<FilterMenuItemProps> = (props) => {
  return (
    <div class={styles.item}>
      <input
        onChange={() => props.toggleLanguage("TypeScript")}
        checked={props.selectedLanguages.includes("TypeScript")}
        type="checkbox"
        id={props.language}
        name={props.type}
      />
      <label for="typescript">TypeScript</label>
    </div>
  );
};

export default FilterMenuItem;
