import type { Component } from "solid-js";
import styles from "./FilterMenu.module.css";

type FilterMenuOptionProps = {
  label: string;
  isSelected: boolean;
  onToggle: () => void;
};

const FilterMenuOption: Component<FilterMenuOptionProps> = (props) => {
  return (
    <div class={styles.item}>
      <input
        onChange={props.onToggle}
        checked={props.isSelected}
        type="checkbox"
        id={props.label}
        name={props.label}
      />
      <label for={props.label}>{props.label}</label>
    </div>
  );
};

export default FilterMenuOption;
