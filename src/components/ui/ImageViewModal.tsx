import styles from "./ImageViewModal.module.css";
import { useImageViewModal } from "../../hooks/useImageViewModal";

function ImageViewModal() {
  const modal = useImageViewModal();

  const handleClose = (e: MouseEvent) => {
    // e.preventDefault();
    modal.closeModal();
  };

  return (
    <dialog ref={modal.setDialog} id="modal" class={styles.dialog}>
      <header class={styles.header}>
        <a
          href="#"
          class={styles["close-button"]}
          title="close"
          onClick={handleClose}
        >
          ✕
        </a>
      </header>
      <img src={modal.imageUrl()} class={styles.image} alt="Project cover" />
    </dialog>
  );
}

export default ImageViewModal;
