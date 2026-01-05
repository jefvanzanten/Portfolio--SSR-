import styles from "./GithubLink.module.css";

type GithubLinkProps = {
  name: string;
  url: string;
  iconUrl: string;
};

export default function GithubLink({ name, url, iconUrl }: GithubLinkProps) {
  return (
    <a class={styles.socialContainer} href={url} target="_blank">
      <img class={styles.logo} src={iconUrl} />
      <p class={styles.p}>{name}</p>
    </a>
  );
}
