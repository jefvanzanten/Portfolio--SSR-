import styles from "./Hamburger.module.css";
import type { Component, JSX } from "solid-js";

interface HamburgerProps {
  isOpen: boolean;
  onClick: JSX.EventHandler<HTMLButtonElement, MouseEvent>;
}

const Hamburger: Component<HamburgerProps> = (props) => {
  return (
    <button
      class={`${styles.hamburger} ${props.isOpen ? styles.open : ""}`}
      onClick={props.onClick}
      aria-label="Menu"
    >
      <span class={styles.line}></span>
      <span class={styles.line}></span>
      <span class={styles.line}></span>
    </button>
  );
};

export default Hamburger;
