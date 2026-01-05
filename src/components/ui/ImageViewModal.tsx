// import { Show, type Accessor } from "solid-js";
import { createSignal, Show } from "solid-js";
import styles from "./ImageViewModal.module.css";

type ImageViewModalProps = {
  imageUrl: string;
  // isOpen: Accessor<boolean>;
  // onClose: () => void;
};

export const [isModalOpen, setIsModalOpen] = createSignal<boolean>(false);
export const [modalImgUrl, setModalImgUrl] = createSignal<string>("");

function ImageViewModal() {
  const handleClose = (e: MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  return (
    <Show when={isModalOpen()}>
      <div id="modal" class={styles.dialog}>
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
        <img src={modalImgUrl()} class={styles.image} alt="Project cover" />
      </div>
    </Show>
  );
}

export default ImageViewModal;
