import { createSignal } from "solid-js";

const [imageUrl, setImageUrl] = createSignal("");
const [isOpen, setIsOpen] = createSignal(false);

let dialogRef: HTMLDialogElement | undefined;

export const useImageViewModal = () => {
  const setDialog = (el: HTMLDialogElement) => {
    dialogRef = el;
  };

  const openModal = () => {
    setIsOpen(true);
    dialogRef?.showModal();
  };

  const closeModal = () => {
    setIsOpen(false);
    dialogRef?.close();
  };

  return {
    imageUrl,
    setImageUrl,
    setDialog,
    openModal,
    closeModal,
    isOpen,
  };
};
