import type { Component } from "solid-js";
import styles from "./GithubLink.module.css";

type GithubLinkProps = {
  name: string;
  url: string;
  iconUrl: string;
};

const GithubLink: Component<GithubLinkProps> = (props) => {
  return (
    <a class={styles.socialContainer} href={props.url} target="_blank">
      <img class={styles.logo} src={props.iconUrl} />
      <p class={styles.p}>{props.name}</p>
    </a>
  );
};

export default GithubLink;
