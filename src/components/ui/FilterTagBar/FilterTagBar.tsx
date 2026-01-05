import { For } from "solid-js";
import style from "./FilterTagBar.module.css";

type FilterTagBarProps = {
  tags: string[];
  onTagClick: (tag: string) => void;
};

export default function FilterTagBar({ tags, onTagClick }: FilterTagBarProps) {
  return (
    <div class={style.container}>
      <For each={tags}>
        {(tag) => (
          <button onClick={() => onTagClick(tag)} class={style.tag}>
            {tag}
          </button>
        )}
      </For>
    </div>
  );
}
