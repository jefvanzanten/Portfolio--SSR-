import styles from "./ProjectCard.module.css";
import { createSignal, For } from "solid-js";
import type { Project } from "../../models/types.project";
import { setIsModalOpen, setModalImgUrl } from "./ImageViewModal";
import GithubLink from "./GithubLink";

type ProjectCardProps = {
  project: Project;
};

function ProjectCard({ project }: ProjectCardProps) {
  const setModalSettings = () => {
    setModalImgUrl(project.coverUrl);
    setIsModalOpen(true);
  };

  return (
    <>
      <article class={styles["project-card-container"]}>
        <button onclick={setModalSettings} class={styles.imgContainer}>
          <img
            class={styles.cover}
            src={project.thumbUrl}
            alt={`${project.name} cover`}
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
