import { Link } from "@tanstack/solid-router";
import styles from "./NavButton.module.css";

type NavButtonProps = {
  title: string;
  to?: string;
};

export default function NavButton({ title, to }: NavButtonProps) {
  if (to) {
    return (
      <Link to={to} class={styles.button}>
        {title}
      </Link>
    );
  }

  return <button class={styles.button}>{title}</button>;
}
