import { Link } from "@tanstack/solid-router";
import styles from "./NavButton.module.css";
import type { Component } from "solid-js";

type NavButtonProps = {
  title: string;
  to?: string;
};

const NavButton: Component<NavButtonProps> = (props) => {
  if (props.to) {
    return (
      <Link to={props.to} class={styles.button}>
        {props.title}
      </Link>
    );
  }

  return <button class={styles.button}>{props.title}</button>;
};

export default NavButton;
