import { ssr, ssrHydrationKey, ssrAttribute, escape } from "solid-js/web";
import { u as useImageViewModal } from "./useImageViewModal-DQHEEIMU.mjs";
import "solid-js";
const dialog = "_dialog_17nkp_3";
const header = "_header_17nkp_53";
const image = "_image_17nkp_127";
const styles = {
  dialog,
  header,
  "close-button": "_close-button_17nkp_75",
  image
};
var _tmpl$ = ["<dialog", ' id="modal"', "><header", '><a href="#"', ' title="close">✕</a></header><img', ' alt="Project cover"></dialog>'];
function ImageViewModal() {
  const modal = useImageViewModal();
  return ssr(_tmpl$, ssrHydrationKey(), ssrAttribute("class", escape(styles.dialog, true), false), ssrAttribute("class", escape(styles.header, true), false), ssrAttribute("class", escape(styles["close-button"], true), false), ssrAttribute("src", escape(modal.imageUrl(), true), false) + ssrAttribute("class", escape(styles.image, true), false));
}
export {
  ImageViewModal as default
};
