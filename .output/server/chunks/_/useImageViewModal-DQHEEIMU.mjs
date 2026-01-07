import { createSignal } from "solid-js";
const [imageUrl, setImageUrl] = createSignal("");
let dialogRef;
const useImageViewModal = () => {
  const setDialog = (el) => {
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
    closeModal
  };
};
export {
  useImageViewModal as u
};
