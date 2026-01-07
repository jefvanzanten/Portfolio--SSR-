import styles from "./ProjectCard.module.css";
import { For, onMount } from "solid-js";
import type { Project } from "../../models/types.project";
import { useImageViewModal } from "../../hooks/useImageViewModal";
import GithubLink from "./GithubLink";

type ProjectCardProps = {
  project: Project;
};

function ProjectCard({ project }: ProjectCardProps) {
  const { openModal, setImageUrl } = useImageViewModal();
  let cardRef: HTMLElement | undefined;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = new Image();
            img.src = project.coverUrl;
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
    setImageUrl(project.coverUrl);
    openModal();
  };

  return (
    <>
      <article ref={cardRef} class={styles["project-card-container"]}>
        <button onclick={handleImageClick} class={styles.imgContainer}>
          <img
            class={styles.cover}
            src={project.thumbUrl}
            alt={`${project.name} cover`}
            loading="lazy"
          />
        </button>
        <section class={styles["project-info"]}>
          <h2 class={styles.title}>{project.name}</h2>
          <p class={styles.description}>
            {Array.isArray(project.description)
              ? project.description.join(" ")
              : project.description}
          </p>
        </section>
        <div class={styles["tag-container"]}>
          <For each={project.libraries}>
            {(library) => <span class={styles.tag}>{library}</span>}
          </For>
          <For each={project.languages}>
            {(language) => <span class={styles.tag}>{language}</span>}
          </For>
        </div>
        <GithubLink
          name="Github"
          iconUrl="/icons/github-mark-white.svg"
          url={project.url}
        />
      </article>
    </>
  );
}

export default ProjectCard;
