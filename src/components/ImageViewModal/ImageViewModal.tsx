import styles from "./ImageViewModal.module.css";
import { useImageViewModal } from "../../hooks/useImageViewModal";
import type { Component } from "solid-js";

const ImageViewModal: Component = () => {
  const modal = useImageViewModal();

  return (
    <dialog ref={modal.setDialog} id="modal" class={styles.dialog}>
      <header class={styles.header}>
        <a
          href="#"
          class={styles["close-button"]}
          title="close"
          onClick={() => modal.closeModal()}
        >
          ✕
        </a>
      </header>
      <img src={modal.imageUrl()} class={styles.image} alt="Project cover" />
    </dialog>
  );
};

export default ImageViewModal;
