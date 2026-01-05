import styles from "./FilterMenu.module.css";

type FilterMenuOptionProps = {
  label: string;
  isSelected: boolean;
  onToggle: () => void;
};

export default function FilterMenuOption({
  label,
  isSelected,
  onToggle,
}: FilterMenuOptionProps) {
  return (
    <div className={styles.item}>
      <input
        onChange={onToggle}
        checked={isSelected}
        type="checkbox"
        id={label}
        name={label}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
}
