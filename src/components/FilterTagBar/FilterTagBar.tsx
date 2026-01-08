import { For, type Component } from "solid-js";
import style from "./FilterTagBar.module.css";

type FilterTagBarProps = {
  tags: string[];
  onTagClick: (tag: string) => void;
};

const FilterTagBar: Component<FilterTagBarProps> = (props) => {
  return (
    <div class={style.container}>
      <For each={props.tags}>
        {(tag) => (
          <button onClick={() => props.onTagClick(tag)} class={style.tag}>
            {tag}
          </button>
        )}
      </For>
    </div>
  );
};

export default FilterTagBar;
