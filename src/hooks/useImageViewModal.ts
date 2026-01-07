import { createSignal } from "solid-js";

const [imageUrl, setImageUrl] = createSignal("");
let dialogRef: HTMLDialogElement | undefined;

export const useImageViewModal = () => {
  const setDialog = (el: HTMLDialogElement) => {
    dialogRef = el;
  };

  const openModal = () => {
    dialogRef?.showModal();
  };

  const closeModal = () => {
    dialogRef?.close();
  };

  return {
    imageUrl,
    setImageUrl,
    setDialog,
    openModal,
    closeModal,
  };
};
