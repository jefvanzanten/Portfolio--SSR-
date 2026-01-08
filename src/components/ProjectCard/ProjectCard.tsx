import styles from "./ProjectCard.module.css";
import { For, onMount, type Component } from "solid-js";
import type { Project } from "../../models/types.project";
import { useImageViewModal } from "../../hooks/useImageViewModal";
import GithubLink from "../GithubLink/GithubLink";

type ProjectCardProps = {
  project: Project;
};

const ProjectCard: Component<ProjectCardProps> = (props) => {
  const { openModal, setImageUrl } = useImageViewModal();
  let cardRef: HTMLElement | undefined;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = new Image();
            img.src = props.project.coverUrl;
            observer.disconnect();
          }
        });
      },
      { rootMargin: "50px" }
    );

    if (cardRef) {
      observer.observe(cardRef);
    }

    return () => observer.disconnect();
  });

  const handleImageClick = () => {
    setImageUrl(props.project.coverUrl);
    openModal();
  };

  return (
    <>
      <article ref={cardRef} class={styles["project-card-container"]}>
        <button onclick={handleImageClick} class={styles.imgContainer}>
          <img
            class={styles.cover}
            src={props.project.thumbUrl}
            alt={`${props.project.name} cover`}
            loading="lazy"
          />
        </button>
        <section class={styles["project-info"]}>
          <h2 class={styles.title}>{props.project.name}</h2>
          <p class={styles.description}>
            {Array.isArray(props.project.description)
              ? props.project.description.join(" ")
              : props.project.description}
          </p>
        </section>
        <div class={styles["tag-container"]}>
          <For each={props.project.libraries}>
            {(library) => <span class={styles.tag}>{library}</span>}
          </For>
          <For each={props.project.languages}>
            {(language) => <span class={styles.tag}>{language}</span>}
          </For>
        </div>
        <GithubLink
          name="Github"
          iconUrl="/icons/github-mark-white.svg"
          url={props.project.url}
        />
      </article>
    </>
  );
};

export default ProjectCard;
